import * as React from "react";

export interface Props {
    store: any
}

interface State {}

class InteractiveTable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.store.employeesList[0].name}
            </div>
        )
    }
}

export default InteractiveTable;