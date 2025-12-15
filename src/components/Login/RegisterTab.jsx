import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthController from "../../controllers/auth-controller";
import { authActions } from "../../redux/auth-slice";
import SocialIcons from "./SocialIcons";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authController = new AuthController();
  const [isAgreed, setAgree] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    const response = await authController.register(data.email, data.password);
    if (response.status) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("logged_in", true);
      dispatch(authActions.register(response.token));
      toast.success("Registered successfully!");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(response.message || "Registration failed");
    }
  };

  return (
    <div className="tab-pane fade" id="pills-register" role="tabpanel">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SocialIcons />

        <h4 className="mb-4 mt-2 text-center">or:</h4>

        <div className="form-outline mb-3">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            placeholder="Repeat Password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        <div className="form-check d-flex justify-content-center mb-3">
          <input
            type="checkbox"
            className="form-check-input me-2"
            id="agreeTerms"
            checked={isAgreed}
            onChange={() => setAgree(!isAgreed)}
          />
          <label className="form-check-label" htmlFor="agreeTerms">
            I agree to the terms
          </label>
        </div>

        <button
          type="submit"
          disabled={!isAgreed}
          className="btn btn-main btn-block mb-3"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterTab;
