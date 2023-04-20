import { render, screen } from "@testing-library/react"
import Button from "./button"
import "@testing-library/jest-dom"

describe("Button", () => {
  it("renders correctly", () => {
    const { container } = render(<Button />)

    expect(container).toMatchSnapshot()

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
  })
})
