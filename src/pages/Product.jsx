import React, { useEffect, useState } from 'react'
import ProductModal from '../components/addProductModal'
import {db} from '../../utils/firebase'
import { collection,  getDocs } from 'firebase/firestore'


function Product() {

  const [product , setProduct]= useState([])
const productCollectionRef = collection(db, 'products')
useEffect(() => {
  const getProducts = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      console.log(data.docs); 
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); 
    } catch (error) {
      console.error('Error fetching products:', error.message); 
    }
  };

  getProducts();
}, []);

  return (
<ProductModal/>


  )
}

export default Product