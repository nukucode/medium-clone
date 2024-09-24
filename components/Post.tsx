"use client"

import { urlFor } from "@/sanity"
import { Post as PostType } from "@/typing"
import Image from "next/image"
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form"


interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}
interface types {
    post: PostType
}
export function Post({ post }: types) {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        await fetch("/api/createComment",
            {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then((response) => console.trace('🤵', response))
    }


    return (
        <>
            {post && <div>
                <Image src={urlFor(post.mainImage.asset._ref).url()!} alt={post.title} width={0} height={0} sizes="100vw" className="w-full h-40 object-cover" />
                <article className="max-w-3xl mx-auto p-5">
                    <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                    <h1 className="text-xl font-light text-gray-500 mt-10 mb-2">{post.description}</h1>
                    <div className="flex items-center space-x-2">
                        <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-12 h-12 rounded-full object-cover"
                            src={urlFor(post.author.image.asset._ref).url()!} alt={post.author.name} />
                        <p className="font-extralight text-sm">
                            Blog post by <span className="text-green-600">{post.author.name}</span> - Published at

                            {" "}{new Date().toLocaleDateString('en-IN')}
                        </p>
                    </div>
                    <div>
                        <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID} content={post.body}
                            serializers={{
                                h1: (props: any) => (
                                    <h1 className="text-2xl font-bold 
                                     my-5" {...props} />
                                )
                                ,
                                h2: (props: any) => (
                                    <h1 className="text-xl font-bold 
                                     my-5" {...props} />
                                ),
                                li: ({ children }: never) => (
                                    <li className="ml-4 list-disc">{children}</li>
                                ),
                                link: ({ href, children }: never) => (
                                    <a href={href} className="text-blue-500 hover:underline" >{children}</a>
                                ),
                            }} />
                    </div>
                </article>
                <hr className="max-w-lg mx-auto my-5 border border-yellow-500" />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto 
                 mb-10">
                    <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
                    <h4 className="text-3xl font-bold">Leave comment below</h4>
                    <hr className="py-3 mt-2" />
                    <input {...register("_id")}
                        type="hidden"
                        name="_id"
                        value={post._id}
                    />
                    <label className="block mb-5">
                        <span className="text-gray-700">
                            Name</span>
                        <input
                            {...register("name", { required: true })}
                            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" type="text" placeholder="Jhon Deoa" />
                    </label>
                    <label className="block mb-5">
                        <span className="text-gray-700">
                            Email</span>
                        <input
                            {...register("email", { required: true })}
                            className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring" type="email" placeholder="jhondeo@gmaul.com" />
                    </label>
                    <label className="block mb-5">
                        <span className="text-gray-700">
                            Comment</span>
                        <textarea
                            {...register("comment", { required: true })}
                            className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring" placeholder="Description" rows={8} />
                    </label>

                    {/* errors will return when feild validation fails  */}
                    <div className="flex flex-col p-5">
                        {errors.name && <span className="text-red-500">The Name feild required</span>}
                        {errors.email && <span className="text-red-500">The Email feild required</span>}
                        {errors.comment && <span className="text-red-500">The Comment feild required</span>}
                    </div>
                    <button type="submit" className="shadow rounded px-4 cursor-pointer bg-yellow-500 hover:bg-yellow-400 foucs:shadow-outline focus:outline-none text-white font-bold py-2">Submit</button>
                </form>
            </div>
            }
        </>
    )
}
