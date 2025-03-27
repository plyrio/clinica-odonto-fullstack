import Hero from "@/components/sections/Hero";
import { notFound } from "next/navigation";
import { ResponseBlogPostDto } from "@odonto/core";

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
      <h1>{article.title || "Título Não Disponível"}</h1>
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
      </div>
    </>
  );
}
