import BlogCard from "./BlogCard";
import fetchBlogPosts from "@/hooks/useFetchBlogPosts";
import { CardContainer } from "../layout/CardContainer";

type BlogListProps = {
    limit?: number;
};

export default async function BlogList({ limit }: BlogListProps) {
    const blogposts = await fetchBlogPosts();

    const sortedByViews = blogposts.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    const postsToShow = limit ? sortedByViews.slice(0, limit) : sortedByViews;

    return (
        <CardContainer>
            {postsToShow.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </CardContainer>
    );
}
