import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TasksController from "../../controllers/tasks-controller";
import { tasksActions } from "../../redux/tasks-slice";
import Swal from "sweetalert2";

const statusColors = {
  Waiting: "bg-warning text-dark",
  "In Progress": "bg-info text-white",
  Done: "bg-primary text-white",
  Complete: "bg-success text-white",
  Canceled: "bg-danger text-white",
};

let TaskDetailsPage = () => {
  const task = useSelector((state) => state.tasks.item);
  const dispatch = useDispatch();
  const tasksController = new TasksController();
  const navigator = useNavigate();

  const updateTaskStatusHandler = async (status) => {
    const updatedTask = { ...task, status };
    const result = await tasksController.update(updatedTask);
    if (result) {
      dispatch(tasksActions.update(updatedTask));
      Swal.fire("Updated!", `Task status changed to ${status}`, "success");
    } else {
      Swal.fire("Error", "Failed to update task status", "error");
    }
  };

  const editTaskHandler = () => {
    navigator(`/dashboard/tasks/update`);
  };

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">{task.name}</h1>
        <div className="btn-toolbar">
          <div className="btn-group me-2">
            {Object.keys(statusColors).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => updateTaskStatusHandler(status)}
                className={`btn btn-sm ${
                  task.status === status ? "btn-dark" : "btn-outline-secondary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-success ms-2"
            onClick={editTaskHandler}
          >
            Edit Task
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={task.image ? task.image : "/img/placeholder.png"}
            className="img-fluid rounded shadow"
            alt={task.name}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 mt-3">
          <p>
            <strong>Category:</strong> {task.categoryName}
          </p>
          <p>
            <strong>Duration:</strong> {task.startDate} to {task.endDate}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`badge ${statusColors[task.status]}`}>
              {task.status}
            </span>
          </p>
          <p>
            <strong>Details:</strong>
          </p>
          <div
            className="p-3 border rounded shadow-sm"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {task.details}
          </div>
        </div>
      </div>
    </main>
  );
};

export default TaskDetailsPage;
