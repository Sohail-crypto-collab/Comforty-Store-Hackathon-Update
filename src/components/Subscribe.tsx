import { client } from "@/sanity/lib/client"

const Subscribe = async () => {

 const images = await client.fetch(`*[_type == "products" && "instagram" in tags]{
    "imageUrl": image.asset->url,
    title
    }
`)

  return (
    <div >
        
    </div>
  )
}

export default Subscribe
