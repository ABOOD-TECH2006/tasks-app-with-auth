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
    if (!isAgreed) {
      toast.error("You must agree to the terms.");
      return;
    }

    try {
      const response = await authController.register(data.email, data.password);

      if (response.status) {
        // Success
        localStorage.setItem("token", response.token);
        localStorage.setItem("logged_in", true);
        dispatch(authActions.register(response.token));
        toast.success("Registered successfully!");
        navigate("/dashboard", { replace: true });
      } else {
        // Backend error
        toast.error(response.message || "Registration failed");
      }
    } catch (err) {
      // Network or unexpected error
      toast.error(err.message || "Something went wrong");
    }
  };

  // Show toast for client-side validation errors
  Object.values(errors).forEach((error) => {
    if (error.message) toast.error(error.message);
  });

  return (
    <div className="tab-pane fade" id="pills-register" role="tabpanel">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SocialIcons />

        <h4 className="mb-4 mt-2 text-center">or:</h4>

        <div className="form-outline mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
          />
        </div>

        <div className="form-outline mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Repeat Password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
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

        <button type="submit" className="btn btn-main btn-block mb-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterTab;
