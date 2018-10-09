import { decorate, action, observable, configure, runInAction, flow } from "mobx";

configure({ enforceActions: true });

class WeatherStore {
    // @observable
    weatherData = {};


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




    // METHOD 2: Use of runInAction function
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
    loadWeatherGenerator = flow(function*(city:string) {
        const response = yield fetch(`https://abnormal-weather-api.herokuapp.com/cities/search?city=${city}`);
        const data = yield response.json();
        console.log(data);

        // Every time we yield control to parents.
        // this["weatherData"] = data;
        // this.weatherData = data;
    });
}

// Don't need decorators up top but here it decorates it all
// Don't need to eject the create-react-app
decorate(WeatherStore, {
    weatherData: observable,
    setWeather: action,
    // loadWeatherGenerator: flow
});

export default new WeatherStore();