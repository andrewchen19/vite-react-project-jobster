import Logo from "./Logo";
import { useSelector } from "react-redux";
import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  console.log(isSidebarOpen);

  return (
    <aside className="hidden lg:block bg-gray-50">
      {/* background */}
      <div
        className={`w-[220px] h-full min-h-screen duration-300 ${
          isSidebarOpen ? "ml-0" : "-ml-[220px]"
        }`}
      >
        {/* content */}
        <div className="p-4">
          <header>
            <Logo imgSize="8" textSize="3xl" />
          </header>
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

export default BigSidebar;
