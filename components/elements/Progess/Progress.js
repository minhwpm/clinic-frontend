import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Progress = ({ milestones, activeIndex }) => {
  console.log(milestones.length, activeIndex)
  return (
    <div>
      <div className="flex justify-center relative">
        {milestones.map((milestone, index) => (
          <>
            <div
              key={milestone.name}
              className={classNames(
                "w-8 h-8 border-2 inline-block rounded-full flex justify-center",
                {
                  "border-primary-light": index >= activeIndex,
                },
                {
                  "bg-primary-base": index === activeIndex,
                },
                {
                  "border-primary-light": index < activeIndex,
                  "bg-primary-light": index < activeIndex,
                }
              )}
            >
              {index < activeIndex && (
                <FontAwesomeIcon
                  className="mt-1"
                  icon={faCheck}
                  size="lg"
                  style={{ color: "#ffffff" }}
                />
              )}
            </div>
            {index < milestones.length - 1 && (
              <div className="flex w-16 items-center justify-center">
                <div className="h-0.5 w-11/12 bg-primary-light" />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default Progress