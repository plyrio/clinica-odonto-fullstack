import Hero from "@/components/sections/Hero";
import { blogArticles } from "@/data/blogData";
import { notFound } from 'next/navigation';

export default async function ArticlePage ({params}: {params: Promise<{id: string}>}) {
    
    const id = (await params).id;
    
    const article = blogArticles.find((article) => article.id === Number(id));

    if (!article) {
      return  notFound();
    }

    return (
        <>
            <Hero title={article.title} backgroundClass="hero-blog" />
            <h1>{article.title}</h1>
            <p>Autor: {article.author}</p>
            <p>Data: {article.date}</p>
            <div>
                <h2>Conteúdo</h2>
                <p>{article.content}</p>
            </div>
        </>
    );
};