import React from 'react';
import { useForm } from 'react-hook-form';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { Toaster, toast } from 'sonner';

function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    const { email, password } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success('Account Created Successfully.', {
          position: "top-center",
        });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Account Creation Failed. Please try again.', {
          position: "top-center",
        });
      });
  };

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('Signed Up with Google Successfully.', {
          position: "top-center",
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch(() => {
        toast.error('Sign Up with Google Failed. Please try again.', {
          position: "top-center",
        });
      });
  };

  return (
    <>
   
      <section className="mt-24  min-h-screen flex items-center justify-center">
        <div className="w-full sm:max-w-md py-4 p-6  bg-white border rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Sign Up</h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(handleSignUp)}>
            <div>
              <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', { required: 'First Name is required.', minLength: {
                  value: 3,
                  message: 'First Name must be at least 3 characters.',
                }, })}
                className={`bg-gray-100 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 rounded-lg block w-full p-3`}
                placeholder="First Name"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { required: 'Last Name is required.' , minLength: {
                  value: 3,
                  message: 'Last Name must be at least 3 characters.',
                },})}
                className={`bg-gray-100 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 rounded-lg block w-full p-3`}
                placeholder="Last Name"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email format.',
                  },
                })}
                className={`bg-gray-100 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 rounded-lg block w-full p-3`}
                placeholder="name@company.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required.',
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{6,}$/,
                    message:
                      'Password must contain at least 6 characters, a number, a capital letter, and a lowercase letter.',
                  },
                })}
                className={`bg-gray-100 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } text-gray-900 rounded-lg block w-full p-3`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-medium rounded-lg p-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="w-full bg-blue-800 text-white font-medium rounded-lg p-3 mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800"
              onClick={handleSignInWithGoogle}
            >
              Sign up with Google
            </button>
          </form>
          <p className="text-center text-gray-500  text-sm mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-blue-800 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default SignUp;
