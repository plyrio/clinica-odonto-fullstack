import { CardContainer } from "../layout/CardContainer";
import Image from "next/image";
import Link from "next/link";
import { ResponseBlogPostDto } from "@odonto/core";

async function fetchBlogPosts(): Promise<ResponseBlogPostDto[]> {
  try {
    const res = await fetch("https://cof-backend.onrender.com/blog-posts",
      {
        next: { revalidate: 600 },
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
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

  return (
    <CardContainer>
      {blogposts.map((item) => {
        return (
          <div key={item.id} className="max-w-sm mx-auto">
            <div className='relative'>
              <Image
                height={256}
                width={256}
                style={{ width: "100%", height: "auto" }}
                className='object-center w-full h-64 rounded-lg lg:h-80'
                src={
                  item.imgUrl ||
                  `https://images.stockcake.com/public/d/7/7/d77cdbe5-5fd2-49d4-b737-9e07d352f32b/dentist-holding-tools-stockcake.jpg`
                }
                alt={item.title || "Blog post image"}
              />

              <div className='absolute bottom-0 flex p-3 bg-white'>
                {item.author?.imgUrl && (
                  <Image
                    height={64}
                    width={64}
                    className='object-cover object-center w-10 h-10 rounded-full'
                    src={item.author.imgUrl}
                    alt={`${item.author || "Author"}'s profile image`}
                  />
                )}

                <div className='mx-4'>
                  <h1 className='text-sm text-gray-700'>{item.author?.name}</h1>
                  <p className='text-sm text-gray-500'>
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <h1 className='mt-6 text-xl font-semibold text-gray-800'>
              {item.title}
            </h1>

            <div className='my-6'>
              <p className='text-sm text-gray-500 line-clamp-3'>
                {item.content}
              </p>

              <Link
                href={`/blog/${item.id}`}
                className='inline-block mt-4 text-blue-500 underline hover:text-blue-400'>
                Leia Mais
              </Link>
            </div>
          </div>
        );
      })}
    </CardContainer>
  );
}
