import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Spinner } from "@nextui-org/react";
import productDetailPic from "../assets/productdetail.png";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [product, setProduct] = useState([]);
  
  const { cartItems, isItemAdded, addItemsToCart } = useContext(CartContext);

  console.log("product", product);

  const { id: productId } = useParams();

  useEffect(() => {
    async function getProduct() {
      const docRef = doc(db,'products', productId);

      const productDoc = await getDoc(docRef);

      const productData = productDoc.data();

      setProduct({
        id: productDoc.id,
        ...productData,
      });

      setLoading(false);
      console.log('productData',productData);
    }

    getProduct();
  }, []);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getDocs(productCollectionRef);
  //       setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getProduct();
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   setNotFound(false);

  //   const foundProduct = product.find((item) => item.id === id);
  //   if (foundProduct) {
  //     // Random rating generation between 1 and 5
  //     foundProduct.rating = Math.floor(Math.random() * 5) + 1; // Rating from 1 to 5
  //     setProduct(foundProduct);
  //   } else {
  //     setNotFound(true);
  //   }
  //   setLoading(false);
  // }, [id, product]);

  return (
    <>
      {/* Page Header */}
      <div className="relative w-full h-[80vh]">
        <img
          src={productDetailPic}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-200">
          <h1 className="text-4xl font-bold">Product Detail</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            {/* Breadcrumb */}
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-lg font-extrabold text-gray-200 dark:text-gray-400"
                >
                  Shop
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-700 mx-1"
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
                    className="ms-1 text-lg font-extralight text-gray-200 md:ms-2 dark:text-gray-400"
                  >
                    Product Detail
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <Spinner />
          </div>
        ) : notFound ? (
          <h1 className="text-center font-bold text-3xl text-blue-700">
            Product Not Found
          </h1>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}

            <div className="flex flex-col justify-start">
              <h1 className="text-4xl  font-extrabold  text-blue-800 mb-2">
                Product Outline
              </h1>
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800">
                {product.title}
              </h1>

              {/* Price */}
              <p className="text-2xl text-blue-600 font-bold mt-2">
                {product.price} PKR
              </p>

              {/* Category and Brand */}
              <div className="flex items-center gap-4 mt-4">
                <p className="text-gray-500 italic text-lg">{product.brand}</p>
                <span className="text-gray-500">|</span>
                <p className="text-gray-500 italic text-lg">
                  {product.category}
                </p>
              </div>

              {/* Star Ratings */}
              <div className="flex items-center mt-4">
                {/* Show 4 filled stars */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <AiFillStar
                    key={i}
                    className="text-yellow-500 text-xl cursor-pointer"
                  />
                ))}

                {/* Show 1 empty star */}
                <AiOutlineStar className="text-gray-300 text-xl" />

                {/* Rating text */}
                <span className="ml-2 text-gray-600">4 out of 5</span>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
                  onClick={() => addItemsToCart(product)}
                >
                  {isItemAdded(product.id)
                    ? `Added to Cart (${isItemAdded(product.id).quantity})`
                    : `Add to Cart`}
                </button>

                <button
                  className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded-lg shadow"
                  onClick={() => navigate(-1)}
                >
                  Back to Shop
                </button>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-800">
                  Product Overview
                </h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;







