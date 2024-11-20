import React, { useEffect, useState } from "react";

import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductsTable from "../components/productsTable";
import ProductModal from "../components/addProductModal";


function Product() {
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

  console.log("product=>", product);

  return (
    <>
      <div className="flex justify-between">

        <ProductModal/>
       
         
         
       

        
      </div>

      <ProductsTable products={product} />
    </>
  );
}

export default Product;
