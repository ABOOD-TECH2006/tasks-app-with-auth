import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/auth-slice";
import AuthController from "../../controllers/auth-controller";
import SocialIcons from "./SocialIcons";
import toast from "react-hot-toast";

const LoginTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authController = new AuthController();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authController.login(data.email, data.password);

      if (response.status) {
        // Success
        localStorage.setItem("token", response.token);
        localStorage.setItem("logged_in", true);
        dispatch(authActions.login(response.token));
        toast.success("Logged in successfully!");
        navigate("/dashboard", { replace: true });
      } else {
        // Backend error
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  // Show toast for client-side validation errors
  Object.values(errors).forEach((error) => {
    if (error.message) toast.error(error.message);
  });

  return (
    <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SocialIcons />

        <h4 className="mb-4 mt-2 text-center">or</h4>

        <div className="form-outline mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email or username"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <div className="d-flex justify-content-between mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#!">Forgot password?</a>
        </div>

        <button type="submit" className="btn btn-main btn-block mb-4">
          Sign in
        </button>

        <p className="text-center">
          Not a member? <a href="#!">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginTab;
