import { NavLink } from "react-router-dom";
import { links } from "../utilize";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";

const NavLinks = () => {
  const dispatch = useDispatch();

  return (
    <>
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <li key={id}>
            <NavLink
              to={path}
              className="flex items-center gap-x-4 text-2xl capitalize"
              onClick={() => dispatch(toggleSidebar())}
            >
              {icon}
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
