import React from 'react'
import Section from '../layout/Section'
import Link from 'next/link'
import fetchBlogPosts from '@/hooks/useFetchBlogPosts'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import ArticlesList from './layout/ArticleList'
import ArticleCard from './layout/ArticleCard'

const BlogPost = async () => {

    const articles = await fetchBlogPosts();

    const mostLikedArticle = [...articles].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))[0];

    const latestArticles = [...articles]
        .sort((a, b) => new Date((b.createdAt ?? 0)).getTime() - new Date((a.createdAt ?? 0)).getTime())
        .slice(0, 5);


    const mostViewedArticles = [...articles]
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        .slice(0, 5);

    const remainingArticles = articles.filter(article => article.id !== mostLikedArticle?.id);

    const bgArticle = mostLikedArticle.imgUrl




    return (
        <Section>

            <div className="mx-auto  grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="relative col-span-1 md:col-span-2">
                    <div className="relative flex flex-col  rounded-lg overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url(${bgArticle})` }}>
                        <span className="absolute px-3 py-1 text-xs font-bold uppercase border-b-2 left-6 top-6 border-blue-600 bg-gray-100 rounded-lg">
                            MAIS CURTIDA
                        </span>
                        <Link
                            href={`/blog/${mostLikedArticle.id}`}
                            className="flex flex-col items-center justify-end p-6 text-center sm:p-8 group h-96"
                        >

                            <h1 className="text-3xl font-semibold group-hover:underline bg-gray-100 rounded-lg">
                                {mostLikedArticle.title}
                            </h1>
                        </Link>
                    </div>


                    <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2">
                        {remainingArticles.map((remaining) => (
                            <ArticleCard article={remaining} key={remaining.id} />
                        ))}
                    </div>
                </div>


                <ArticlesList latestArticles={latestArticles} mostViewedArticles={mostViewedArticles} />
            </div>

        </Section>


    )
}

export default BlogPost