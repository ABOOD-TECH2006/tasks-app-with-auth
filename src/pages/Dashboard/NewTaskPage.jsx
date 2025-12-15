import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TasksController from "../../controllers/tasks-controller";
import Task from "../../models/Task";
import { tasksActions } from "../../redux/tasks-slice";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const NewTaskPage = () => {
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const tasksController = new TasksController();

  const nameRef = useRef();
  const categoryRef = useRef();
  const detailsRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const imageRef = useRef();

  const [preview, setPreview] = useState(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const checkData = () => {
    if (
      nameRef.current.value.trim() &&
      categoryRef.current.value &&
      detailsRef.current.value.trim() &&
      startDateRef.current.value &&
      endDateRef.current.value
    ) {
      return true;
    }
    Swal.fire("Error", "Please fill in all required fields!", "error");
    return false;
  };

  const save = async () => {
    const category = categories.find(
      (cat) => cat.id == categoryRef.current.value
    );

    const file = imageRef.current.files[0];
    const imageUrl = file ? URL.createObjectURL(file) : null;

    const task = new Task(
      nameRef.current.value.trim(),
      category.id,
      category.name,
      detailsRef.current.value.trim(),
      startDateRef.current.value,
      endDateRef.current.value,
      "Waiting",
      imageUrl
    );

    try {
      const newTaskId = await tasksController.save(task);
      if (newTaskId) {
        task.id = newTaskId;
        dispatch(tasksActions.create(task));
        toast.success("Task added successfully!");
        clearForm();
      } else {
        Swal.fire("Error", "Failed to add task!", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const clearForm = () => {
    nameRef.current.value = "";
    categoryRef.current.value = "";
    detailsRef.current.value = "";
    startDateRef.current.value = "";
    endDateRef.current.value = "";
    imageRef.current.value = "";
    setPreview(null);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (checkData()) save();
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    animation: "fadeInUp 0.8s ease",
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #50cc89",
    padding: "10px",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: "#50cc89",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Toaster position="top-right" />

      <div
        className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom"
        style={{ animation: "fadeInDown 0.8s ease" }}
      >
        <h1 className="h2" style={{ color: "#50cc89" }}>
          Add New Task
        </h1>
      </div>

      <form style={formStyle} onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            placeholder="Task name"
            style={inputStyle}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select ref={categoryRef} className="form-control" style={inputStyle}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Task Details</label>
          <textarea
            ref={detailsRef}
            className="form-control"
            rows="4"
            placeholder="Task details"
            style={inputStyle}
          ></textarea>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Start Date</label>
            <input
              type="datetime-local"
              ref={startDateRef}
              className="form-control"
              style={inputStyle}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">End Date</label>
            <input
              type="datetime-local"
              ref={endDateRef}
              className="form-control"
              style={inputStyle}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Task Image</label>
          <input
            type="file"
            ref={imageRef}
            className="form-control"
            accept="image/*"
            onChange={onImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-fluid mt-2 rounded"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
          )}
        </div>

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
          Add Task
        </button>
      </form>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </main>
  );
};

export default NewTaskPage;
