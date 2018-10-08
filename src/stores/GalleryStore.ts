import { observable, action, runInAction } from 'mobx';
// const url = require('url');

export default class GalleryStore {

    constructor() {
        this.setImages = this.setImages.bind(this);
    }

    // Properties you want to observe changes to - decorator
    @observable term:string = "";
    @observable images:any = [];
    @observable status:string = "initial";

    @action
    setImages = (images:any) => {
        this.images = images;
        this.status = "done";
    };

    // Functions to make changes to observable values
    @action
    fetchImages = (term:string) => {
        this.status = "searching";
        this.term = term;
        this.images = [];

        // console.log(url.parse('https://api.unsplash.com/search/photos'));

        let urlSplash = new URL('https://api.unsplash.com/search/photos');
        let params = {'client_id': "aac4680f33e5023e6daa98816b9a198cd283316a4eef50adeefc4f74b2bd3e94", 'query': term};
        for(let key in params) {
            urlSplash.searchParams.append(key, params[key]);
        }

        // urlSplash.searchParams.append('client_id', 'aac4680f33e5023e6daa98816b9a198cd283316a4eef50adeefc4f74b2bd3e94');
        // urlSplash.searchParams.append('query', term);

        console.log(urlSplash.href);
        console.log(urlSplash.toString());
        console.log(urlSplash);


        try {
            fetch(urlSplash.href)
            .then((response) => {
                if (response.status !== 200) {
                    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                }

                response.json().then( (data) => {
                    console.log('Data Fetched from fetchImages:', data);
                    this.setImages(data.results);
                });
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }
        catch(err) {
            console.log(`Looks like there was a problem.`);
            // MobX runs it like it's in an action
            runInAction(() => {
                this.status = "error";
            });
        }
    };



}