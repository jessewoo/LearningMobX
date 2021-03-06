import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import JSONPretty from "react-json-pretty";

import InvoiceItem from './components/InvoiceItem'

import unsplash from "./services/unsplash";

import DevTools from "mobx-react-devtools"

// Inject into our app the BirdStore, same name as the store from PROVIDER
// This component is an observer. When the data changes for store, it will force the component to change
// To Re-render the component

export interface Props {
    birdStore?: any;
    bird?:any;
    galleryStore?: any;
    weatherStore?: any;
    invoiceModel?: any;
}

export interface State {
    latitude: number;
    longitude: number;
    status: string;
    term: string;
    imagesTest: []
}

// @inject('birdStore', 'galleryStore', 'weatherStore')
// @observer
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        console.log(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            status: "",
            term: "",
            imagesTest: []
        }
    }

    // Create class level function. Stop form from submitting
    handleSubmit = (e: any) => {
        e.preventDefault();
        // Use the reference tool we setup
        const bird = this["bird"].value;
        // console.log(bird);
        // Use $r to access the reference.

        this.props.birdStore.addBird(bird);
        this["bird"].value = '';
    };

    // Create class level function. Stop form from submitting
    onSubmitSearch = (e: any) => {
        e.preventDefault();
        const search_term = this["search_term"].value;
        this.props.galleryStore.fetchImages(search_term);
        this["search_term"].value = '';
    };

    componentWillMount() {
        this.props.galleryStore.fetchImages("Mountains");
        this.props.weatherStore.loadWeatherGenerator("Toronto, ON, Canada");
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            // Calling a FUNCTION that returns a PROMISES
            this.loadPositionNew();
        }

        this.fetchNewImages("Basketball");
    }

    fetchNewImages = async (term:string) => {
        this.setState({
            status: "searching",
            term: term,
            imagesTest: []
        });

        try {
            // It's an ASYNC promise, need await
            const imagesTest = await unsplash(term);
            console.log("Images for Basketball", imagesTest);
            this.setState({
                status: "done",
                imagesTest
            });
        } catch (error) {
            this.setState({
                status: "error"
            });
        }
    };

    // Promises
    public getCurrentPosition = (options = {}) => {
        return new Promise((accept, reject) => {
            navigator.geolocation.getCurrentPosition(accept, reject, options);
        })
    };

    // In order to use AWAIT, you use to ASYNC otherwise it will give error
    // Anytime you use a promise, instead of using .then, you can use new keyword "await"
    // Position - let's await for the current position
    // Then we can do the typical stuff and set state
    loadPositionNew = async () => {
        try {
            // This is when we do the ACCEPT part of our Promises
            const position = await this.getCurrentPosition();
            const { latitude, longitude } = position["coords"];
            this.setState({ latitude, longitude });
        } catch(error) {
            // When things screw up, we use a catch, this is the REJECT called
            console.log("Error", error)
        }
    }


    // Regular way of using CALLBACKS
    loadPosition = () => {
        navigator.geolocation.getCurrentPosition(
            // First CALLBACK, giving the position and then we can extract out the position, callback on success
            position => {
                const { latitude, longitude } = position.coords;
                this.setState({ latitude, longitude });
            },
            // Second CALLBACK on failure
            () => {
                console.log("Error getting geolocation");
            },
            // Some options
            {}
        );
    };

    render() {
        // const birdStore = this.props.birdStore;
        // console.log(birdStore);

        const { birdStore, galleryStore, invoiceModel } = this.props;
        // console.log('Gallery Store', galleryStore);
        const { term, status, images } = galleryStore;
        // console.log(invoiceModel);

        return (
            <div className="App">
                <h1>NODE_ENV Variable: {process.env.NODE_ENV}</h1>
                <h1>Temp REACT_APP_ENV Variable: {process.env.REACT_APP_ENV}</h1>

                <br/><hr/><br/><br/>

                <h1>PAUSE - Testing Asynchronous Components with Mocks in Jest</h1>
                <p>Refactoring, pulled out fetch image function to services module</p>
                <p>https://www.youtube.com/watch?v=uo0psyTxgQM&t=971s</p>
                {/*<div>*/}
                    {/*<JSONPretty json={this.state.imagesTest}/>*/}
                {/*</div>*/}

                <div className="images-container">
                    {this.state.imagesTest.map( (image:any) => {
                        const description = image.categories.length > 0 ? image.categories[0].title : image.user.name;
                        return (
                            <div key={image.id} className="image">
                                <h3>{description}</h3>
                                <a href={image.links.html} target="_blank">
                                    <img src={image.urls.small} alt={description} />
                                </a>
                            </div>
                        )}
                    )}
                </div>

                <br/><hr/><br/><br/>

                <h1>Converting callbacks signature into Promises with async/await</h1>
                <p>https://www.youtube.com/watch?v=5_luZf5xUpk&t=22s</p>
                <p>Latitude: {this.state.latitude}</p>
                <p>Longitude: {this.state.longitude}</p>


                <br/><hr/><br/><br/>

                <h1>Introduction to MobX State Tree</h1>
                <p>https://github.com/leighhalliday/invoice-mobx-state-tree</p>
                <p>https://www.youtube.com/watch?v=pPgOrecfcg4</p>
                <h4>{invoiceModel.status()}</h4>
                {!invoiceModel.is_paid && <button onClick={e => {
                    e.preventDefault();
                    invoiceModel.markPaid();
                }}>Pay</button>}

                <form id="stateTreeForm" onSubmit={e => {
                    e.preventDefault();
                    invoiceModel.itemList.add({
                        name: this["nameInput"].value,
                        quantity: parseInt(this["quantityInput"].value, 10),
                        price: parseFloat(this["priceInput"].value)
                    });
                    e.currentTarget.reset();
                    this["nameInput"].focus();
                }}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" ref={input => (this["nameInput"] = input) } id="name"/>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" ref={input => (this["quantityInput"] = input) } id="quantity"/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" min="1" step="any" ref={input => (this["priceInput"] = input) } id="price"/>
                    </div>
                    <div>
                        <button type="submit">Add</button>
                    </div>
                    <hr/>
                </form>

                <h2>Total: ${invoiceModel.itemList.total().toFixed(2)}</h2>
                <ul>
                    {invoiceModel.itemList.items.map((item:any,i:number) => (
                        <InvoiceItem item={item} key={i}/>
                    ))}
                </ul>

                <br/><hr/><br/><br/>
                <h1>Create React App with MobX using Decorators</h1>
                <p>https://www.leighhalliday.com/create-react-app-mobx-decorators</p>
                <p>https://www.youtube.com/watch?v=Dp75-DnGFrU</p>

                <h2>You have {birdStore.birdCount} birds.</h2>

                {/* Give a way to reference it */}
                <form  onSubmit={e => this.handleSubmit(e)}>
                    <input type="text" placeholder="Enter Birds" ref={(input) => this["bird"] = input}/>
                    <button>Add bird</button>
                </form>

                <ul>
                    {birdStore.birds.map( (bird:any, index:number) => (
                        <li key={index}>
                            {bird}
                        </li>
                    ))}
                </ul>
                <br/><hr/><br/><br/>
                <h1>Easy MobX and Redux Comparison</h1>
                <form id="searchForm" className="form" onSubmit={e => this.onSubmitSearch(e)}>
                    <input type="text" ref={input => {this["search_term"] = input}} placeholder="Enter your search term"/>
                    <button>Search</button>
                </form>
                <p>https://www.leighhalliday.com/easy-mobx-redux-comparison</p>
                <p>https://www.youtube.com/watch?v=CA8w-zNmnpc</p>
                <br/><hr/>

                {status === "searching" && <h3>Searching for {term}</h3>}
                {status === "done" && images.length === 0 && (
                    <h3>Sorry sucker, no results for {term}</h3>
                )}
                {status === "error" && <h3>Oops... error!</h3>}

                {/* WOULD BE GOOD TO DO PROP TYPES*/}
                <div className="images-container">
                    {images.map( (image:any) => {
                        const description = image.categories.length > 0 ? image.categories[0].title : image.user.name;
                        return (
                            <div key={image.id} className="image">
                                <h3>{description}</h3>
                                <a href={image.links.html} target="_blank">
                                    <img src={image.urls.small} alt={description} />
                                </a>
                            </div>
                        )}
                    )}
                </div>

                <br/><hr/><br/><br/>
                <h1>Async in MobX - JSON Pretty</h1>
                <p>https://www.youtube.com/watch?v=r2rIen5pEbQ</p>
                <p>https://www.leighhalliday.com/mobx-async-actions</p>
                <div>
                    <JSONPretty json={this.props.weatherStore.weatherData}/>
                </div>

                <DevTools/>
            </div>
        );
    }
}

// https://www.youtube.com/watch?v=r2rIen5pEbQ
// Observer - update App when there are changes in the data
export default inject("birdStore", "galleryStore", "weatherStore", "invoiceModel")(observer(App));

// https://www.youtube.com/watch?v=CA8w-zNmnpc