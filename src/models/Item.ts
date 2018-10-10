import { types, getParent } from 'mobx-state-tree';

const Item = types.model('Item', {
    quantity: types.number,
    price: types.number,
    name: types.string
}).actions(self => ({
    increment() {
        self.quantity = (self.quantity + 1);
    },
    decrement() {
        self.quantity = (self.quantity - 1);
    },
    remove() {
        // console.log(getParent(self,2));
        // Sort of like an asynchronous call
        let object = getParent(self,2);
        this.removal(object)
    },
    removal(object:any) {
        object.remove(self);
    }
}))
    .views(self => ({
    total() {
        return (self.quantity * self.price);
    }
}));

export default Item;


// Can't remove ourselves
// One level to go to itemArray
// Another level to go to itemList

// https://github.com/mobxjs/mobx-state-tree/blob/master/API.md#getparent
// https://github.com/mobxjs/mobx-state-tree#typing-self-in-actions-and-views
// https://github.com/mobxjs/mobx/issues/669

// https://github.com/mobxjs/mobx-state-tree/issues/74