import CustomSelect from "./CustomSelect"
import ExpertOption from "./ExpertOption"
import { useField } from "formik"
import { getStrapiMedia } from "utils/media"

export default function ExpertSelect(props) {
  const [field] = useField(props.field)
  return (
    <>
      <CustomSelect {...props} components={{ Option: ExpertOption }} />
      {field.value && (
        <div className="mt-2 flex gap-5 p-5 rounded shadow bg-white">
          <div className="flex-shrink-0">
            <img
              className="w-14 h-14 object-cover rounded-full"
              src={getStrapiMedia(
                field.value.attributes.portrait.data?.attributes.formats
                  .thumbnail.url
              )}
            />
          </div>
          <div className="text-left">
            <p className="text-sm">
              <span className="font-medium text-base">
                {field.value.attributes.fullname}
              </span>
              , {field.value.attributes.jobTitle}
            </p>
            <p className="text-sm">{field.value.attributes.specialization}</p>
          </div>
        </div>
      )}
    </>
  )
}
