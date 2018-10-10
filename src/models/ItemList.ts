import {types } from 'mobx-state-tree';
import Item from './Item'

const ItemList = types.model('ItemList', {
    items: types.array(Item)
}).actions(self => ({
    add(item:any) {
        self.items.push(item);
    },
    remove(item:any) {
        // destroy(item);
       self.items.splice(self.items.indexOf(item), 1);
    }
})).views(self => ({
    total() {
        return (self.items.reduce((sum:number, item:any) => (sum + item.total()),0));
    }
}));

export default ItemList;


// https://github.com/mobxjs/mobx-state-tree/issues/580