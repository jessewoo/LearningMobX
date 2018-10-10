import { decorate, action, observable, configure, runInAction, flow } from "mobx";

// Have it on default, write MobX code correctly
configure({ enforceActions: "observed" });

class WeatherStore {
    // @observable
    weatherData = {};

    // constructor() {
    //     this.weatherData = this.weatherData.bind(this);
    // }

    // There is ONE ISSUE - when you use actions in MobX, anytime you are changing your observable data, it's supposed to be done directly in the ACTION FUNCTION
    // Currently, we are changing the observable data NOT in the action function itself but in the THEN PROMISE CALLBACK
    // .then(data => {
    //     this.weatherData = data;
    // });
    // The data is being updated OUTSIDE of the ACTION DIRECTLY, when the promise is resolved. NOT in the action directly.

    // After setWeather function, THIS DOESN'T need to be action because nothing is being changed in it, it is just fetching data.

    // METHOD 1: Set own action, move observable data outside
    loadWeather = (city:string) => {
        // Could do a try/catch block - would need a catchWeatherError handler
        fetch(
            `https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`
        )
            .then(response => response.json())
            // .then(data => {
            //     this.weatherData = data;
            // });
            .then(data => {
                this.setWeather(data);
            });
    };

    // @action
    // THIS WAY - moves it into it's OWN ACTION
    setWeather = (data:any) => {
        this.weatherData = data;
    };


    // METHOD 2: Use of runInAction function, do INLINE
    loadWeatherInline = (city:string) => {
        fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`)
            .then(response => response.json())
            .then(data => {
                runInAction(() => {
                    this.weatherData = data;
                });
            });
    };


    // METHOD 3: Use of Async. Don't use then, then...
    // What ASYNC AWAIT is doing in the background - switching code to run like fetch, then, then...run it in a nicer way without .then
    loadWeatherAsync = async (city:string) => {
        const response = await fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`);
        const data = await response.json();

        runInAction(() => {
            this.weatherData = data;
        })
    };

    // METHOD 4: What Generator does - make a function iterable.
    // Whoever uses this function, then can LOOP Overall, yields control back to the calling function. We yield control
    // We are yielding here to whoever is calling that function.
    // What FLOW will do - yield control
    // It will wrap around with a FLOW function, every time we yield control, this will be wrapped in action like runInAction
    // READS more like a code in async await, don't need to show RunInAction
    // https://github.com/mobxjs/mobx/issues/1405

    // https://dev.to/acro5piano/mobx-tips-new-api-named-flow-confusing-name-3gjk
    // https://stackoverflow.com/questions/16157839/typescript-this-inside-a-class-method
    // NEED: try bind this to the class in generator function
    loadWeatherGenerator = flow(function*(this:any, city:string) {
        // THIS should be class WeatherStore, not this of the FUNCTION
        // Got to do this every time?
        let _this = this;

        const response = yield fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`);
        const data = yield response.json();
        console.log('loadWeatherGenerator', data);
        // weatherData = data;

        // Every time we yield control to parents.
        // https://www.typescriptlang.org/docs/handbook/functions.html#this
        // that["weatherData"] = data;
        _this.weatherData = data;

        // ISSUE: potentially invalid reference access to a class field via this of a nested function
        // this.weatherData = data;
    });
}

// Don't need decorators up top but here it decorates it all
// Don't need to eject the create-react-app
// ISSUE- Flow expects one 1 argument and cannot be used as decorator
decorate(WeatherStore, {
    weatherData: observable,
    setWeather: action,
    // loadWeatherGenerator: flow
});

export default new WeatherStore();

// https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da
// https://mobx.js.org/best/actions.html