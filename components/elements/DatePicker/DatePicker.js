import React, { useState } from "react"
import ReactDatePicker from "react-datepicker"
import { addHours, addDays, setMinutes, setHours, getHours } from "date-fns"
import { useField, useFormikContext } from "formik"
import "react-datepicker/dist/react-datepicker.css"

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const BOOKING_TIME_START = 9
const BOOKING_TIME_END = 19

const filterPassedTime = (time) => {
  const currentDate = new Date()
  const selectedDate = new Date(time)
  return (
    currentDate.getTime() < selectedDate.getTime() - 1800000 && // 1800000 (miliseconds) = 30 mins - which means users are not allowed to book too close to the current time, at least 30 mins before the appointment
    selectedDate.getHours() >= BOOKING_TIME_START &&
    selectedDate.getHours() < BOOKING_TIME_END
  )
}

const DatePicker = (props) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props.field)

  return (
    <ReactDatePicker
      {...field}
      {...props}
      selected={field.value}
      onChange={(value, event) => {
        const selectedDate = new Date(value)
        // @TODO set HH:MM to the closest suitable time
        if (!filterPassedTime(selectedDate)) {
          value = setHours(selectedDate, getHours(new Date()) + 1)
        }

        setFieldValue(field.name, value)
      }}
      showTimeSelect
      showTimeInput={false}
      minDate={
        new Date().getHours() >= BOOKING_TIME_END - 2
          ? addDays(new Date(), 1)
          : new Date()
      }
      maxDate={addDays(new Date(), 6)}
      filterTime={filterPassedTime}
      dateFormat="MMMM d, yyyy h:mm aa"
      excludeTimes={[
        //exclude Lunch break times
        setHours(setMinutes(new Date(), 30), 11),
        setHours(setMinutes(new Date(), 0), 12),
        setHours(setMinutes(new Date(), 30), 12),
        setHours(setMinutes(new Date(), 0), 13),
      ]}
      timeIntervals={30}
      onKeyDown={(e) => e.preventDefault()}
    />
  )
}

export default DatePicker
