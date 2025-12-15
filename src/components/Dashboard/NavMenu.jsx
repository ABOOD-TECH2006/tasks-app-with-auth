import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

let NavMenu = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const links = [
    { to: "/dashboard", label: "Tasks", icon: "home" },
    { to: "/dashboard/tasks/new", label: "New Task", icon: "file" },
    { to: "/dashboard/categories", label: "Categories", icon: "grid" },
    {
      to: "/dashboard/categories/new",
      label: "New Category",
      icon: "plus-square",
    },
  ];

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      style={{ minHeight: "100vh", transition: "all 0.3s ease" }}
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {links.map((link) => (
            <li className="nav-item mb-1" key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center px-3 py-2 rounded ${
                    isActive ? "active bg-primary text-white" : "text-dark"
                  }`
                }
                style={{
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  data-feather={link.icon}
                  className="me-2"
                  style={{ minWidth: "20px" }}
                ></span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
