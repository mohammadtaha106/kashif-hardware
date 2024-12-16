import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useForm } from "react-hook-form";
import shopBgPic from "../assets/shopbg.png";
import Footer from "../components/Footer";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Toaster, toast } from "sonner"; // Imported Sonner
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setcartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { isLogin } = user;

  console.log("isLogin", isLogin);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCartItems) {
      setcartItems(savedCartItems);
    }
  }, [setcartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log("user", user);

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    if (!isLogin) {
      toast.error("Please sign in to proceed with checkout."); // Updated to Sonner's toast
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      return;
    }
    downloadPDF();
    console.log("Data submitted successfully!");
  };

  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
      toast.success("Downloading Invoice..."); // Updated to Sonner's toast
    });
  };

  return (
    <>

    

     
      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2 p-6 rounded-md">
          <h2 className="text-4xl font-semibold mb-6 text-blue-800">Billing Details</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-8"
          >
            <div className="flex flex-col">
              <label className="mb-2 text-blue-600">First Name</label>
              <input
           
                className="border border-gray-300 p-4 rounded-2xl"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
              {errors.firstName && (
                <span className="text-red-600">{errors.firstName.message}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className=" text-blue-600 mb-2">Last Name</label>
              <input
     
                className="border border-gray-300 p-4 rounded-2xl" // Updated here
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
              {errors.lastName && (
                <span className="text-red-600">{errors.lastName.message}</span>
              )}
            </div>

      
           

           
            <div className="col-span-2 flex flex-col">
              <label className=" text-blue-600 mb-2">Street Address</label>
              <input
      
                className="border border-gray-300 p-4 rounded-2xl"
                {...register("streetAddress", {
                  required: "Street address is required",
                })}
              />
              {errors.streetAddress && (
                <span className="text-red-600">
                  {errors.streetAddress.message}
                </span>
              )}
            </div>

            {/* Town / City */}
            <div className="flex flex-col">
              <label className="mb-2 text-blue-600">Town / City</label>
              <input
          
                className="border border-gray-300 p-4 rounded-2xl" // Updated here
                {...register("city", {
                  required: "City is required",
                })}
              />
              {errors.city && (
                <span className="text-red-600">{errors.city.message}</span>
              )}
            </div>

           

           

            {/* Phone */}
            <div className="flex flex-col">
              <label className="mb-2 text-blue-600">Phone</label>
              <input
             
                className="border border-gray-300 p-4 rounded-2xl" // Updated here
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Please enter a valid 11-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-600">{errors.phone.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="col-span-2 flex flex-col">
              <label className="mb-2 text-blue-600">Email Address</label>
              <input
         
                className="border border-gray-300 p-4 rounded-2xl" // Updated here
                type="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="col-span-2 flex flex-col">
          <label htmlFor="paymentMethod"  className="mb-2 text-blue-600">Payment Method</label>
          <select
            id="paymentMethod"
            {...register('paymentMethod', { required: 'Payment method is required' })}
           className="border border-gray-300 p-4 rounded-2xl"
          >
            <option value="">Select payment method</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="easypaisa">Easypaisa</option>
          </select>
          {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod.message}</span>}
        </div>
          </form>
        </div>




        <div className="md:col-span-1 p-6 rounded-md">
          <div className="actual-receipt p-5 ">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Order Summary</h2>
            <div className="space-y-4">

              <div className=" text-blue-800 flex justify-between text-xl font-extrabold">
                <p>Products</p>
                <p>Subtotal</p>
              </div>

              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <div>
                      <p className="text-md">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-medium">
                      {item.price * item.quantity}{" "} PKR
        
                    </p>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>

            <div className="mt-2  pt-4">
              <div className="flex justify-between items-center mb-2 ">
                <div>
                  <p className="text-lg font-semibold ">Subtotal</p>
                </div>
                <p className="text-lg font-medium">{total} PKR</p>
              </div>

              <div className="flex justify-between items-center mb-2 border-b pb-4 ">
                <div>
                  <p className="text-lg font-semibold">Shipping Cost</p>
                </div>
                <p className="text-lg font-medium">0.00 PKR</p>
              </div>

              <div className="flex justify-between items-center mb-2 mt-4 border-b pb-4 ">
                <div>
                  <p className="text-xl font-semibold">Total</p>
                </div>
                <p className="text-2xl font-medium text-blue-800">{total} PKR</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="text-blue-800 border border-blue-800 w-full py-3 rounded-2xl transition font-bold text-lg hover:bg-blue-800 hover:text-white hover:border-transparent"
            onClick={handleSubmit(onSubmit)}
            disabled={loader !== false}
          >
            Place Order
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Checkout;
