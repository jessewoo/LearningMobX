import axios from "axios";

export default async (term:string) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
            client_id:
                "aac4680f33e5023e6daa98816b9a198cd283316a4eef50adeefc4f74b2bd3e94",
            query: term
        }
    });

    return response.data.results;
};