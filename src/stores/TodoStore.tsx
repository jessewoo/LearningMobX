import { autorun, computed, observable, reaction, action } from "mobx";

class Todo {
    @observable value:string;
    @observable id:number;
    @observable complete:boolean;

    constructor(value:string) {
        this.value = value;
        this.id = Date.now();
        this.complete = false;
    }
}

// Observables - REACT TO AND PROPAGATE CHANGES
// Spooky black magic decorators - higher order function. It's a function that takes in a target and returns a function
// https://medium.com/teachable/getting-started-with-react-typescript-mobx-and-webpack-4-8c680517c030
// It becomes an OBSERVABLE ARRAY


class TodoStore {
    // DECORATE PROPERTIES IN OUR STORE to be observable, means they'll react to and propagate changes.
    // @observable todos = [{ "value": "Buy Cheese", "id": 1234, "complete": false }];
    @observable todos:any = [];
    @observable filter = "";

    // These are values that are automatically derived from the state if any of the OBSERVABLE values it uses are CHANGED
    // Use COMPUTED instead of reaction, autorun WHEN YOU NEED A DERIVED VALUE FROM YOUR STATE
    @computed get filteredTodos() {
        let matchesFilter = new RegExp(this.filter, "i");
        // console.log(matchesFilter);
        return this.todos.filter( (todo:any) => !this.filter || matchesFilter.test(todo.value))
    }

    // Takes in a function and returns a new function with the same signature. Use ACTION when you create functions that modify your state.
    // Will give significant performance increases.
    // Actions will automatically batch mutations and only trigger computer values and reactions once the outer most action is complete.
    @action createTodo(value:string) {
        this.todos.push(new Todo(value));
        console.log(this.todos);
    }

    // Observable Array - can't erase it. Bind it with fat arrow.
    // The reference would be messed up.
    @action clearComplete = () => {
        // If todos are NOT complete, they will end up in the 'incompleteTodos' array
        const incompleteTodos = this.todos.filter( (todo:any) => !todo.complete);
        // this.todos = []
        this.todos.replace(incompleteTodos);
    };

    // REACTION: takes 2 arguments
    // First - predicated function returns values or properties we want to react to
    // Second - effect or reactionary function that gets the return value of the predicate as it's first argument,
    // effect will get executed when the return value from predicate changes
    // Return a new array of INCOMPLETE TASKS
    constructor() {
        reaction(
            () => this.todos.filter((todo:any) => !todo.complete),
            (incompletedTasks) => {
                if (incompletedTasks.length > 5) {
                    alert("Dude. You've got too much on your plate.")
                }
            }
        )
    }

}

/*
declare global {
    interface Window { store: any; }
}
window.store = window.store || {};
*/

// Firing all change events - getters and setters
var store = window['store'] = new TodoStore;

export default store;

// Similar to REACTION function - which takes in 1 function as an argument. It will execute function whenever ANY OBSERVABLE VALUE used in it changes.
// Use REACTION or AUTORUN when you want to achieve an effect like an alert, modal, xhr request
autorun(() => {
    console.log(store.filter);
    if (store.todos.length > 0) {
        console.log(store.todos[0]);
    }
});


// https://github.com/Microsoft/TypeScript/issues/18687