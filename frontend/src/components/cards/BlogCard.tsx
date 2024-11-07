import React from 'react'
import Card from '../layout/GridContainer'
import { blogArticles } from '@/data/blogData'
import Image from "next/image";
import Link from 'next/link';

export default function BlogCard() {
    return (
        <Card>
            {blogArticles.map((item) =>


                <div key={item.id} className="p-6">
                    <div className="relative">
                        <Image height={256} width={320} style={{ width: '100%', height: 'auto' }}
                            className="object-center w-full h-64 rounded-lg lg:h-80"
                            src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt=""
                        />

                        <div className="absolute bottom-0 flex p-3 bg-white ">
                            <Image height={64} width={64}
                                className="object-cover object-center w-10 h-10 rounded-full"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt=""
                            />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-700">
                                    {item.author}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    </div>

                    <h1 className="mt-6 text-xl font-semibold text-gray-800">
                        {item.title}
                    </h1>

                    <div className="my-6 text-blue-500">
                        <p className="text-sm text-gray-500">
                            {item.description}
                        </p>

                        <Link
                            href={`blog/${item.id}`}
                            className="inline-block mt-4 text-blue-500 underline hover:text-blue-400"
                        >
                            Leia Mais
                        </Link>
                    </div>
                </div>
            )}

        </Card>
    )
}

