import { default as ReactSlider } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Slider = ({ settings, children }) => {
  return <ReactSlider {...settings}>{children}</ReactSlider>
}
export default Slider;