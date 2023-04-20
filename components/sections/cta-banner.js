import ButtonLink from "@/components/elements/button-link"
import { getButtonAppearance } from "utils/button"

const CTAbanner = ({ data }) => {
  return (
    <section className="container text-center py-10">
      <div className="gradient-section py-16 rounded-3xl px-10">
        <h2 className="title text-white mb-3 max-w-xl m-auto">{data.title}</h2>
        <p className="text-white opacity-80 mb-10 max-w-2xl m-auto">
          {data.description}
        </p>
        {/* Buttons row */}
        <div className="flex flex-row justify-center flex-wrap gap-4">
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "dark")}
              key={button.id}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTAbanner
