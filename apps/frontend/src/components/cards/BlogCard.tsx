import { CardContainer } from "../ui/layout/CardContainer";
import Image from "next/image";
import Link from "next/link";
import { ResponseBlogPostDto } from "@odonto/core";
import ButtonDefault from "../ui/button/Button";
import { IconCalendar, IconEye, IconThumbUp } from "@tabler/icons-react";

async function fetchBlogPosts(): Promise<ResponseBlogPostDto[]> {
  try {
    const res = await fetch("https://cof-backend.onrender.com/blog-posts", {
      next: { revalidate: 600 },
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function BlogCard() {
  let blogposts: ResponseBlogPostDto[] = [];
  try {
    blogposts = await fetchBlogPosts();
  } catch (error) {
    console.error("Error in BlosPostCard component:", error);
  }

  const sortedByViews = blogposts.sort((a, b) => {
    const aViews = a.views ?? 0;
    const bViews = b.views ?? 0;
    return bViews - aViews; 
  });

  const mostViewedPosts = sortedByViews.slice(0, 6);

  return (
    <CardContainer>
      {mostViewedPosts.map((item, index) => {
        return (
          <div
            key={index}
            className="mx-auto rounded-lg shadow-sm"
          >
            <div className="relative">
              <Image
                height={256}
                width={256}
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src={
                  item.imgUrl ||
                  `https://images.stockcake.com/public/d/7/7/d77cdbe5-5fd2-49d4-b737-9e07d352f32b/dentist-holding-tools-stockcake.jpg`
                }
                alt={item.title || "Blog post image"}
              />

              <div className="absolute bottom-0 flex p-3 bg-white rounded-tr-xl">
                {item.author?.imgUrl && (
                  <Image
                    height={64}
                    width={64}
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src={item.author.imgUrl}
                    alt={`${item.author || "Author"}'s profile image`}
                  />
                )}

                <div className="mx-4">
                  <h1 className="text-sm text-gray-700">{item.author?.name}</h1>

                  <p className="text-sm text-gray-500 flex mt-1 items-center line-clamp-5">
                    <IconCalendar stroke={1} className="h-5 flex " />
                    <span className="flex">
                      {item.createdAt &&
                        new Date(item.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="mt-6 text-xl font-semibold text-gray-800 line-clamp-2">
                {item.title}
              </h1>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 line-clamp-4">
                  {item.content}
                </p>
                
              </div>
              <div className="flex items-center justify-between mt-2">
                <ButtonDefault
                text="Leia Mais"
                className="flex mb-0"
                href={`/blog/${item.id}`}
              />
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-sm text-gray-500 flex items-center font-bold">
                    <IconThumbUp stroke={2} className="mr-1" />
                    {item.likes ?? 0}
                  </span>

                  <span className="text-sm text-gray-500 flex items-center font-bold">
                    <IconEye stroke={2} className="mr-1" />
                    {item.views ?? 0}
                  </span>
                </div>

              </div>
              
            </div>
          </div>
        );
      })}
    </CardContainer>
  );
}
