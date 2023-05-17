import React, {useState} from "react"
import ReactDatePicker from "react-datepicker"
import { addHours, addDays, setMinutes, setHours, setSeconds } from "date-fns"
import { useField, useFormikContext } from "formik"
import "react-datepicker/dist/react-datepicker.css"
import classNames from "classnames"

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const BOOKING_TIME_START = 9
const BOOKING_TIME_END = 19

const ADVANCED_HOURS = 1 //users are not allowed to book too close to the current time

const validateTimeFrame = (date, timeframe) => {
  const currentDate = new Date()
  if (!date || date.getDay() === currentDate.getDay()) {
    return currentDate.getHours() <= timeframe - ADVANCED_HOURS
  }
  return true
}

const timeframes = [
  {
    label: "9:00",
    value: {
      hour: 9,
      min: 0,
    },
  },
  {
    label: "9:30",
    value: {
      hour: 9,
      min: 30,
    },
  },
  {
    label: "10:00",
    value: {
      hour: 10,
      min: 0,
    },
  },
  {
    label: "10:30",
    value: {
      hour: 10,
      min: 30,
    },
  },
  {
    label: "11:00",
    value: {
      hour: 11,
      min: 0,
    },
  },
  {
    label: "13:30",
    value: {
      hour: 13,
      min: 30,
    },
  },
  {
    label: "14:00",
    value: {
      hour: 14,
      min: 0,
    },
  },
  {
    label: "14:30",
    value: {
      hour: 14,
      min: 30,
    },
  },
  {
    label: "15:00",
    value: {
      hour: 15,
      min: 0,
    },
  },
  {
    label: "15:30",
    value: {
      hour: 15,
      min: 30,
    },
  },
  {
    label: "16:00",
    value: {
      hour: 16,
      min: 0,
    },
  },
  {
    label: "16:30",
    value: {
      hour: 16,
      min: 30,
    },
  },
]

const DatePicker = (props) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props.field)

  return (
    <>
      <ReactDatePicker
        {...field}
        {...props}
        selected={field.value ?? new Date()}
        onChange={(value) => {
          const selectedDate = new Date(value)
          const currentDate = new Date()
          // if ( selectedDate.getDay() === currentDate.getDay() && (selectedDate.getHours() < currentDate.getHours())) {
          //   console.log("invalid timeframe")
          //   setFieldValue(null)
          //   return
          // }
          setFieldValue(field.name, selectedDate)
        }}
        minDate={
          new Date().getHours() >= BOOKING_TIME_END - 2
            ? addDays(new Date(), 1)
            : new Date()
        }
        maxDate={addDays(new Date(), 6)}
        dateFormat="MMMM d, yyyy"
        onKeyDown={(e) => e.preventDefault()}
      />
      <div className="mt-5 grid grid-cols-4 gap-3">
        {timeframes.map((item) => (
          <span
            key={item.label}
            className={classNames(
              "p-3 col-span-1 rounded-xl border border-gray-300 text-center transition-all duration-300",
              {
                "cursor-pointer  hover:bg-primary-light hover:border-primary-base":
                  validateTimeFrame(field.value, item.value.hour),
              },
              {
                "pointer-events-none text-gray-400 bg-gray-200":
                  !validateTimeFrame(field.value, item.value.hour),
              },
              {
                "bg-primary-base text-white hover:bg-primary-dark":
                  field.value &&
                  field.value.getHours() === item.value.hour &&
                  field.value.getMinutes() === item.value.min,
              }
            )}
            onClick={() => {
              let value = setHours(field.value ?? new Date(), item.value.hour)
              value = setMinutes(value, item.value.min)
              value = setSeconds(value, 0)
              setFieldValue(field.name, value)
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </>
  )
}

export default DatePicker
