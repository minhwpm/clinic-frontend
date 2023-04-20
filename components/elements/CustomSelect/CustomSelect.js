import Select from "react-select"
import { useField, useFormikContext } from "formik"

export default function CustomSelect(props) {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props.field)

  return (
    <Select
      {...props}
      className="placeholder-red-500"
      styles={{
        control: (provided) => ({
          ...provided,
          height: "3.5rem",
          border: "2px solid #E5E7EB",
          placeholder: "#9CA38F",
        }),
      }}
      onChange={(value) => {
        // console.log("onChange", value);
        setFieldValue(field.name, value)
      }}
    />
  )
}
