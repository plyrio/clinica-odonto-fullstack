import { ResponseBlogPostDto } from '@odonto/core';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IconEye, IconThumbUp } from '@tabler/icons-react';

interface ArticlesCardProps {
  article: ResponseBlogPostDto;
}

export default function ArticleCard({ article }: ArticlesCardProps) {
  return (
    <div
      key={article.id}
      className='overflow-hidden rounded-lg shadow-card transition hover:shadow-lg '>
      <Link href={`/blog/${article.id}`}>
        <Image
          height={528}
          width={528}
          alt='Thumbnail'
          className='h-56 w-full object-cover'
          src={article.imgUrl || 'Imagem não disponivel'}
        />
      </Link>
      <div className='p-4 sm:p-6 w-full'>
        <Link
          href={`/blog/${article.id}`}
          className='font-medium hover:underline'>
          {article.title}
        </Link>
        <div className='flex flex-wrap space-y-2  items-center justify-between mt-2 w-full h-full'>
          <div
            className='flex
      h-full items-center'>
            <Image
              className='rounded-full object-cover h-12 w-12 items-center flex border-2 border-gray-100 me-2'
              height={256}
              width={256}
              alt='dd'
              src={article.author?.imgUrl || ''}
            />
            <p className='flex flex-col text-xs text-gray-400'>
              {article.author?.name || 'Desconhecido'}
              <span className='text-xs text-gray-400'>
                {formatDistanceToNow(
                  new Date(article.createdAt ?? 'Data indisponivel'),
                  { addSuffix: true, locale: ptBR },
                )}
              </span>
            </p>
          </div>
          <div className='flex items-center justify-center  space-x-3'>
            <div className='flex items-center'>
              <IconThumbUp stroke={1} className='flex text-xs text-gray-400' />
              <span className='text-sm text-gray-400 flex  '>
                {article.likes ?? 0}
              </span>
            </div>

            <div className='flex items-center'>
              <IconEye stroke={1} className='flex text-xs text-gray-400' />
              <span className='flex text-xs text-gray-400'>
                {article.views ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
