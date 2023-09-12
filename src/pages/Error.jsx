import notfoundImg from "../assets/images/notfound.svg";

import { NavLink, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  // page not found
  if (error.status === 404) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center lg:flex-row">
        <div className="max-w-[500px]">
          <img src={notfoundImg} alt="page not found" className="w-full" />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            page not found
          </h1>
          <p className="mt-3 text-lg leading-8">
            Sorry, we couldn’t find the page you’re looking for
          </p>
          <div className="mt-6">
            <NavLink to="/" className="btn btn-sm btn-outline btn-error">
              back home
            </NavLink>
          </div>
        </div>
      </main>
    );
  }

  // other errors
  return (
    <main className="w-screen h-screen flex justify-center items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was an error ...</h4>
    </main>
  );
};

export default Error;
