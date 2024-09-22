"use client"

import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { sanityClient } from "@/sanity"
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

const query = `*[_type=="post" && slug.current == $slug][0]{
  _id,
    title,
    author -> {
      name,
      image
    },
    description,
    slug,
    mainImage,
    body
}`;



export default function PostPage() {
    const [post, setPost] = useState()
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            const post = await sanityClient.fetch(query, {
                slug: params?.post
            })
            setPost(post)
        }

        fetchData();
    }, [params])

    console.trace('👸', post)

    return (
        <main>
            <Header />
            <Post post={post} />
        </main>
    )
}
