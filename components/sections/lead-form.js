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
  age: yup.number().positive("Please enter a positive number"),
})

const LeadForm = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [succeeded, setShowSuccess] = useState(false)

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
              setLoading(true)
              try {
                setErrors({ api: null })
                await fetchAPI(
                  "/lead-form-submissions/",
                  {},
                  {
                    method: "POST",
                    body: JSON.stringify({
                      data: {
                        fullname: values.fullname,
                        age: values.age ? values.age : null,
                        phone: values.phone,
                        concern: values.concern,
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
                      placeholder={data?.fullnamePlaceholder ?? "Full name (*)"}
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
                      type="number"
                      name="age"
                      placeholder="Age"
                    />
                    <p className="text-red-500 text-sm mt-1 ml-2">
                      {(errors.age && touched.age && errors.age) || errors.api}
                    </p>
                  </div>
                  <Field
                    className="col-span-2 h-24 text-base focus:outline-none hover:border-gray-400 p-4 border-2 rounded-md"
                    component="textarea"
                    name="concern"
                    placeholder="Please enter your health concern"
                  />

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
              Thank you for letting us know!
            </p>
            <p className="">We have recieved your request.</p>
            <p className="">
              We are going to contact with you soon to confirm about your
              request.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadForm
