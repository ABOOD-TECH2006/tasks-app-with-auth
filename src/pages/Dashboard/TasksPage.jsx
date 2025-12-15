import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../../components/Tasks/TaskItem";
import TasksController from "../../controllers/tasks-controller";
import { tasksActions } from "../../redux/tasks-slice";

const TasksPage = () => {
  const tasks = useSelector((state) => state.tasks.filteredData);
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();
  const tasksController = new TasksController();

  useEffect(() => {
    if (!tasks.length) {
      tasksController.read().then((data) => dispatch(tasksActions.read(data)));
    }
  }, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{ color: "#50cc89" }}>
          Dashboard
        </h1>

        <div className="d-flex flex-wrap gap-3">
          <select
            className="form-select"
            onChange={(e) =>
              dispatch(tasksActions.filterByStatus(e.target.value))
            }
          >
            <option value="All">Filter By Status</option>
            <option value="Done">Done</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
            <option value="Canceled">Canceled</option>
            <option value="Waiting">Waiting</option>
          </select>

          <select
            className="form-select"
            onChange={(e) =>
              dispatch(tasksActions.filterByCategory(e.target.value))
            }
          >
            <option value="All">Filter By Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {tasks.length ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="text-center w-100 text-muted">No tasks found.</p>
        )}
      </div>
    </main>
  );
};

export default TasksPage;
