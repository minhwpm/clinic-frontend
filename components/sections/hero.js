import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"

const Hero = ({ data }) => {
  return (
    <main className="container flex flex-col lg:flex-row items-center justify-between py-12">
      {/* Left column for content */}
      <div className="w-full lg:w-5/12 sm:pr-8">
        {/* Hero section label */}
        <p className="uppercase tracking-wide font-semibold">{data.label}</p>
        {/* Big title */}
        <h1 className="text-4xl leading-12 md:text-5xl md:leading-16 font-bold gradient-text mt-2 sm:mt-0 mb-4 sm:mb-8">
          {data.title}
        </h1>
        {/* Description paragraph */}
        <p className="text-lg mb-6 text-secondary-300">{data.description}</p>
        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))}
        </div>
        {/* Small rich text */}
        <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
          <Markdown>{data.smallTextWithLink}</Markdown>
        </div>
      </div>
      {/* Right column for the image */}
      <div className="w-full lg:w-7/12 mt-6 md:mt-0">
        <NextImage media={data.picture} />
      </div>
    </main>
  )
}

export default Hero
