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
        <Spinner color="primary" size="lg" />
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
    <div className="mt-20 px-4 lg:px-10">
      <h1 className="text-4xl font-bold  text-blue-800 mb-8">
        Cart Details
      </h1>
      <div className="flex flex-col lg:flex-row mt-6">
        <div className="w-full lg:w-4/5">
          <Table aria-label="Cart Table">
            <TableHeader>
              <TableColumn></TableColumn>
              <TableColumn className="text-medium text-blue-800">
                Product
              </TableColumn>
              <TableColumn className="text-medium text-blue-800">
                Price
              </TableColumn>
              <TableColumn className="text-medium text-center text-blue-800">
                Quantity
              </TableColumn>
              <TableColumn className="text-medium text-blue-800">
                Subtotal
              </TableColumn>
              <TableColumn className="text-medium text-blue-800">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
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
                  <TableCell>
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
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            Cart Totals
          </h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="text-blue-600 text-right">${subTotal.toFixed(2)}</span>
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
    </div>
  
    <Footer />
  </>
  
  );
}

export default Cart;
