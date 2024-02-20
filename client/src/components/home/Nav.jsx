import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
const Nav = () => {
  return (
    <header>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
          <a className="logo" href="#">
            <Link to="/">
              <h3 className="font-bold text-2xl">Revibe</h3>{" "}
            </Link>
          </a>
          <input type="checkbox" id="check" />
          <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
            <li className="nav-li cursor-pointer">
              <FiSearch size={22} />
            </li>
            <li className="nav-li">
              <Link to="/login" className="nav-link">
                sign in
              </Link>
            </li>
            <li className="nav-li relative">
              <Link to="/cart">
                <BsHandbag size={20} />
                <span className="nav-circle">10</span>
              </Link>
            </li>
            <label htmlFor="check" className="close-menu">
              X
            </label>
          </span>
          <label htmlFor="check" className="open-menu">
            Menu
          </label>
        </ul>
      </nav>
    </header>
  );
};
export default Nav;
