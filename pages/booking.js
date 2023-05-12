import Screen from "@/components/elements/Screen/Screen"
import React, { useEffect, useState } from "react"
import { fetchAPI, getStrapiURL } from "utils/api"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import Button from "@/components/elements/Button/button"
import DatePicker from "@/components/elements/DatePicker/DatePicker"
import CustomSelect from "@/components/elements/CustomSelect/CustomSelect"
import ExpertSelect from "@/components/elements/CustomSelect/ExpertSelect"
import classNames from "classnames"
import process from "../json/booking.json"

const requiredErrorMessage = "This field is required"

const BookingSchema = yup.object().shape({
  requestorFullname: yup.string().required(requiredErrorMessage),
  phone: yup
    .string()
    .required(requiredErrorMessage)
    .matches(
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      "Please enter a valid phone number"
    ),
  email: yup.string().email("Please enter a valid email address"),
  age: yup.number().positive("Please enter a positive number"),
  bookingTime: yup.date(),
})

export default function Booking() {
  const steps = process.reduce((prev, curr) => {
    return [...prev, ...curr.steps]
  }, [])
  const fields = steps.reduce((prev, curr) => [...prev, ...curr.fields], [])
  // console.log("Process", process)
  console.log("Steps", steps)

  const [loading, setLoading] = useState(false)
  const [isContinued, setContinued] = useState(false)
  const [experts, setExperts] = useState([])
  const [services, setServices] = useState([])
  const [succeeded, setShowSuccess] = useState(false)
  const [activeScreen, setActiveScreen] = useState(0)

  useEffect(() => {
    fetch(getStrapiURL("/api/experts?populate=*"))
      .then((res) => res.json())
      .then((data) => {
        const result = data.data.map((item) => {
          return {
            ...item,
            value: item.id,
            label: `${item.attributes.fullname}, ${item.attributes.jobTitle}`,
          }
        })
        setExperts(result)
      })

    fetch(getStrapiURL("/api/services"))
      .then((res) => res.json())
      .then((data) => {
        const result = data.data.map((item) => {
          return {
            ...item,
            value: item.id,
            label: `${item.attributes.title}`,
          }
        })
        setServices(result)
      })
  }, [])

  return (
    <div id="booking-form" className="bg-secondary-100 pt-20 pb-10 text-center">
      <div className="container flex items-center justify-center">
        {!succeeded && (
          <Formik
            initialValues={{
              isPatient: "",
              // Dummy Data to test Confirm Step
              isPatient: "NO",
              requestorFullname: "Nguyen Thi Minh Hien",
              relationship: {
                label: "Parents",
                value: "parents",
              },
              requestorEmail: "",
              requestorPhone: "0918097143",
              fullname: "Hoang Nguyen Bao Han",
              age: 4,
              gender: {
                label: "Female",
                value: "female",
              },
              email: "",
              phone: "0918097143",
              concern: "cough",
              service: {
                label: "Primary Care",
                value: 1,
              },
              // expert: {
              //   label: "",
              //   value: null
              // }
            }}
            validationSchema={BookingSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              console.log("submit", values)
              setLoading(true)
              try {
                setErrors({ api: null })
                await fetchAPI(
                  "/booking-form-submissions/",
                  {},
                  {
                    method: "POST",
                    body: JSON.stringify({
                      data: {
                        service: {
                          connect: values.service?.id
                            ? [{ id: values.service?.id }]
                            : null,
                        },
                        expert: {
                          connect: values.expert?.id
                            ? [{ id: values.expert?.id }]
                            : null,
                        },
                        bookingTime: values.bookingTime,
                        fullname: values.fullname,
                        age: values.age ? values.age : null,
                        gender: values.gender?.value,
                        concern: values.concern,
                        phone: values.phone,
                        email: values.email,
                        requestorFullname: values.requestorFullname,
                        relationship: values.relationship?.value,
                        requestorEmail: values.requestorEmail,
                        requestorPhone: values.requestorPhone,
                      },
                    }),
                  }
                )
              } catch (err) {
                setErrors({ api: err.message })
              }

              setLoading(false)
              setSubmitting(false)
              setShowSuccess(true)
            }}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <>
                <Form
                  className={`w-full max-w-lg gap-4 justify-center text-left`}
                >
                  <h2 className="title text-center mb-10">
                    Request an Appointment
                  </h2>
                  {steps.map((screen, index) => (
                    <Screen
                      className="grid grid-cols-2 gap-5"
                      key={screen.id}
                      id={screen.id}
                      active={activeScreen === index}
                    >
                      {screen.title && (
                        <h3 className="col-span-2 text-xl font-semibold">
                          {screen.id !== "target" && screen.title}
                          {screen.id === "target" && screen.title.isNotPatient}
                        </h3>
                      )}
                      {screen.fields.map((field, index) => (
                        <div
                          key={field.label}
                          className={classNames("col-span-2", {
                            "col-span-1": field.width === "1/2",
                          })}
                        >
                          {field.type === "radio" && (
                            <label>
                              <Field
                                className="mr-2"
                                type={field.type}
                                name={field.name}
                                value={field.value}
                              />
                              {field.label}
                            </label>
                          )}
                          {field.type === "select" && (
                            <Field
                              className=""
                              type={field.type}
                              name={field.name}
                              placeholder={
                                <div className="text-gray-400 px-1.5">
                                  {field.label}
                                </div>
                              }
                              options={
                                field.name === "expert"
                                  ? experts
                                  : field.name === "service"
                                  ? services
                                  : field.options
                              }
                              component={
                                field.name === "expert"
                                  ? ExpertSelect
                                  : CustomSelect
                              }
                              required={field.required}
                            />
                          )}
                          {field.type === "datetime" && (
                            <Field
                              className="datetime-input w-full h-14 px-4 border-2 border-gray-200 hover:border-gray-400 rounded cursor-pointer text-transparent text-shadow"
                              name={field.name}
                              placeholderText={field.label}
                              component={DatePicker}
                              required={field.required}
                            />
                          )}
                          {field.type === "textarea" && (
                            <Field
                              className="w-full h-24 text-base focus:outline-none hover:border-gray-400 p-4 border-2 rounded-md"
                              component="textarea"
                              name={field.name}
                              placeholder={field.label}
                              value={null}
                              required={field.required}
                            />
                          )}
                          {(field.type === "text" ||
                            field.type === "number" ||
                            field.type === "email" ||
                            field.type === "phone") && (
                            <>
                              <Field
                                className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                                type={field.type}
                                name={field.name}
                                placeholder={field.label}
                                // value={null}
                                required={field.required}
                              />
                              <p className="text-red-500 text-sm mt-1 ml-2">
                                {(errors.fullname &&
                                  touched.fullname &&
                                  errors.fullname) ||
                                  errors.api}
                              </p>
                            </>
                          )}
                        </div>
                      ))}
                    </Screen>
                  ))}
                  <Screen
                    id="confirmation"
                    // active={true}
                    active={activeScreen === steps.length}
                  >
                    {/* CONFIRMATION SCREEN */}
                    {/* {fields.map((field) => (
                      <div key={field.name} className="flex">
                        <div>{field.label}</div>
                        <div>
                          {typeof values[field.name] === "string"
                            ? values[field.name]
                            : values[field.name]?.label
                            ? values[field.name]?.label
                            : values[field.name]?.toString()}
                        </div>
                      </div>
                    ))} */}
                    {Object.keys(values).map((key) =>(
                      <div key={key} className="grid grid-cols-3">
                        <div className="col-span-1">{key}</div>
                        <div className="col-span-2">
                          {typeof values[key] === "string"
                            ? values[key]
                            : values[key].label
                            ? values[key].label
                            : values[key].toString()}
                        </div>
                      </div>
                    ))}
                    {console.log("VALUES", values)}
                    <Button
                      type="submit"
                      button={{ text: "Submit" }}
                      disabled={isSubmitting}
                      loading={loading}
                      appearance="dark"
                    />
                  </Screen>
                  {activeScreen < steps.length && steps[activeScreen].fields.every((field) => {
                    console.log(field.name, values[field.name])
                    return !field.required || Boolean(values[field.name])
                  }) && setContinued(true)}
                  <div className="grid grid-cols-2 py-3">
                    <span
                      className={classNames(
                        { hidden: activeScreen === 0 },
                        "cursor-pointer",
                        "justify-self-start"
                      )}
                    >
                      <Button
                        type="button"
                        handleClick={() => setActiveScreen(activeScreen - 1)}
                        button={{ text: "Back" }}
                      />
                    </span>
                    <span
                      className={classNames(
                        { hidden: activeScreen === steps.length},
                        { "col-span-2": activeScreen === 0 },
                        "cursor-pointer",
                        "place-self-end"
                      )}
                    >
                      <Button
                        type="button"
                        disabled={!isContinued}
                        handleClick={() => {
                          setActiveScreen(activeScreen + 1)
                          setContinued(false)
                        }}
                        button={{ text: "Continue" }}
                      />
                    </span>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        )}
        {succeeded && (
          <div className="text-lg h-80">
            <p className="text-4xl leading-12 font-bold gradient-text mb-9">
              Congratulations!
            </p>
            <p className="">You have successfully requested an appointment.</p>
            <p className="">
              We are going to contact with you soon to confirm about your
              request. Thank you!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

{/* <Screen
                    className="grid grid-cols-2 gap-5"
                    id="target"
                    active={activeScreen === 0}
                  >
                    <div className="col-span-2">
                      <Field
                        className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                        type="text"
                        name="fullname"
                        placeholder={"Full name (*)"}
                        required
                      />
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {(errors.fullname &&
                          touched.fullname &&
                          errors.fullname) ||
                          errors.api}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <Field
                        className="h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                        type="number"
                        name="age"
                        placeholder="Age (optional)"
                      />
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {(errors.age && touched.age && errors.age) ||
                          errors.api}
                      </p>
                    </div>
                    <Field
                      id="gender-select"
                      name="gender"
                      className="col-span-1"
                      placeholder={
                        <div className="text-gray-400 px-1.5">
                          Gender (optional)
                        </div>
                      }
                      options={genderOptions}
                      component={CustomSelect}
                    />
                    <div className="col-span-1">
                      <Field
                        className="h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                        type="phone"
                        name="phone"
                        placeholder={"Phone (*)"}
                        required
                      />
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {(errors.phone && touched.phone && errors.phone) ||
                          errors.api}
                      </p>
                    </div>
                    <div className="col-span-1">
                      <Field
                        className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                        type="email"
                        name="email"
                        placeholder={"Email (optional)"}
                      />
                      <p className="text-red-500 text-sm mt-1 ml-2">
                        {(errors.email && touched.email && errors.email) ||
                          errors.api}
                      </p>
                    </div>
                  </Screen>

                  <Screen
                    className="grid grid-cols-2 gap-5"
                    id="concern"
                    active={activeScreen === 1}
                  >
                    <div className="col-span-2">
                      <Field
                        id="expert-select"
                        name="expert"
                        placeholder={
                          <div className="text-gray-400 px-1.5">
                            Select doctor (optional)
                          </div>
                        }
                        options={experts}
                        component={ExpertSelect}
                      />
                    </div>
                    <Field
                      className="col-span-2 h-24 text-base focus:outline-none hover:border-gray-400 p-4 border-2 rounded-md"
                      component="textarea"
                      name="visitReason"
                      placeholder="Please describe your symptoms or primary concern... (optional)"
                    />
                  </Screen>

                  <Screen
                    className="grid gap-5"
                    id="datetime"
                    active={activeScreen === 2}
                  >
                    <div>
                      <Field
                        className="datetime-input w-full h-14 px-4 border-2 border-gray-200 hover:border-gray-400 rounded cursor-pointer text-transparent text-shadow"
                        name="bookingTime"
                        placeholderText="Select datetime (*)"
                        component={DatePicker}
                        required
                      />
                    </div>
                    <Button
                      appearance="dark"
                      type="submit"
                      button={{ text: "Submit" }}
                      disabled={isSubmitting}
                      loading={loading}
                    />
                  </Screen> */}