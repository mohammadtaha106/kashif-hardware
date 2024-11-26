import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import Container from '../components/Container';
import ProductList from "../components/ProductList";
import { Spinner } from "@nextui-org/react";
import Footer from "../components/Footer";

function Home() {
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

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
          <Spinner size="xl" color="primary" />
        </div>
      ) : (
        <>
          <Container />
          <ProductList products={product} />

          <Footer/>
        </>
      )}
    </>
  );
}

export default Home;
