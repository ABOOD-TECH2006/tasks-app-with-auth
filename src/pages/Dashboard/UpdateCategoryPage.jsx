import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoriesController from "../../controllers/categories-controller";
import Category from "../../models/Category";
import { categoriesActions } from "../../redux/categories-slice";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const UpdateCategoryPage = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.category);
  const navigator = useNavigate();
  const nameRef = useRef();
  const categoriesController = new CategoriesController();

  useEffect(() => {
    if (category) nameRef.current.value = category.name;
  }, [category]);

  const checkData = () => {
    if (nameRef.current.value.trim() !== "") return true;
    Swal.fire("Warning", "Please enter a category name.", "warning");
    return false;
  };

  const save = async () => {
    const updatedCategory = new Category(nameRef.current.value.trim());
    updatedCategory.id = category.id;

    const result = await categoriesController.update(updatedCategory);
    if (result) {
      dispatch(categoriesActions.update({ category: updatedCategory }));
      toast.success("Category updated successfully!");
      setTimeout(() => navigator(-1), 1500);
    } else {
      Swal.fire("Error", "Failed to update category.", "error");
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (checkData()) save();
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Toaster position="top-right" />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 mt-3" style={{ color: "#50cc89" }}>
          Update {category?.name}
        </h1>
      </div>

      <form
        className="row mt-5"
        onSubmit={onSubmitHandler}
        style={{
          backgroundColor: "#fff",
          padding: "40px 30px",
          borderRadius: "15px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          animation: "fadeInUp 0.8s ease",
        }}
      >
        <div className="col-md-12 mb-4">
          <label
            className="form-label"
            style={{ fontWeight: "600", color: "#333" }}
          >
            Category name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            placeholder="Category name"
            style={{
              borderRadius: "8px",
              border: "1px solid #50cc89",
              padding: "10px 15px",
              transition: "all 0.3s ease",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 8px rgba(80,204,137,0.5)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#50cc89",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#47be7d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#50cc89")
            }
          >
            Update Category
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

export default UpdateCategoryPage;
