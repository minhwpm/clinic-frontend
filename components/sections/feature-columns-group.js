import NextImage from "../elements/image"
import CustomLink from "../elements/custom-link"
import Slider from "../elements/Slider/Slider"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

const FeatureColumnsGroup = ({ data }) => {
  console.log("Feature Column Group", data)
  return (
    <section className="container py-20">
      {data.title && <h2 className="title mb-10 text-center">{data.title}</h2>}
      <div>
        {data.features.length > 0 && (
          <Slider
            settings={{
              slidesToShow: data.numberOfColumns,
              responsive: [
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ],
            }}
          >
            {data.features.map((feature) => (
              <div className="p-3" key={feature.id}>
                <div className="bg-white rounded-3xl shadow transition-all ease-in-out duration-500 hover:-translate-y-2 hover:shadow-lg pb-5">
                  {feature.picture?.data && (
                    <div className="w-full aspect-w-3 aspect-h-2">
                      <Link href={feature.url ?? "#"} passHref>
                        <NextImage
                          className="thumb rounded-t-3xl"
                          media={feature.picture}
                        />
                      </Link>
                    </div>
                  )}
                  <Link href={feature.url ?? "#"} passHref>
                    <h3 className="text-2xl font-medium mt-6 mb-4 px-8 hover:text-primary-base transition-colors duration-300">
                      {feature.title} <FontAwesomeIcon className="ml-1 w-3" icon={faArrowUpRightFromSquare} size="xs" />
                    </h3>
                  </Link>
                  <p className="text-secondary-300 mb-5 px-8">
                    {feature.description}
                  </p>
                  {/* {feature.link && (
                    <CustomLink link={feature.link}>
                      <div className="text-primary-base px-8 text-lg with-arrow hover:underline">
                        {feature.link.text}
                      </div>
                    </CustomLink>
                  )} */}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  )
}

export default FeatureColumnsGroup
