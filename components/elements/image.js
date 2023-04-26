import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"
import classNames from "classnames"

const NextImage = ({ media, ...props }) => {
  const { className } = props
  const { url, alternativeText, width, height } = media?.data?.attributes ?? {
    url: "http:localhost:1337/uploads/logo_abe2f5b150.png",
    alternativeText: "",
    width: 100,
    height: 100,
  }

  const loader = ({ src, width }) => {
    return getStrapiMedia(src, width)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image {...props} loader={loader} src={url} alt={alternativeText || ""} />
    )
  }

  // The image is responsive
  return (
    <Image
      {...props}
      loader={loader}
      width={width || "100%"}
      height={height || "100%"}
      src={url}
      alt={alternativeText || ""}
      className={classNames("object-cover w-full h-auto", className)}
    />
  )
}

Image.propTypes = {
  // media: mediaPropTypes.isRequired,
  media: mediaPropTypes,
  className: PropTypes.string,
}

export default NextImage
