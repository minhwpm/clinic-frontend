import Slider from "../../elements/Slider/Slider"
import NextImage from "../../elements/image"

const settings = {
  autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        variableWidth: false,
        slidesToShow: 2,
      },
    },
  ],
}

const Partners = ({ data }) => {
  return (
    <section className="bg-secondary-100 pt-8">
      <h2 className="title text-center mb-10">{data.title}</h2>
      <div className="container px-12 pb-12">
        <Slider className="slider variable-width" settings={settings}>
          {data.logos.map((item) => (
            <div key={item.id} className="px-6 sm:px-12 md:px-16">
              <NextImage media={item.logo} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Partners
