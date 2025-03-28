import Hero from "@/components/sections/Hero";
import { notFound } from "next/navigation";
import { ResponseBlogPostDto } from "@odonto/core";
import Section from "@/components/ui/layout/Section";
import BlogPost from "@/components/ui/blog/BlogPost";

async function fetchArticle(id: string): Promise<ResponseBlogPostDto | null> {
  try {
    const res = await fetch(
      `https://cof-backend.onrender.com/blog-posts/${id}`,
      {
        next: { revalidate: 600 },
        cache: "force-cache",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch blog post");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const article = await fetchArticle(id);

  if (!article) {
    return notFound();
  }

  return (
    <>
      <Hero title={article.title || "Detalhes do Artigo"} />
      <Section>
        
          <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
            <img src={article.imgUrl} alt="" className="h-auto w-full  " />
            <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-100">
              <div className="space-y-2">
                <a rel="noopener noreferrer" href="#" className="inline-block text-2xl font-semibold sm:text-3xl">{article.title || "Título Não Disponível"}</a>
                <p className="text-xs ">By 
                  <a rel="noopener noreferrer" href="#" className="text-xs hover:underline"> {article.author?.name || "Desconhecido"}</a>
                </p>
              <span className="text-xs">{article.createdAt
                ? new Date(article.createdAt).toLocaleDateString("pt-BR")
                : "Data indisponível"}</span>
              </div>
              <div className="">
                <p>{article.content || "Conteúdo não disponível"}</p>
              </div>
            </div>
          </div>
      


        {/* <h1>{article.title || "Título Não Disponível"}</h1>
      <p>Autor: {article.author?.name || "Desconhecido"}</p>
      <p>
        Data:{" "}
        {article.createdAt
          ? new Date(article.createdAt).toLocaleDateString("pt-BR")
          : "Data indisponível"}
      </p>
      <div>
        <h2>Conteúdo</h2>
        <p>{article.content || "Conteúdo não disponível"}</p>
      </div> */}
      </Section>
      
    </>
  );
}
