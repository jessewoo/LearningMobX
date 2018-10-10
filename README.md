# Prototype

## Purpose
Tuturials on MobX

## Technology Stack
* Frontend Frameworks: 
    * React
    * TypeScript
* Linting: 
    * [TSLint](https://github.com/palantir/tslint)
* Testing: 
    * [Jest](https://facebook.github.io/jest/)
    * [Enzyme](http://airbnb.io/enzyme/)
* State Management: 
    * [MobX](https://github.com/mobxjs/mobx)
    * [MobX React](https://github.com/mobxjs/mobx-react)
    * [MobX State Tree](https://github.com/mobxjs/mobx-state-tree) 
* Dev Tools: 
    * [MobX Dev Tool](https://github.com/mobxjs/mobx-devtools)
    * [MST Tool](https://www.npmjs.com/package/mobx-devtools-mst)
    * onPatch - contains all the data related to any change
* React UI Framework:
    * [Semantic UI React](https://react.semantic-ui.com/)
    * [Ant Design](https://ant.design/) (Alibaba)
    * [Fabric Design](https://developer.microsoft.com/en-us/fabric) (Microsoft)
    * [Material UI](https://material-ui.com/)
* Template Creation
    * [create-react-app](https://github.com/facebookincubator/create-react-app) - tool to quickly get set up.
    * [Typescript React](https://github.com/Microsoft/TypeScript-React-Starter) - uses create-react-app, from Microsoft, add in "experimentalDecorators": true to use decorators


## Resource Articles
* https://swizec.com/blog/structure-mobx-app-real-world/swizec/7181
* https://github.com/mobxjs/awesome-mobx
* https://codeburst.io/the-curious-case-of-mobx-state-tree-7b4e22d461f
* https://www.leighhalliday.com/posts


## Incumbent Debate
MobX State Tree over MobX over Redux

https://news.ycombinator.com/item?id=16918675
* There is an immutable data store with action-driven changelog, just like Redux.
* The immutability of the data store is baked in and enforced. The necessity to provide changes to the data store within an action is baked in and enforced.
* Having actions baked in as methods rather than having to create "action creators which in turn dispatch actions" is a nice reduction in boilerplate.
* Being able to add action listeners AND state listeners are baked in, and can be done at any level of the state's depth. To watch state changes in redux, for global changes not related to a particular component
* Mobx's observers on react render methods makes the renders far more efficient than what could be achieved with react-redux easily, without really ensuring that the props being passed in are as granular as necessary or shouldComponentUpdate is correctly identifying state changes. In mobx, the most granular access of the lowest level state can be detected within a render method, and only when that very specific value is replaced is the component rendered.
* Computed values on mobx-state-tree are baked in without the need for something like reselect  
* easier to gain an understanding of the moving parts of my application; how actions, derived data and data work together. On the other hand the support for Typescript is a bit clunky and leads to slow compilation. Mitigating the compile time leads to a bit of boiler plate.

## Research
* https://www.youtube.com/watch?v=5_luZf5xUpk - Converting callbacks into async / await


https://mobx.js.org/best/store.html#best-practices-for-building-large-scale-maintainable-projects
https://shellmonger.com/2017/08/11/integrating-react-native-typescript-mobx/

https://mobx.js.org/intro/concepts.html
https://mobx.js.org/best/react-performance.html

https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254