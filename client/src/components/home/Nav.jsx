import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  console.log(total);
  const dispatch = useDispatch();
  return (
    <header>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
          <Link to="/">
            <h3 className="logo font-bold text-2xl">Revibe</h3>{" "}
          </Link>
          <input type="checkbox" id="check" />
          <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
            <li className="nav-li cursor-pointer">
              <FiSearch size={22} onClick={() => dispatch(toggleSearchBar())} />
            </li>
            {userToken ? (
              <li className="nav-li">
                <Link to="/user" className="nav-link">
                  {user?.name}
                </Link>
              </li>
            ) : (
              <li className="nav-li">
                <Link to="/login" className="nav-link">
                  sign in
                </Link>
              </li>
            )}
            <li className="nav-li relative">
              <Link to="/cart">
                <BsHandbag size={20} />
                <span className="nav-circle">{items}</span>
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
      <Search />
    </header>
  );
};
export default Nav;
