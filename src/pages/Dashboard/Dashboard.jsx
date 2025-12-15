import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NavMenu from "../../components/Dashboard/NavMenu";
import { authActions } from "../../redux/auth-slice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearchChangeHandler = (event) => {
    dispatch({ type: "tasks/filterBySearch", payload: event.target.value });
  };

  const onSignOutHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#50cc89",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("logged_in", false);
        localStorage.setItem("token", "");
        dispatch(authActions.logout());
        toast.success("Signed out successfully!", {
          style: { background: "#50cc89", color: "#fff" },
        });
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      }
    });
  };

  return (
    <Fragment>
      <Toaster position="top-right" />

      {/* Navbar */}
      <header
        className="navbar sticky-top flex-md-nowrap p-0 shadow-sm"
        style={{ background: "#f8f9fa", borderBottom: "2px solid #50cc89" }}
      >
        <a
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fw-bold"
          href="#"
          style={{ color: "#50cc89" }}
        >
          ABOOD Task
        </a>

        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Search Input */}
        <input
          className="form-control w-50 mx-3"
          type="text"
          placeholder="Search tasks..."
          aria-label="Search"
          onChange={onSearchChangeHandler}
          style={{
            borderRadius: "20px",
            border: "1px solid #50cc89",
            padding: "8px 15px",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 8px #50cc89")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        />

        {/* Sign Out Button */}
        <div className="navbar-nav ms-auto px-3">
          <div className="nav-item text-nowrap">
            <button
              className="btn btn-success"
              style={{
                borderRadius: "20px",
                backgroundColor: "#50cc89",
                color: "#fff",
                fontWeight: "600",
                padding: "6px 18px",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#47be7d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#50cc89")
              }
              onClick={onSignOutHandler}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div
        className="container-fluid"
        style={{ background: "#f4f7f6", minHeight: "100vh" }}
      >
        <div className="row">
          <NavMenu />
          <Outlet />
        </div>
      </div>

      {/* Optional Global Animations */}
      <style>{`
        body {
          transition: background 0.3s ease;
        }
        .navbar-brand:hover {
          color: #47be7d;
        }
      `}</style>
    </Fragment>
  );
};

export default Dashboard;
