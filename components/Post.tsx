import { urlFor } from "@/sanity"
import { Post as PostType } from "@/typing"
import Image from "next/image"

interface types {
    post: PostType
}
export function Post({ post }: types) {
    console.log(post);
    return (
        <>
            {post && <div>
                <Image src={urlFor(post.mainImage.asset._ref).url()!} alt={post.title} width={1000} height={1000} style={{ width: "100%", height: "180px" }} className="w-full h-40 object-contain" />
                <article className="max-w-3xl mx-auto p-5">
                    <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                    <h1 className="text-xl font-light text-gray-500 mt-10 mb-2">{post.description}</h1>
                    <div>
                        <Image
                            width={50}
                            height={50}
                            className="w-12 h-12 rounded-full"
                            src={urlFor(post.author.image.asset._ref).url()!} alt={post.author.name} />
                        <p className="font-extralight text-sm">
                            Blog post by {post.author.name} - Published at
                          
      {new Date(post._createdAt).toLocaleDateString('en-US')}
                        </p>
                    </div>
                </article>
            </div>
            }
        </>
    )
}

