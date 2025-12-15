import { useRef } from "react";
import { useDispatch } from "react-redux";
import CategoriesController from "../../controllers/categories-controller";
import Category from "../../models/Category";
import { categoriesActions } from "../../redux/categories-slice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const NewCategoryPage = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const categoryController = new CategoriesController();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!nameRef.current.value.trim()) {
      Swal.fire("Warning", "Please enter a category name!", "warning");
      return;
    }

    const category = new Category(nameRef.current.value.trim());
    const newCategoryId = await categoryController.create(category);
    if (newCategoryId) {
      category.id = newCategoryId;
      dispatch(categoriesActions.create(category));
      toast.success("Category added successfully!", {
        style: { background: "#50cc89", color: "#fff" },
      });
      nameRef.current.value = "";
    } else {
      Swal.fire("Error", "Failed to add category.", "error");
    }
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 15px 25px rgba(0,0,0,0.15)",
    animation: "fadeInUp 0.8s ease",
  };

  const inputStyle = {
    borderRadius: "10px",
    border: "1px solid #50cc89",
    padding: "12px 15px",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: "#50cc89",
    color: "#fff",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 mt-3" style={{ color: "#50cc89" }}>
          Add New Category
        </h1>
      </div>

      <form className="row mt-5" onSubmit={onSubmitHandler} style={formStyle}>
        <div className="col-md-12 mb-4">
          <label
            className="form-label"
            style={{ fontWeight: "600", fontSize: "1rem" }}
          >
            Category Name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            placeholder="Enter category name"
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 0 10px rgba(80,204,137,0.5)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#47be7d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#50cc89")
            }
          >
            Add Category
          </button>
        </div>
      </form>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
};

export default NewCategoryPage;
