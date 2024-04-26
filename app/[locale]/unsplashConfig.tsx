import { createApi } from 'unsplash-js';
 
const unsplash = createApi({
    accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
});

export default unsplash;