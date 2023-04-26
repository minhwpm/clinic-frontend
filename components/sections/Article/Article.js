import { useContext } from "react"
import NextImage from "@/components/elements/image"
import Markdown from "react-markdown"
import { PageContext } from "@/components/layout"

const Article = ({ data }) => {
  const pageContext = useContext(PageContext)
  // console.log("Article DATA", data)
  // console.log("pageContext", pageContext)
  return (
    <div className="container">
      <article className="lg:w-9/12 m-auto my-10 prose prose-lg">
        <h1 className="font-serif">{pageContext.title}</h1>
        <p className="">{data.articleSummary}</p>
        <NextImage className="my-8" media={data.articleThumbnail} />
        <Markdown>{data.articleContent}</Markdown>
      </article>
    </div>
  )
}

export default Article
