import { useDispatch, useSelector } from "react-redux";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import { logoutUser, toggleSidebar } from "../features/user/userSlice";
import { removeAllJobs } from "../features/allJobs/allJobsSlice";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return (
    <nav className="bg-gray-50">
      <div className="mx-auto w-[90%] py-2 flex justify-between items-center">
        {/* toggle */}
        <button
          className="btn bg-transparent border-transparent hover:bg-transparent  hover:border-transparent hover:scale-110"
          onClick={() => dispatch(toggleSidebar())}
        >
          <HiMiniBars3 className="h-6 w-6 text-neutral-focus lg:h-8 lg:w-8" />
        </button>

        <div>
          {/* logo */}
          <div className="flex gap-x-4 items-center lg:hidden">
            <img
              src={logo}
              alt="jobster logo"
              className="w-6 h-6 lg:w-8 lg:h-8"
            />
            <h3 className="text-2xl lg:text-3xl tracking-wide font-bold text-neutral ">
              Jobster
            </h3>
          </div>
          {/* dashboard */}
          <h3 className="hidden text-3xl text-neutral-focus capitalize lg:block">
            dashboard
          </h3>
        </div>

        {/* menu & submenu */}
        <div>
          <ul className="menu menu-sm menu-horizontal px-1 hover:bg-transparent lg:menu-md">
            <li className="bg-neutral rounded-lg">
              <details>
                <summary className="text-base-100 tracking-wide capitalize hover:bg-transparent">
                  <span>
                    <FaUserCircle />
                  </span>
                  {user.name}
                </summary>
                <ul className="p-2">
                  <li className="hover:bg-neutral hover:rounded-lg">
                    <a
                      className="capitalize hover:bg-transparent hover:text-base-100"
                      onClick={() => {
                        dispatch(logoutUser());
                        dispatch(removeAllJobs());
                        // remove all of the queries
                        queryClient.removeQueries();
                        navigate("/landing");
                      }}
                    >
                      logout
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
