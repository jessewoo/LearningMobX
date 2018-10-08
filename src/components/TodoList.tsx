import React, {Component} from "react";
import { observer } from "mobx-react"

export interface Props {
    store: any
}

interface State {}

@observer
export default class TodoList extends Component<Props, State> {
    filter(e:any) {
        this.props.store.filter = e.target.value;
    }

    createNew(e:any) {
        if (e.which === 13) {
            this.props.store.createTodo(e.target.value);
            e.target.value = "";
        }
    }

    toggleComplete(todo:any) {
        todo.complete =!todo.complete;
        // You could fire off an action, FLUX style actions in MobX - like that abstraction
    }

    render() {
        let todoLis;

        // console.log(this.props.store.todos[0]);

        const { clearComplete, filter, filteredTodos, todos  } = this.props.store;

        todoLis = filteredTodos.map((todo:any) => (
            <li key={todo.id}>
                <input type="checkbox"
                       value={todo.complete}
                       checked={todo.complete}
                       onChange={this.toggleComplete.bind(this, todo)}
                />
                {todo.value}
            </li>
        ));

        console.log(todos);
        // console.log(todoLis);

        return (
            <div>
                <h1>TO DOS</h1>
                <h3>Filter: {filter}</h3>
                <input className="filter" value={filter} onChange={this.filter.bind(this)}/>

                <h3>Create New:</h3>
                <input className="create" onKeyPress={this.createNew.bind(this)}/>
                <ul>{todoLis}</ul>
                {/*<ul>*/}
                    {/*{this.props.store.todos.map((todo:any, index:number) => (*/}
                        {/*<li key={index}>{todo}</li>*/}
                    {/*))}*/}
                {/*</ul>*/}

                <button onClick={clearComplete}>Clear Complete</button>
            </div>
        )
    }
}