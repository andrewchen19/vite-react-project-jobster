import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <main className="min-h-screen align-element">
      <nav className="py-6 flex justify-center lg:justify-start space-x-4 items-center">
        <Logo imgSize="h-12 w-12" textSize="4xl" />
      </nav>
      <div className="pt-12">
        <div className="grid text-center items-center lg:text-left lg:grid-cols-2 lg:gap-x-8">
          {/* info */}
          <div>
            <h1 className="text-4xl tracking-wide font-bold leading-loose lg:text-5xl">
              Job <span className="text-secondary">Tracking</span> App
            </h1>
            <p className="mt-4 mx-auto lg:mx-0 leading-7 max-w-[35rem] text-gray-500 lg:mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              quas corrupti quaerat obcaecati necessitatibus dolorem perferendis
              consequuntur quibusdam iusto tempore.
            </p>
            <NavLink
              to="/login"
              className="mt-10 btn btn-sm btn-neutral tracking-wide md:btn-wide md:tracking-wider"
            >
              Login
            </NavLink>
          </div>
          {/* image */}
          <div className="hidden lg:block">
            <img src={main} alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Landing;
