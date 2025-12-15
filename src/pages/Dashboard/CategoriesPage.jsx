import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryRow from "../../components/Categories/CategoryRow";
import CategoriesController from "../../controllers/categories-controller";
import { categoriesActions } from "../../redux/categories-slice";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const CategoriesPage = () => {
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const categoryController = new CategoriesController();

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryController.read();
      dispatch(categoriesActions.read(data));
    } catch {
      Swal.fire("Error", "Failed to load categories", "error");
    }
  };

  const onDeleteCategory = async (categoryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#50cc89",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const success = await categoryController.delete(categoryId);
      if (success) {
        dispatch(categoriesActions.delete(categoryId));
        toast.success("Category deleted successfully!", {
          style: { background: "#50cc89", color: "#fff" },
        });
      } else {
        Swal.fire("Error!", "Failed to delete category.", "error");
      }
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div
        className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-4"
        style={{
          borderBottom: "3px solid #50cc89",
        }}
      >
        <h1 style={{ color: "#50cc89", fontWeight: 700, fontSize: "28px" }}>
          Categories
        </h1>
      </div>

      <div
        className="category-list"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {categories.map((category, index) => (
          <CategoryRow
            key={category.id}
            category={category}
            onDelete={onDeleteCategory}
          />
        ))}
      </div>

      <Toaster position="top-right" />
    </main>
  );
};

export default CategoriesPage;
