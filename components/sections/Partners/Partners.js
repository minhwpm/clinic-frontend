import { getStrapiMedia } from "utils/media"

const Partners = ({ data }) => {
  return (
    <section className="bg-secondary-100 pt-12">
      <h2 className="title text-center mb-7">{data.title}</h2>
      <div className="container flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 md:gap-12 lg:gap-32 justify-center items-center">
        {data.logos.map((item) => (
          <div key={item.id} className="w-24 sm:w-auto mb-12">
            <img src={getStrapiMedia(item.logo.data?.attributes.url)} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
