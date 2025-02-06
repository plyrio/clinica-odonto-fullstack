'use client'
import Hero from "@/components/sections/Hero";
import { notFound } from 'next/navigation';
import { ResponseBlogPostDto } from '@odonto/core';


export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {

    
    const id = (await params).id;

    const res = await fetch(`https://cof-backend.onrender.com/blog-posts/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        return notFound();
    }

    const article: ResponseBlogPostDto = await res.json();


    return (
        <>
            <Hero title={article.title || "Titulo Não Disponivel"}/>
            <h1>{article.title}</h1>
            <p>Autor: {article.author?.name}</p>
            <p>Data: {article.createdAt && new Date(article.createdAt).toLocaleDateString("pt-BR")}</p>
            <div>
                <h2>Conteúdo</h2>
                <p>{article.content}</p>
            </div>
        </>
    );
};
