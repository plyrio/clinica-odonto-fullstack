import Hero from '@/components/sections/Hero';
import { notFound } from 'next/navigation';
import { ResponseBlogPostDto } from '@odonto/core';
import Section from '@/components/ui/layout/Section';
import Link from 'next/link';
import Image from 'next/image';


async function fetchArticle(id: string): Promise<ResponseBlogPostDto | null> {
  try {
    const res = await fetch(
      `https://cof-backend.onrender.com/blog-posts/${id}`,
      {
        next: { revalidate: 600 },
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch blog post');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
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
      <Hero title={article.title || 'Detalhes do Artigo'} />
      <Section>
        <div className='flex flex-col max-w-3xl mx-auto overflow-hidden rounded'>
          <Image
            height={768}
            width={768}
            src={article.imgUrl || ""}
            alt=''
            className='max-h-96 object-center object-cover w-full  border-4 rounded-2xl'
          />
          <div className='p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-gray-100 rounded-2xl'>
            <div className='space-y-2'>
              <Link
                href='#'
                className='inline-block text-2xl font-semibold sm:text-3xl'>
                {article.title || 'Título Não Disponível'}
              </Link>
              <div className='flex items-center'>
                <Image
                  className='rounded-full w-12 items-center flex border-2 border-gray-100 me-2'
                  height={256}
                  width={256}
                  alt='dd'
                  src={article.author?.imgUrl || ''}
                />
                <p className='flex flex-col'>
                  {article.author?.name || 'Desconhecido'}
                  <span className='text-xs'>
                    {' '}
                    {article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString('pt-BR')
                      : 'Data indisponível'}
                  </span>
                </p>
              </div>
            </div>
            <div className=''>
              <p>{article.content || 'Conteúdo não disponível'}</p>
              <div className='flex items-center  space-x-3'>
                
              </div>
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
