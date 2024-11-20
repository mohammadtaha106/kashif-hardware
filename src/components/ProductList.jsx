import React from 'react';


import { Link } from 'react-router-dom';
function ProductList({products}) {
  const combinedDataset = products

  const shuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomProducts = (dataset, count) => {
    const shuffled = shuffledArray(dataset);
    return shuffled.slice(0, count);
  };

  const selectedProducts = getRandomProducts(combinedDataset, 8);

  return (
    <>
    <h1 className='text-3xl text-center font-extrabold text-blue-800 mt-20 mb-8'>Our Products</h1>
    <div className="flex flex-wrap justify-center">
      {selectedProducts.map(product => (
        <div key={product.id} className="flex flex-col m-4 w-60 h-64 border rounded shadow"> 
          <div className="h-1/2 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

         
          <div className="flex flex-col justify-center items-center bg-[#f4f5f7] h-1/2 p-2">
            <h2 className="text-lg text-blue-800 font-extrabold">{product.title}</h2>
            <p className="text-gray-500"> {product.category}</p>
            <p className="text-lg text-blue-800 font-extrabold">${product.price}</p>
          </div>
        </div>
      ))}

      
    </div>
    <Link to='/shop' className='flex justify-center mt-6 mb-8 '>  <button className="w-60 p-2 h-10 bg-white text-blue-800 border border-blue-800  transition duration-300 hover:bg-blue-800 hover:text-white">Show More</button></Link>
    
 




    </>
  );
}

export default ProductList;
