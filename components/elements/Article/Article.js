import NextImage from "@/components/elements/image"
import Markdown from "react-markdown"

const Article = ({ data }) => {
  const { title, summary, content, media } = data
  return (
    <div className="container">
      <article className="lg:w-9/12 m-auto my-10 prose prose-lg">
        <h1 className="font-serif">{title}</h1>
        <p className="">{summary}</p>
        {media.data && <NextImage className="my-8" media={media} />}
        <Markdown>{content}</Markdown>
      </article>
    </div>
  )
}

export default Article
