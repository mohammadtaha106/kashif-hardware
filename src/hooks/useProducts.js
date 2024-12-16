import {  getDocs } from "firebase/firestore";

import { useQuery } from "react-query";
import { productsCollectionRef } from "../../utils/firebase";


export default function useProducts() {

  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { docs } = await getDocs(productsCollectionRef);

      console.log('docs==>',docs);
      
      const products = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),

      }));
      console.log('products===>', products);
      
      
      return products ,docs , productsCollectionRef;
    },
  });
  
}
