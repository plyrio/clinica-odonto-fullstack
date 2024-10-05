// src/app/blog/[id]/page.tsx
import Hero from "@/components/sections/Hero";
import { blogArticles } from "@/data/blogData";
import { notFound } from 'next/navigation';

interface ArticlePageProps {
    params: {
        id: number;
    };
}

const ArticlePage = ({ params }: ArticlePageProps) => {
    const article = blogArticles.find((article) => article.id);

    if (!article) {
        notFound(); // Redireciona para uma página 404 se o artigo não existir
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

export default ArticlePage;
