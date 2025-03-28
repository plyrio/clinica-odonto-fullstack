import { CardContainer } from "../layout/CardContainer";
import Image from "next/image";
import Link from "next/link";
import { ResponseBlogPostDto } from "@odonto/core";
import ButtonDefault from "../button/Button";
import { IconCalendar, IconEye, IconThumbUp } from "@tabler/icons-react";

type BlogCardProps = {
  post: ResponseBlogPostDto;
};

export default async function BlogCard({ post }: BlogCardProps) {

  return (

    <div
      className="mx-auto rounded-lg shadow-sm"
    >
      <div className="relative">
        <Image
          height={256}
          width={256}
          className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
          src={
            post.imgUrl ||
            `https://images.stockcake.com/public/d/7/7/d77cdbe5-5fd2-49d4-b737-9e07d352f32b/dentist-holding-tools-stockcake.jpg`
          }
          alt={post.title || "Blog post image"}
        />

        <div className="absolute bottom-0 flex p-3 bg-white rounded-tr-xl">
          {post.author?.imgUrl && (
            <Image
              height={64}
              width={64}
              className="object-cover object-center w-10 h-10 rounded-full"
              src={post.author.imgUrl}
              alt={`${post.author || "Author"}'s profile image`}
            />
          )}

          <div className="mx-4">
            <h1 className="text-sm text-gray-700">{post.author?.name}</h1>

            <p className="text-sm text-gray-500 flex mt-1 posts-center line-clamp-5">
              <IconCalendar stroke={1} className="h-5 flex " />
              <span className="flex">
                {post.createdAt &&
                  new Date(post.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="mt-6 text-xl font-semibold text-gray-800 line-clamp-2">
          {post.title}
        </h1>

        <div className="mt-6">
          <p className="text-sm text-gray-500 line-clamp-4">
            {post.content}
          </p>

        </div>
        <div className="flex posts-center justify-between mt-2">
          <ButtonDefault
            text="Leia Mais"
            className="flex mb-0"
            href={`/blog/${post.id}`}
          />
          <div className="flex posts-center justify-center space-x-4">
            <span className="text-sm text-gray-500 flex posts-center font-bold">
              <IconThumbUp stroke={2} className="mr-1" />
              {post.likes ?? 0}
            </span>
            <span className="text-sm text-gray-500 flex posts-center font-bold">
              <IconEye stroke={2} className="mr-1" />
              {post.views ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
