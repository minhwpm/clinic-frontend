import { getStrapiMedia } from "utils/media"

export default function ExpertOption(props) {
  const { data, innerRef, innerProps } = props
  return (
    <div
      {...innerProps}
      className="flex gap-5 p-5 border-b hover:bg-primary-base"
    >
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 object-cover rounded-3xl"
          src={getStrapiMedia(
            data.attributes.portrait.data?.attributes.formats.thumbnail.url
          )}
        />
      </div>
      <div className="text-left">
        <p className="text-sm">
          <span className="font-medium text-base">
            {data.attributes.fullname}
          </span>
          , {data.attributes.jobTitle}
        </p>
        <p className="text-sm">{data.attributes.specialization}</p>
      </div>
    </div>
  )
}
