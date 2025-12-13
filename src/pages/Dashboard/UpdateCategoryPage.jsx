import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesController from "../../controllers/categories-controller";
import Category from "../../models/Category";
import { categoriesActions } from "../../redux/categories-slice";

let UpdateCategoryPage = () => {
  let dispatch = useDispatch();
  let category = useSelector((state) => state.categories.category);
  let navigator = useNavigate();
  let nameRef = useRef();

  let categoriesController = new CategoriesController();

  let setCategoryName = () => {
    nameRef.current.value = category.name;
  };
  useEffect(setCategoryName, []);

  let onSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      save();
    }
  };

  let checkData = () => {
    if (nameRef.current.value != "") {
      return true;
    }
    alert("Enter required data");
    return false;
  };

  let save = async () => {
    let updatedCategory = new Category(nameRef.current.value);
    updatedCategory.id = category.id;
    let result = await categoriesController.update(updatedCategory);
    if (result) {
      dispatch(categoriesActions.update({ category: updatedCategory }));
      navigator(-1);
    }
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 mt-3">Update {category.name}</h1>
      </div>

      <form className="row mt-5" onSubmit={onSubmitHandler}>
        <div className="col-md-12">
          <div className="form-outline mb-4">
            <label className="form-label">Category name</label>
            <input
              type="texy"
              id="loginName"
              ref={nameRef}
              className="form-control"
              placeholder="Category name"
            />
          </div>
        </div>

        <div>
          <button type="submit" className="pull-right btn btn-main mb-4">
            Update Category
          </button>
        </div>
      </form>
    </main>
  );
};
export default UpdateCategoryPage;
