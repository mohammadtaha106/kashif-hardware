import React, { useContext, useEffect, useState } from "react";
import shopBgPic from "../assets/bg2.webp";
import filter from "../assets/filter.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { CartContext } from "../context/CartContext";

function Shop() {
    const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); 
  const productCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true); 
        const data = await getDocs(productCollectionRef);
        setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    getProducts();
  }, []);

  console.log("product", product);
  

  const [selectedCategory, setselectedCategory] = useState("All");

  const categories = product.map(item => item.category)
  console.log('categories', categories);
  
  const allCategories = ["All", ...categories]

  console.log('allCategories', allCategories);
  

  const handleOnCategory = (e) => {
    setselectedCategory(e.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((item) => item.category === selectedCategory);

const {  isItemAdded, addItemsToCart}= useContext(CartContext)
  
  return (
    <>
      <div className="relative w-full h-[80vh]">
        <img src={shopBgPic} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
          <h1 className="text-4xl font-bold">Shop</h1>
          <nav className="flex mt-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-lg font-extrabold text-gray-700 dark:text-gray-400"
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
                    className="ms-1 text-lg font-extralight text-gray-700 md:ms-2 dark:text-gray-400"
                  >
                    Shop
                  </a>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#fbf1e7] py-12 px-8">
        <div className="flex gap-4 items-center">
          <img src={filter} alt="" className="w-5 h-5" />
          <h1 className="text-xl">Filter</h1>
          <h1 className="text-xl">|</h1>
          <h1 className="text-xl">Showing 1-30 of 30 results</h1>
        </div>

        <div className="flex items-center gap-3">
          <h1 className="text-xl">Sort By:</h1>
          <select
            value={selectedCategory}
            onChange={handleOnCategory}
            className="p-2 rounded w-48"
          >
            {allCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="text-3xl text-center font-extrabold mt-20 mb-8">
        Our Products
      </h1>
      <div className="flex flex-wrap justify-center mt-6 mb-6">
  {filteredProducts.map((item) => (
    <div className="flex flex-col items-center m-4 w-72 h-auto relative group">
      <Link to={`/shop/${item.id}`} className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col w-full h-full border rounded shadow overflow-hidden">
          <div className="w-full h-1/2 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Link to={`/shop/${item.id}`}>
                <button className="text-white font-bold py-2 px-4 border border-white rounded">
                  View Product
                </button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center bg-[#f4f5f7] h-1/2 p-2">
            <h2 className="text-lg text-[#3a3a3a] font-extrabold">
              {item.title}
            </h2>
            <p className="text-[#8e758b]">{item.category}</p>
            <p className="text-lg text-[#3a3a3a] font-extrabold">
              ${item.price}
            </p>
          </div>
        </div>
      </Link>

      <button
        onClick={() => addItemsToCart(item)}
        className="w-full bg-white text-[#c28c2b] font-bold py-2 mt-2 border border-gray-300"
      >
        {isItemAdded(item.id) ? `Added to Cart (${isItemAdded(item.id).quantity})` : `Add to Cart`}
      </button>
    </div>
  ))}
</div>


      <Footer />
    </>
  );
}

export default Shop;
