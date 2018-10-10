import {types} from 'mobx-state-tree';
import ItemList from "./ItemList"

// SELF - refers to instance of the model, return an object of functions - it's like COMPUTED in MobX
// There are actions that modify data inside.
const Invoice = types.model('Invoice', {
    currency: types.string,
    is_paid: false,
    itemList: types.optional(ItemList, { items: [] })
}).actions(self => ({
    markPaid() {
        self.is_paid = true;
    }
}))
    .views((self) => ({
        status() {
            return self.is_paid ? "Paid" : "Not Paid";
        }

    }));

export default Invoice;