import Link from "next/link"
import NextImage from "../image"
import CustomLink from "../custom-link"

const ContentCard = ({ data, variants }) => {
  const { title, summary, slug, media } = data
  if (variants === "top") {
    return (
      <div className="py-5">
        <div className="aspect-w-3 aspect-h-2">
          <NextImage className="thumb rounded-lg" media={media} />
        </div>
        <h3 className="text-2xl font-semibold mt-8 mb-3">
          <CustomLink link={{ url: `/blog/${slug}` }}>{title}</CustomLink>
        </h3>
        {summary && <p className="text-lg leading-8">{summary}</p>}
      </div>
    )
  }
  return (
    <div className="py-5 border-b">
      <h3 className="text-xl font-semibold mb-3">
        <CustomLink link={{ url: `/blog/${slug}` }}>{title}</CustomLink>
      </h3>
      <div className="flex gap-5">
        {media.data && (
          <div className="w-2/5 p-2">
            <div className="aspect-w-3 aspect-h-2">
              <NextImage className="thumb rounded-lg" media={media} />
            </div>
          </div>
        )}
        {summary && <p className="w-3/5 leading-7">{summary}</p>}
      </div>
    </div>
  )
}
export default ContentCard
