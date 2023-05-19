import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Slider from "../../elements/Slider/Slider"
import NextImage from "../../elements/image"
import Link from "next/link"
import {
  faCalendarDay,
  faPhone,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons"

const settings = {
  autoplay: true,
  infinite: true,
  speed: 1500,
  pausedOnFocus: true,
}

const BannerCarousel = ({ data }) => {
  return (
    <section className="banner-carousel md:relative">
      <Slider settings={settings}>
        {data.banners.map((item) => (
          <div key={item.id} className="">
            <Link href={item.url} passHref>
              <NextImage media={item.image} />
            </Link>
          </div>
        ))}
      </Slider>
      <div className="flex flex-col md:flex-row items-center gap-y-5 m-auto max-w-full p-5 rounded-2xl gradient-section md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2">
        {data.hotLinks.map((item) => (
          <div
            key={item.id}
            className="px-5 uppercase font-semibold text-white hover:underline underline-offset-4 transition-all duration-700"
          >
            <Link href={item.url} className="flex">
              {icon && (
                <FontAwesomeIcon icon={icon(item.icon)} className="w-5 mr-2" />
              )}
              {item.text}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function icon(key) {
  switch (key) {
    case "phone":
      return faPhone
    case "doctor":
      return faUserDoctor
    case "calendar":
      return faCalendarDay
    default:
      break
  }
}

export default BannerCarousel
