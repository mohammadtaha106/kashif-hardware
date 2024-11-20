import React, { useEffect, useState } from "react";

import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Container from '../components/Container'
import ProductList from "../components/ProductList";

function Home() {
    const [product, setProduct] = useState([]);
    const productCollectionRef = collection(db, "products");
    useEffect(() => {
      const getProducts = async () => {
        try {
          const data = await getDocs(productCollectionRef);
          console.log(data.docs);
          setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      getProducts();
    }, []);
  
    console.log("homeproduct=>", product);
  return (
    <>
    <Container/>
    <ProductList products={product} />
    </>
   
  )
}

export default Home