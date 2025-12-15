import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tasksActions } from "../../redux/tasks-slice";

const statusColors = {
  Waiting: "bg-warning text-dark",
  "In Progress": "bg-info text-white",
  Done: "bg-primary text-white",
  Complete: "bg-success text-white",
  Canceled: "bg-danger text-white",
};

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onShowDetailsHandler = () => {
    dispatch(tasksActions.setItem(task));
    navigator(`/dashboard/tasks/details`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100 task-card"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          transition: "transform 0.3s",
        }}
      >
        <img
          src={task.image || "/img/placeholder.png"}
          className="card-img-top"
          alt={task.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{task.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {task.startDate} <span className="text-success">to</span>{" "}
            {task.endDate}
          </h6>
          <p className="card-text flex-grow-1">{task.details}</p>
          <span className={`badge ${statusColors[task.status]} mb-2`}>
            {task.status}
          </span>
          <button
            className="btn btn-outline-dark mt-auto"
            style={{ borderRadius: "8px" }}
            onClick={onShowDetailsHandler}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
