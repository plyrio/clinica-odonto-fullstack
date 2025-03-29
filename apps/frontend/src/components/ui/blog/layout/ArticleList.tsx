'use client'
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import Image from 'next/image';
import { ResponseBlogPostDto } from '@odonto/core';
import { IconEye, IconThumbUp } from '@tabler/icons-react';
import ArticleCard from './ArticleCard';

interface ArticlesListProps {
    latestArticles: ResponseBlogPostDto[];
    mostViewedArticles: ResponseBlogPostDto[];
}

const ArticlesList = ({ latestArticles, mostViewedArticles }: ArticlesListProps) => {


    const [activeButton, setActiveButton] = useState('latest');

    const handleButtonClick = (buttonType: string) => {
        setActiveButton(buttonType);
    };

    const articlesToDisplay =
        activeButton === 'latest' ? latestArticles : mostViewedArticles;

    return (
        <div className="col-span-1 p-3">
            <div className="mb-8">
                <div className="flex space-x-5 border-b-2 border-opacity-10 border-blue-600 pb-2">
                    <button
                        className={`text-xs font-bold uppercase border-b-2 ${activeButton === 'latest' ? ' border-blue-600' : ''}`}
                        onClick={() => handleButtonClick('latest')}>
                        Ultimos
                    </button>
                    <button
                        className={`text-xs font-bold uppercase border-b-2 ${activeButton === 'mostViewed' ? ' border-blue-600' : ''}`}
                        onClick={() => handleButtonClick('mostViewed')}>
                        Popular
                    </button>
                </div>
            </div>

            <div className="space-y-5 max-h-[1450px] overflow-y-auto">
                {articlesToDisplay.map((article) => (
                    
                    <ArticleCard article={article} key={article.id}/>
                ))}
            </div>
        </div>


    );
};

export default ArticlesList;
