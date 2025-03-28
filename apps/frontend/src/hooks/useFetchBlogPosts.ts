import { ResponseBlogPostDto } from "@odonto/core";

export default async function fetchBlogPosts(): Promise<ResponseBlogPostDto[]> {
    try {
        const res = await fetch("https://cof-backend.onrender.com/blog-posts", {
            next: { revalidate: 600 },
            cache: "force-cache",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch blog posts");
        }
        return res.json();
        console.log(res)
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}
