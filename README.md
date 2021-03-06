# Prototype

## Purpose
Tuturials on MobX

## Technology Stack
* Frontend Frameworks: 
    * React
    * TypeScript
* Linting: 
    * [TSLint](https://github.com/palantir/tslint)
* Testing: (do later, can't figure out configuration files)
    * [Jest](https://facebook.github.io/jest/)
    * [Enzyme](http://airbnb.io/enzyme/)
    * Resources - https://basarat.gitbooks.io/typescript/docs/testing/jest.html
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
* https://mobx.js.org/best/store.html#best-practices-for-building-large-scale-maintainable-projects
* https://shellmonger.com/2017/08/11/integrating-react-native-typescript-mobx/
* https://mobx.js.org/intro/concepts.html
* https://mobx.js.org/best/react-performance.html
* https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254

## How to Structure STORE in MobX, multipage 
* https://swizec.com/blog/structure-mobx-app-real-world/swizec/7181
* https://medium.com/@mjewell/multi-page-mobx-a5c6bff7cc54
    * App Store
    * UI Store
    * Page Store
* https://github.com/mobxjs/mobx/issues/1155
* https://github.com/mobxjs/mobx/issues/1192 (SINGLETON)
* https://github.com/gothinkster/react-mobx-realworld-example-app
    * https://react-mobx.realworld.io/#/
    
    
    
## Other Libraries
* Internationalization - https://medium.com/@shalkam/create-react-app-i18n-the-easy-way-b05536c594cb
* AutoPrefixer https://www.npmjs.com/package/autoprefixer
* SASS
    * https://medium.com/@oreofeolurin/configuring-scss-with-react-create-react-app-1f563f862724
    * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-sass-stylesheet
* Flexbox - https://www.npmjs.com/package/react-flexbox-grid, https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* HMR (Hot Module Reload) - https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
* Code Splitting
    * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting
    * https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html 
    * https://reactjs.org/docs/code-splitting.html
* Environments variables
    * https://serverless-stack.com/chapters/environments-in-create-react-app.html
    * https://stackoverflow.com/questions/42458434/how-to-set-build-env-variables-when-running-create-react-app-build-script
    * https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d
    * https://stackoverflow.com/questions/9198310/how-to-set-node-env-to-production-development-in-os-x/22282953
* Portals
    * https://reactjs.org/docs/portals.html
    * https://www.npmjs.com/package/react-portal
    * https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
    * https://assortment.io/posts/accessible-modal-component-react-portals-part-1
    
    
https://github.com/wmonk/create-react-app-typescript/blob/master/template/README.md#npm-start