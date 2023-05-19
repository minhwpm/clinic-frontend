import NextImage from "../elements/image"
import CustomLink from "../elements/custom-link"
import Slider from "../elements/Slider/Slider"

const sliderSettings = {
  slidesToShow: 3,
}

const FeatureColumnsGroup = ({ data }) => {
  return (
    <section className="container py-20">
      {data.title && <h2 className="title mb-10 text-center">{data.title}</h2>}
      <div>
        {data.features.length > 0 && (
          <Slider settings={sliderSettings} className="">
            {data.features.map((feature) => (
              <div className="p-3" key={feature.id}>
                <div className="bg-white rounded-3xl shadow transition-all ease-in-out duration-500 hover:-translate-y-2 hover:shadow-lg pb-5">
                  {feature.picture?.data && (
                    <div className="w-full aspect-w-3 aspect-h-2">
                      <NextImage
                        className="thumb rounded-t-3xl"
                        media={feature.picture}
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-medium mt-6 mb-4 px-8">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-300 mb-5 px-8">
                    {feature.description}
                  </p>
                  {feature.link && (
                    <CustomLink link={feature.link}>
                      <div className="text-primary-base px-8 text-lg with-arrow hover:underline">
                        {feature.link.text}
                      </div>
                    </CustomLink>
                  )}
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
