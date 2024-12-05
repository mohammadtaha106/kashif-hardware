import React, { useContext, useEffect, useState } from "react";
import shopBgPic from "../assets/shopbg.png";
import filter from "../assets/filter.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { CartContext } from "../context/CartContext";
import { Spinner } from "@nextui-org/react";

function Shop() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCategory, setselectedCategory] = useState("All");
  
  const productCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getDocs(productCollectionRef);
        setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    getProducts();
  }, []);

  const categories = product.map(item => item.category);
  const cat = [...new Set(categories)];
  const allCategories = ["All", ...cat];

  const handleOnCategory = (e) => {
    setselectedCategory(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((item) => item.category === selectedCategory);

  const { isItemAdded, addItemsToCart } = useContext(CartContext);

  return (
    <>
      <div className="relative w-full h-[80vh]">
        <img src={shopBgPic} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-gray-200">
          <h1 className="text-4xl font-bold">Shop</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            {/* Breadcrumb */}
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
                    className="ms-1 text-lg font-extralight text-gray-800 md:ms-2 dark:text-gray-400"
                  >
                    Shop
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-between items-center bg-gray-200 py-6 px-4 md:py-12 md:px-8 gap-4">
        <div className="flex items-center gap-2">
          <img src={filter} alt="Filter Icon" className="w-4 h-4 md:w-5 md:h-5" />
          <h1 className="text-sm md:text-xl">Filter</h1>
          <span className="hidden md:inline text-sm md:text-xl">|</span>
          <h1 className="text-xs md:text-xl">
            Showing {filteredProducts.length} of {product.length} results
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-xs md:text-xl">Sort By:</h1>
          <select
            value={selectedCategory}
            onChange={handleOnCategory}
            className="p-2 text-xs md:text-base rounded w-32 md:w-48"
          >
            {allCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      <h1 className="text-3xl text-center font-extrabold mt-20 mb-8 text-blue-800">
            Our Products
          </h1>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Spinner/>
        </div>
      ) : (
        <>
         
          <div className="flex flex-wrap justify-center mt-6 mb-6 gap-6">
            {filteredProducts.map((item) => (
              <div
                className="flex flex-col items-center w-full xs:w-64 sm:w-72 md:w-64 lg:w-72 h-auto relative group border shadow-md hover:shadow-lg transition-shadow duration-300"
                key={item.id}
              >
                {/* Product Card */}
                <div className="w-full h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link to={`/shop/${item.id}`}>
                      <button className="text-white font-bold py-2 px-4 border border-white bg-black/40 hover:bg-black/70 transition-all duration-300">
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center bg-[#f4f5f7] p-4 w-full">
                  <h2 className="text-lg text-blue-800 font-extrabold">{item.title}</h2>
                  <p className="text-sm text-[#8e758b]">{item.category}</p>
                  <p className="text-lg text-[#3a3a3a] font-extrabold">{item.price} PKR</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
    </>
  );
}

export default Shop;
