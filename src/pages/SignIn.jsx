import React from "react";
import { useForm } from "react-hook-form"; // Import React Hook Form
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { Toaster, toast } from "sonner"; // Import Sonner

function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // React Hook Form setup

  const handleSignIn = (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Signed In Successfully.", {
          position: "top-center", // Explicit toast position
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.", {
            position: "top-center",
          });
        } else {
          toast.error("Sign In Failed. Please check your credentials.", {
            position: "top-center",
          });
        }
      });
  };

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Signed In with Google Successfully.", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(() => {
        toast.error("Sign In with Google Failed. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <>
      <Toaster position="top-center" richColors />{" "}
      {/* Ensure a single Toaster */}
      <section className="mt-8  min-h-screen flex items-center justify-center">
        <div className="w-full sm:max-w-md p-6 bg-white border rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Sign In</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format.",
                  },
                })}
                className={`bg-gray-100 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } text-gray-900 rounded-lg block w-full p-2`}
                placeholder="name@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required.",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{6,}$/,
                    message:
                      "Password must contain at least 6 characters, a number, a capital letter, and a lowercase letter.",
                  },
                })}
                className={`bg-gray-100 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 rounded-lg block w-full p-2`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-medium rounded-lg p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Sign In
            </button>
            <button
              type="button"
              className="w-full bg-blue-800 text-white font-medium rounded-lg p-2 mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              onClick={handleSignInWithGoogle}
            >
              Sign in with Google
            </button>
          </form>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default SignIn;
