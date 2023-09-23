import "./LoadImage.css";
import spinner from "../../assets/spinner4.gif"

const LoadImage = ({width}) => {
    return(
        <div className="load-image-container">
            <img width={width} className="load-image" src={spinner} ></img>
        </div>
    )
}
export default LoadImage;