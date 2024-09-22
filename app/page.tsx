import { Banner } from "@/components/Banner"
import { Header } from "@/components/Header"
import { sanityClient } from '../sanity';
import { Posts } from "@/components/Posts";

const query = `*[_type=="post"]{
  _id,
  createdAt,
    title,
    author -> {
      name,
        image
    },
    description,
    slug,
    mainImage
}`



export default async function Page() {
  const posts = await sanityClient.fetch(query, undefined, { cache: 'no-store' })
  return (
    <div className="max-x-7xl mx-auto">
      <Header />
      <Banner />
      <Posts posts={posts} />
    </div>
  )
}

