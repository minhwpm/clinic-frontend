import React, { useEffect, useState } from "react"
import { fetchAPI, getStrapiURL } from "utils/api"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import Button from "../elements/Button/button"
import DatePicker from "../elements/DatePicker/DatePicker"
import CustomSelect from "../elements/CustomSelect/CustomSelect"
import ExpertSelect from "../elements/CustomSelect/ExpertSelect"
import NextImage from "../elements/image"

const genderOptions = [
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "others",
    label: "Others", //@TODO change to Nonbinary
  },
]

const requiredErrorMessage = "This field is required"

const BookingSchema = yup.object().shape({
  fullname: yup.string().required(requiredErrorMessage),
  phone: yup
    .string()
    .required(requiredErrorMessage)
    .matches(
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      "Please enter a valid phone number"
    ),
  email: yup.string().email("Please enter a valid email address"),
  age: yup.number().positive("Please enter a positive number"),
  appointmentDatetime: yup.date(),
})

const BookingForm = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [experts, setExperts] = useState([])
  const [succeeded, setShowSuccess] = useState(false)

  // console.log(data)

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
  }, [])

  return (
    <div id="booking-form" className="bg-secondary-100 pt-20 pb-10 text-center">
      <div className="container flex items-center justify-center">
        {data?.media.data && (
          <div className="hidden lg:block w-1/2 pr-28">
            <NextImage media={data.media} />
          </div>
        )}
        {!succeeded && (
          <Formik
            initialValues={{
              fullname: "",
              phone: "",
              email: "",
              age: "",
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
                        expert: {
                          connect: values.expert?.id
                            ? [{ id: values.expert?.id }]
                            : null,
                        },
                        appointmentDatetime: values.appointmentDatetime,
                        fullname: values.fullname,
                        age: values.age ? values.age : null,
                        gender: values.gender?.value,
                        visitReason: values.visitReason,
                        phone: values.phone,
                        email: values.email,
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
            {({ errors, touched, isSubmitting }) => (
              <>
                <Form
                  className={`w-full max-w-lg grid grid-cols-2 gap-4 justify-center text-left`}
                >
                  <h2 className="title col-span-2 text-center mb-10">
                    {data?.title ?? "Request an Appointment"}
                  </h2>
                  <div className="col-span-2">
                    <Field
                      className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                      type="text"
                      name="fullname"
                      placeholder={data?.fullnamePlaceholder ?? "Full name *"}
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
                      className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                      type="phone"
                      name="phone"
                      placeholder={"Phone *"}
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
                      placeholder={"Email"}
                    />
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {(errors.email && touched.email && errors.email) ||
                        errors.api}
                    </p>
                  </div>

                  <div className="col-span-1">
                    <Field
                      className="w-full h-14 text-base focus:outline-none hover:border-gray-400 py-4 md:py-0 px-4 border-2 rounded-md"
                      type="number"
                      name="age"
                      placeholder="Age"
                    />
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {(errors.age && touched.age && errors.age) || errors.api}
                    </p>
                  </div>

                  <Field
                    id="gender-select"
                    className="col-span-1"
                    name="gender"
                    placeholder={
                      <div className="text-gray-400 px-1.5">
                        Select your gender
                      </div>
                    }
                    options={genderOptions}
                    component={CustomSelect}
                  />

                  <Field
                    className="col-span-2 h-24 text-base focus:outline-none hover:border-gray-400 p-4 border-2 rounded-md"
                    component="textarea"
                    name="visitReason"
                    placeholder="Please enter the reason for your visit..."
                  />

                  <div className="col-span-2 my-3">
                    <label
                      htmlFor="expert"
                      className="w-full text-xl font-medium block mb-1"
                    >
                      Select doctor
                    </label>
                    <Field
                      id="expert-select"
                      name="expert"
                      placeholder={
                        <div className="text-gray-400 px-1.5">
                          Click to select a doctor
                        </div>
                      }
                      options={experts}
                      component={ExpertSelect}
                    />
                  </div>

                  <div className="col-span-2 my-3">
                    <label
                      htmlFor="appointmentDatetime"
                      className="w-full text-xl font-medium block mb-1"
                    >
                      Select datetime
                    </label>
                    <Field
                      className="datetime-input w-full h-14 px-4 border-2 border-gray-200 hover:border-gray-400 rounded cursor-pointer text-transparent text-shadow"
                      name="appointmentDatetime"
                      placeholderText="Click to select datetime"
                      component={DatePicker}
                      required
                    />
                  </div>

                  <div className="col-span-2 my-3 text-center">
                    <Button
                      className="w-32"
                      appearance="dark"
                      type="submit"
                      button={data?.submitButton ?? { text: "Submit" }}
                      disabled={isSubmitting}
                      loading={loading}
                    />
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

export default BookingForm
