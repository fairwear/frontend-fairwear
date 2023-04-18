import MovingText from "./MovingText";
import fw from "@assets/svg/FW200.svg";
import "./CommonComponents.css";

const SubHeader = () => {
  return (
    <div className="subheader-container">
      <div className="image-container">
        <img src={fw} alt="fw" className="logo-pic" />
      </div>
      <MovingText />
    </div>
  );
};

export default SubHeader;
