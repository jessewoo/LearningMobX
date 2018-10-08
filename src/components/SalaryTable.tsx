import * as React from "react";
import InteractiveTable from './Table'

export interface Props {}

interface State {}

class Store {
    employeesList = [
        {name: "John Doe", salary: 150},
        {name: "Richard Roe", salary: 225},
    ]
}
const appStore = new Store();


class SalaryTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
                <InteractiveTable store={appStore}/>
                {/*{appStore.employeesList}*/}
            </div>
        )
    }
}

export default SalaryTable;