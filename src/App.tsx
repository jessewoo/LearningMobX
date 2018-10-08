import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

// Inject into our app the BirdStore, same name as the store from PROVIDER
// This component is an observer. When the data changes for store, it will force the component to change
// To Re-render the component

export interface Props {
    birdStore?: any;
    bird?:any;
    galleryStore?: any;
}

export interface State {
}

@inject('birdStore', 'galleryStore')
@observer
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

    componentWillMount() {
        this.props.galleryStore.fetchImages("Mountains");
    }

    render() {
        // const birdStore = this.props.birdStore;
        // console.log(birdStore);

        const { birdStore, galleryStore } = this.props;

        console.log('Gallery Store', galleryStore);

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
                <br/>
                <hr/>
                <br/>
                <br/>

                <h1>Easy MobX and Redux Comparison</h1>
                <p>https://www.leighhalliday.com/easy-mobx-redux-comparison</p>
                <p>https://www.youtube.com/watch?v=CA8w-zNmnpc</p>
                <br/>

                {status === "searching" && <h3>Searching for {term}</h3>}
                {status === "done" && images.length === 0 && (
                    <h3>
                        Sorry sucker, no results{" "}
                        <span role="img" aria-label="sad"></span>
                    </h3>
                )}
                {status === "error" && <h3>Oops... error!</h3>}


                <div className="images-container">
                    {images.map( (image:any) => {
                        const description = image.categories.length > 0 ? image.categories[0].title : image.user.name;
                        return (
                            <div key={image.id}>
                                <a href={image.links.html} target="_blank">
                                    <img src={image.urls.small} alt={description} />
                                </a>
                            </div>
                        )}
                    )}
                </div>
            </div>
        );
    }
}

export default App;

// https://www.youtube.com/watch?v=CA8w-zNmnpc