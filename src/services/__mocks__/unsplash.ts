const fakeData:any = [
    {
        id: 1,
        categories: [{ title: "Nice image" }],
        user: {
            name: "Mr. Photographer"
        },
        links: {
            html: "https://www.leighhalliday.com"
        },
        urls: {
            small: "https://www.image.com/nice.jpg"
        },
        likes: 10
    }
];

// Have an asynchronous function which will return whatever this PROMISE resolves
// We await for it to resolve, return what it gives us
export default async (term:string) => {
    return await new Promise((resolve) => {
        resolve(fakeData)
    })
}