import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";


export const client = sanityClient({
    projectId: 'w6h4wcsq',
    dataset:'production',
    apiVersion: '2023-05-06',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

    const builder = ImageUrlBuilder(client);

    export const urlFor = (source) => builder.image(source);
    