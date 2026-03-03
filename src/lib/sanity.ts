import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ✅ Connected to your Sanity project
export const client = createClient({
    projectId: "20jktyvq",
    dataset: "production",
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: "2024-02-15", // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source);
}
