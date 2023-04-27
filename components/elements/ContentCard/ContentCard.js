import Link from "next/link"
import NextImage from "../image"
import CustomLink from "../custom-link"

const ContentCard = ({ data, variants }) => {
  const { title, summary, slug, media } = data
  if (variants === "top") {
    return (
      <div className="prose-lg border-b py-5">
        {media.data && <NextImage className="col-span-5" media={media} />}
        <h3 className="text-2xl font-semibold mb-3">
          <CustomLink link={{ url: `/blog/${slug}` }}>{title}</CustomLink>
        </h3>
        {summary && <p className="col-span-7">{summary}</p>}
      </div>
    )
  }
  return (
    <div className="border-b py-5">
      <h3 className="text-xl font-semibold mb-3">
        <CustomLink link={{ url: `/blog/${slug}` }}>{title}</CustomLink>
      </h3>
      <div className="prose grid grid-cols-12 gap-5">
        {media.data && <NextImage className="col-span-5" media={media} />}
        {summary && <p className="col-span-7 !mt-0">{summary}</p>}
      </div>
    </div>
  )
}
export default ContentCard
