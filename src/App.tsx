import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import JSONPretty from "react-json-pretty";

// Inject into our app the BirdStore, same name as the store from PROVIDER
// This component is an observer. When the data changes for store, it will force the component to change
// To Re-render the component

export interface Props {
    birdStore?: any;
    bird?:any;
    galleryStore?: any;
    weatherStore?: any;
}

export interface State {
}

// @inject('birdStore', 'galleryStore', 'weatherStore')
// @observer
class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
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

    render() {
        // const birdStore = this.props.birdStore;
        // console.log(birdStore);

        const { birdStore, galleryStore } = this.props;
        // console.log('Gallery Store', galleryStore);
        const { term, status, images } = galleryStore;

        return (
            <div className="App">
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

            </div>
        );
    }
}

// https://www.youtube.com/watch?v=r2rIen5pEbQ
// Observer - update App when there are changes in the data
export default inject("birdStore", "galleryStore", "weatherStore")(observer(App));

// https://www.youtube.com/watch?v=CA8w-zNmnpc