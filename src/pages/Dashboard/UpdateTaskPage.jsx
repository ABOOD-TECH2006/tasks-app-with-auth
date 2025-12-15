import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TasksController from "../../controllers/tasks-controller";
import Task from "../../models/Task";
import { tasksActions } from "../../redux/tasks-slice";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const UpdateTaskPage = () => {
  const categories = useSelector((state) => state.categories.data);
  const task = useSelector((state) => state.tasks.item);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const tasksController = new TasksController();

  const nameRef = useRef();
  const categoryRef = useRef();
  const detailsRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (task) {
      nameRef.current.value = task.name;
      categoryRef.current.value = task.categoryId;
      detailsRef.current.value = task.details;
      startDateRef.current.value = task.startDate;
      endDateRef.current.value = task.endDate;
    }
  }, [task]);

  const checkData = () => {
    if (
      nameRef.current.value &&
      categoryRef.current.value &&
      detailsRef.current.value &&
      startDateRef.current.value &&
      endDateRef.current.value
    ) {
      return true;
    }
    Swal.fire("Warning", "Please fill all required fields!", "warning");
    return false;
  };

  const save = async () => {
    const category = categories.find(
      (element) => element.id == categoryRef.current.value
    );

    const updatedTask = new Task(
      nameRef.current.value.trim(),
      category.id,
      category.name,
      detailsRef.current.value.trim(),
      startDateRef.current.value,
      endDateRef.current.value,
      task.status
    );

    updatedTask.id = task.id;

    // TODO: handle image upload if needed
    if (imageFile) {
      updatedTask.image = URL.createObjectURL(imageFile);
    }

    const result = await tasksController.update(updatedTask);
    if (result) {
      dispatch(tasksActions.update(updatedTask));
      toast.success("Task updated successfully!");
      setTimeout(() => navigator(-1), 1500);
    } else {
      Swal.fire("Error", "Failed to update task.", "error");
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
          Update {task.name}
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
          <label className="form-label" style={{ fontWeight: 600 }}>
            Task Name
          </label>
          <input
            type="text"
            ref={nameRef}
            className="form-control"
            placeholder="Task Name"
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

        <div className="col-md-12 mb-4">
          <label className="form-label" style={{ fontWeight: 600 }}>
            Task Category
          </label>
          <select
            ref={categoryRef}
            className="form-control"
            style={{
              borderRadius: "8px",
              border: "1px solid #50cc89",
              padding: "10px 15px",
              transition: "all 0.3s ease",
            }}
          >
            {categories.map((element) => (
              <option value={element.id} key={element.id}>
                {element.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12 mb-4">
          <label className="form-label" style={{ fontWeight: 600 }}>
            Task Details
          </label>
          <textarea
            ref={detailsRef}
            rows="4"
            className="form-control"
            style={{
              borderRadius: "8px",
              border: "1px solid #50cc89",
              padding: "10px 15px",
              transition: "all 0.3s ease",
            }}
          ></textarea>
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{ fontWeight: 600 }}>
            Start Date
          </label>
          <input
            type="datetime-local"
            ref={startDateRef}
            className="form-control"
            style={{
              borderRadius: "8px",
              border: "1px solid #50cc89",
              padding: "10px 15px",
            }}
          />
        </div>

        <div className="col-md-6 mb-4">
          <label className="form-label" style={{ fontWeight: 600 }}>
            End Date
          </label>
          <input
            type="datetime-local"
            ref={endDateRef}
            className="form-control"
            style={{
              borderRadius: "8px",
              border: "1px solid #50cc89",
              padding: "10px 15px",
            }}
          />
        </div>

        <div className="col-md-12 mb-4">
          <label className="form-label" style={{ fontWeight: 600 }}>
            Task Image
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ borderRadius: "8px", padding: "5px" }}
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
            Update Task
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

export default UpdateTaskPage;
