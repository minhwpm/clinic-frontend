import NextImage from "../elements/image"
import CustomLink from "../elements/custom-link"

const FeatureColumnsGroup = ({ data }) => {
  return (
    <section className="container py-20">
      {data.title && <h2 className="title mb-10 text-center">{data.title}</h2>}
      <div className="grid grid-cols-12 gap-6">
        {data.features.length > 0 &&
          data.features.map((feature) => (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-3xl shadow transition-all ease-in-out duration-500 hover:-translate-y-2 hover:shadow-lg pb-5"
              key={feature.id}
            >
              {feature.picture?.data && (
                <NextImage className="rounded-t-3xl" media={feature.picture} />
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
          ))}
      </div>
    </section>
  )
}

export default FeatureColumnsGroup
