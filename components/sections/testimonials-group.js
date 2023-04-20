import classNames from "classnames"
import NextImage from "../elements/image"
import CustomLink from "../elements/custom-link"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const settings = {
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: function appendDots(dots) {
    // @TODO /research/: className="mb-10" doesn't work here as inline style
    return <div style={{ bottom: "-45px" }}>{dots}</div>
  },
  customPaging: function customPaging() {
    return (
      <span
        className={classNames(
          "paging-item",
          "inline-block",
          "rounded-xl",
          "w-3",
          "h-3",
          "border-2",
          "border-primary-base"
        )}
      />
    )
  },
}

const TestimonialsGroup = ({ data }) => {
  return (
    <section className="text-center pt-12 pb-32">
      <h2 className="title mb-4">{data.title}</h2>
      <p className="text-secondary-300 mb-4 max-w-2xl m-auto">
        {data.description}
      </p>

      <div className="container px-12">
        <Slider {...settings}>
          {data.testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="p-5 max-w-3xl">
              <div className="bg-white shadow-sm sm:shadow-md mt-10 text-left rounded-2xl">
                <div className="py-12 px-6">
                  <div className="flex justify-center gap-5 mb-5">
                    <NextImage
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover aspect-square rounded-full"
                      media={testimonial.picture}
                    />
                    <div>
                      <p className="font-medium text-primary-base text-lg sm:text-base">
                        {testimonial.authorName}
                      </p>
                      <p className="text-base sm:text-sm text-secondary-300">
                        {testimonial.authorTitle}
                      </p>
                      <div className="mt-3">
                        <CustomLink
                          link={{
                            url: testimonial.link ?? "",
                            text: "",
                            newTab: false,
                            id: 0,
                          }}
                        >
                          <span className="text-right tracking-wide text-primary-base hover:underline  with-arrow sm:self-end mt-6 sm:mt-0">
                            Read story
                          </span>
                        </CustomLink>
                      </div>
                    </div>
                  </div>
                  <p className="italic text-center text-lg sm:text-base font-light overflow-hidden line-clamp-6">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default TestimonialsGroup
