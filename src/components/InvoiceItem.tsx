import React, {Component} from "react";
import { observer } from 'mobx-react'

export interface Props {
    item: any
}

interface State {}

@observer
export default class InvoiceItem extends Component<Props, State> {
    render() {

        let item = this.props.item;
        console.log(item);
        return (
            <li>
                {item.name},
                Quantity: {item.quantity},
                Price: ${item.price.toFixed(2)},
                Total: ${item.total().toFixed(2)}

                <button onClick={item.decrement}>-</button>
                <button onClick={item.increment}>+</button>
                <button onClick={item.remove}>x</button>
            </li>
        )
    }

}