import logo from "../assets/images/logo.png";

const Logo = ({ imgSize, textSize }) => {
  return (
    <div className="flex gap-x-4 items-center">
      <img src={logo} alt="jobster logo" className={imgSize} />
      <h3
        className={`tracking-wide font-bold text-neutral text-${
          textSize || "3xl"
        }`}
      >
        Jobster
      </h3>
    </div>
  );
};

export default Logo;
