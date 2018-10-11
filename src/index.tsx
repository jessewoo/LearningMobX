import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// import Hello from './components/Hello';

// ReactDOM.render(
//     <Hello name="TypeScript" enthusiasmLevel={10} />,
//     document.getElementById('root') as HTMLElement
// );

import {Provider} from 'mobx-react'
import BirdStore from './stores/BirdStore';

// Instantiate it, single instance
import GalleryStore from './stores/GalleryStore';
const galleryStore = new GalleryStore();

import WeatherStore from './stores/WeatherStore';

// MobX State Tree
import { onPatch } from "mobx-state-tree"
import Invoice from "./models/Invoice";
const invoice = Invoice.create({ currency: 'CAD', is_paid: false });
// console.log(invoice);

// Get called whenever there is a change in the data model
// Patch contains all the data related to the change
// OPERATION, PATH, VALUE
// The path is modeled in a shape of a tree
onPatch(invoice, patch => {
    console.log(patch);
});

// Look at all the changes in some dev tools
import makeInspectable from "mobx-devtools-mst"
makeInspectable(invoice);

// https://mobx.js.org/best/store.html
// By wrapping Provider to our app, the app has access to the stores that is in the provider
// With Redux, MobX and state management, take STATE out of the component - pass it back in somehow
const Root = (
    <Provider birdStore={BirdStore} galleryStore={galleryStore} weatherStore={WeatherStore} invoiceModel={invoice}>
        <App/>
    </Provider>
);

// Dont render App, but render ROOT
ReactDOM.render(Root, document.getElementById('root'));


registerServiceWorker();



// https://medium.com/skillshare-team/how-we-ditched-redux-for-mobx-a05442279a2b
// https://medium.com/@adamrackis/a-redux-enthusiast-tries-mobx-af675f468c11
// https://github.com/Microsoft/TypeScript-React-Starter

// https://github.com/mobxjs/mobx-state-tree

// https://news.ycombinator.com/item?id=16918675