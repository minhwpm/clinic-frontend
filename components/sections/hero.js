import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"
import classNames from "classnames"

const Hero = ({ data }) => {
  return (
    <main
      className={classNames(
        { container: data.styling === "side_by_side" },
        { "py-12": data.styling === "side_by_side" },
        "flex flex-col lg:flex-row items-center justify-between"
      )}
    >
      {data.styling === "overlay" && (
        <div className="w-full relative">
          <NextImage media={data.picture} priority />
          <div className="absolute container top-1/2 left-1/2 -translate-x-1/2">
            <h1 className="text-4xl leading-12 md:text-5xl md:leading-16 font-bold text-white drop-shadow mt-2 sm:mt-0 mb-4 sm:mb-8 lg:w-2/3 xl:w-1/2">
              {data.title}
            </h1>
            <p className="text-lg mb-6 text-white drop-shadow lg:w-2/3 xl:w-1/2">
              {data.description}
            </p>
            <div className="flex flex-row flex-wrap gap-4">
              {data.buttons.map((button) => (
                <ButtonLink
                  button={button}
                  appearance={getButtonAppearance(button.type, "light")}
                  key={button.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {data.styling === "side_by_side" && (
        <>
          {/* Left column for content */}
          <div className="w-full lg:w-5/12 sm:pr-8">
            <p className="uppercase tracking-wide font-semibold">
              {data.label}
            </p>
            <h1 className="text-4xl leading-12 md:text-5xl md:leading-16 font-bold gradient-text mt-2 sm:mt-0 mb-4 sm:mb-8">
              {data.title}
            </h1>
            <p className="text-lg mb-6 text-secondary-300">
              {data.description}
            </p>
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
            <NextImage media={data.picture} priority />
          </div>
        </>
      )}
    </main>
  )
}

export default Hero
