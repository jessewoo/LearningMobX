import { observable, action, computed } from 'mobx';

class BirdStore {
    // OBSERVABLE - anything observable is the data, property you want to keep track of, initialized to an empty array
    // WHAT we want to keep track of.
    @observable birds:any = [];

    // An ACTION is a function that you are changing the data you are observing.
    // We going to accept bird, arrow function and push it to the array.
    @action addBird = (bird:string) => {
        this.birds.push(bird);
    };

    // Different between Redux and MobX
    // NO TWO PLACES with ACTIONS AND REDUCERS, returns and dispatches a piece of data that gets handled by the Reducer which updates the state
    // None of that, we have a function that directly interacts with the property.
    // It doesn't need to be immutable but underneath is - wraps our array with a special type of Mobx, keep tracks of different changes

    // What is a computed function?
    // Working with our data, maybe do some calculation. Shopping cart and you want to count the total cost.
    // Anytime you want to access data and perform calculations on it, reflect it in real time.
    // Think of each cell as data we are observing. Anytime underlying data changes, the calculated CELL changes.
    @computed get birdCount() {
        // console.log(this.birds.length);
        return this.birds.length;
    }

}

// Create an instance of our class, then export the store
// We don't want many copies of BirdStore, what we want a single instance of a BirdStore.
// We will deal with that same instance of the BirdStore of the entire application
const store = new BirdStore();
export default store;

// We don't export "export default BirdStore"


// BOTH your data and function that changes the data live in the same place.
// The store.