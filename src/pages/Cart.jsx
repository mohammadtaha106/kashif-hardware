import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import shopBgPic from "../assets/cartbg.webp";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

function Cart() {
  const [loading, setLoading] = useState(false);

  const {
    cartItems,
    decreaseItemToCart,
    addItemsToCart,
    removeItemFromCart,
    setcartItems,
  } = useContext(CartContext);

  console.log("cartitems", cartItems);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <div className="text-center mt-28">Your cart is empty.</div>;
  }

  const subTotal = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );

  const handleOnCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/checkout");
    }, 2000);
  };

  return (
    <>
      <div className="relative w-full h-[90vh]">
        <img
          src={shopBgPic}
          alt="Shop Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
          <h1 className="text-4xl font-bold">Cart</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-lg font-extrabold text-gray-800 dark:text-gray-400"
                >
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ms-1 text-lg font-extrabold text-gray-800 md:ms-2 dark:text-gray-400"
                  >
                    Cart
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-16 px-4 lg:px-10">
        {/* <div className="w-full lg:w-4/5">
          <div className="font-bold bg-[#fbf1e7] p-4 rounded-t-md grid grid-cols-5 text-center">
            <span></span>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          <div className="bg-white rounded-b-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center text-center py-4"
              >
                <img
                  className="w-24 h-24 object-cover rounded-md mx-auto"
                  src={item.image}
                  alt={item.title}
                />
                <div className="text-gray-700">{item.title}</div>
                <div className="text-gray-700">${item.price}</div>
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => addItemsToCart(item)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) {
                        removeItemFromCart(item.id);
                      } else {
                        decreaseItemToCart(item.id);
                      }
                    }}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="ml-8">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-[#c28c2b] mr-4"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="w-full lg:w-4/5">
          <Table aria-label="Cart Table">
            <TableHeader>
              <TableColumn></TableColumn>
              <TableColumn className="text-medium text-blue-800">
                Product
              </TableColumn>
              <TableColumn className="text-medium  text-blue-800">
                Price
              </TableColumn>
              <TableColumn className="text-medium text-center text-blue-800">
                Quantity
              </TableColumn>
              <TableColumn className="text-medium  text-blue-800">
                Subtotal
              </TableColumn>
              <TableColumn className="text-medium  text-blue-800">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody >
              {cartItems.map((item) => (
                <TableRow key={item.id} >
                  <TableCell>
                    <img
                      className="w-24 h-24 object-cover rounded-md mx-auto"
                      src={item.image}
                      alt={item.title}
                    />
                  </TableCell>
                  <TableCell className="text-gray-700">{item.title}</TableCell>
                  <TableCell className="text-blue-600">{item.price} PKR</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => addItemsToCart(item)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            removeItemFromCart(item.id);
                          } else {
                            decreaseItemToCart(item.id);
                          }
                        }}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600">
                    {(item.price * item.quantity).toFixed(2)} PKR
                  </TableCell>
                  <TableCell >
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="text-[#FF0000] text-medium"
                    >
                      <FaTrashAlt />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-full lg:w-1/4 bg-gray-100 p-6 rounded-md shadow-md ml-0 lg:ml-6 mt-6 lg:mt-0 h-64 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Cart Totals</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="text-blue-600 text-right">
              ${subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between mb-6">
            <span>Total</span>
            <span className="font-bold text-xl text-blue-600 text-right">
              ${subTotal.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleOnCheckout}
            className="text-blue-800 border border-blue-800 w-full py-3 rounded-2xl transition font-bold text-lg hover:bg-blue-800 hover:text-white hover:border-transparent"
          >
            Checkout
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
