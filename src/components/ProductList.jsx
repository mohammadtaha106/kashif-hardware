import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";

function ProductList() {
  const { data: products } = useProducts();
  const combinedDataset = products;
  console.log("combinedDataset", combinedDataset);

  const shuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomProducts = (dataset, count) => {
    const shuffled = shuffledArray(dataset);
    console.log("shuffled", shuffled);

    return shuffled.slice(0, count);
  };

  const selectedProducts = getRandomProducts(combinedDataset, 8);

  return (
    <>
      <h1 className="text-3xl text-center font-extrabold text-blue-800 mt-20 mb-8">
        Our Products
      </h1>
      <div className="flex flex-wrap justify-center">
        {selectedProducts.map((product) => (
          <Card
            key={product.id}
            className="m-4 w-60 border rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="flex justify-center p-0">
              <Image
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-32 rounded-t-lg"
              />
            </CardHeader>
            <CardBody className="p-4 text-center">
              <h2 className="text-lg font-extrabold text-blue-800">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg text-blue-800 font-bold">
                PKR {product.price}.00
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6 mb-8">
        <Link to="/shop">
          <Button className="w-60 bg-white text-blue-800 border border-blue-800 hover:bg-blue-800 hover:text-white rounded-none">
            Show More
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ProductList;
