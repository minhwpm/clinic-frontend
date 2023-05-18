import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDroplet, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"
import classNames from "classnames"

const SettingsPanel = (props) => {
  const [showed, setShowed] = useState(false)
  return (
    <div {...props} className={classNames(props.className)}>
      <div
        className="shadow h-16 w-32 p-5 rounded-l-lg bg-white font-bold cursor-pointer text-gray-500 uppercase"
        onClick={() => {
          setShowed(!showed)
        }}
      >
        {/* <FontAwesomeIcon
          className="mt-1"
          icon={faCheck}
          size="lg"
          style={{ color: "#ffffff" }}
        /> */}
        <FontAwesomeIcon icon={faDroplet} size="lg" /> Styling
      </div>
      <div
        className={classNames(
          { hidden: !showed },
          "absolute bottom-20 right-0 w-52 rounded-l-lg shadow bg-white p-5 flex flex-col gap-3"
        )}
      >
        <div className="flex flex-col gap-3">
          <Select
            placeholder="Font"
            options={[
              {
                label: "Default",
                value: "Quicksand",
              },
              {
                label: <span style={{ fontFamily: "Poppins" }}>Poppins</span>,
                value: "Poppins",
              },
              {
                label: (
                  <span style={{ fontFamily: "Quicksand" }}>Quicksand</span>
                ),
                value: "Quicksand",
              },
              {
                label: <span style={{ fontFamily: "Raleway" }}>Raleway</span>,
                value: "Raleway",
              },
              {
                label: (
                  <span style={{ fontFamily: "Montserrat" }}>Montserrat</span>
                ),
                value: "Montserrat",
              },
            ]}
            onChange={(newOption, action) => {
              document.documentElement.style.setProperty(
                "--font-sans",
                newOption.value
              )
            }}
          />
          <Select
            placeholder="Primary color"
            options={[
              {
                value: "#047857",
                label: (
                  <div className="text-green-600 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-xl bg-green-700"></div>
                    #047857
                  </div>
                ),
              },
              {
                value: "#7c3aed",
                label: (
                  <div className="text-purple-600 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-xl bg-purple-600" />
                    #7c3aed
                  </div>
                ),
              },
              {
                value: "#4f46e5",
                label: (
                  <div className="text-indigo-600 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-xl bg-indigo-600"></div>
                    #4f46e5
                  </div>
                ),
              },
            ]}
            onChange={(newOption, action) => {
              document.documentElement.style.setProperty(
                "--primary-color",
                newOption.value
              )
            }}
          />
        </div>
        <FontAwesomeIcon
          className="text-gray-500 cursor-pointer"
          icon={faChevronDown}
          size="lg"
          onClick={() => {
            setShowed(false)
          }}
        />
      </div>
    </div>
  )
}

export default SettingsPanel
