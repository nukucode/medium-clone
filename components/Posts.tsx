import { urlFor } from "@/sanity"
import { Post } from "@/typing"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface Posts {
    posts: [Post]
}

export function Posts({ posts }: Posts) {
    console.log('🤗', posts)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
            {posts && React.Children.toArray(posts.map((post) => <Link href={`/post/${post.slug.current}`}>
                <div className="border rounded-lg group cursor-pointer overflow-hidden">
                    <Image src={urlFor(post.mainImage.asset._ref).url()!} alt={post.title}
                        width={1000}
                        height={1000}
                        style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="flex justify-between bg-white p-5">
                        <div>
                            <p className="text-lg font-bold">{post.title}</p>
                            <p className="text-xs">{post.description}</p>
                        </div>
                        <div>

                            <Image
                                width="100"
                                height="100"
                                className="w-12 h-12 rounded-full"
                                src={urlFor(post.author.image.asset._ref).url()!} alt={post.author.name} />

                        </div>
                    </div>
                </div>
            </Link>))}
        </div>
    )
}

