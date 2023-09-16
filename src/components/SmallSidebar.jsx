import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import NavLinks from "./NavLinks";
import { toggleSidebar } from "../features/user/userSlice";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  return (
    <aside className="lg:hidden">
      {/* background */}
      {/* inset:0, 代表將上下左右四邊邊距都設成 0 */}
      <div
        className={`fixed w-full h-full inset-0 flex justify-center items-center duration-300 ${
          isSidebarOpen ? "z-10 opacity-100" : "-z-10 opacity-0"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        {/* content */}
        <div className="bg-white h-[95vh] w-[90vw] rounded-lg px-8 py-16 relative flex flex-col items-center gap-y-4">
          {/* close btn */}
          <button
            className="absolute left-[20px] top-[20px] text-2xl text-secondary-focus"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          {/* logo */}
          <Logo imgSize="h-12 w-12" textSize="3xl" />
          {/* links */}
          <div className="mt-6">
            <ul className="menu menu-vertical space-y-4">
              <NavLinks />
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SmallSidebar;
