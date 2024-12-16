import React from "react";

import Container from "../components/Container";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import useProducts from "../hooks/useProducts";

function Home() {
  //       const data = await getDocs(productCollectionRef);
  //       setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getProducts();
  // }, []);

  // const {products} = useContext(ProductContext)

  const { data: products , docs ,productsCollectionRef } = useProducts();

  console.log("products", products);
  console.log("docs", docs);
  console.log("productsCollectionRef", productsCollectionRef);

  return (
    <>
      {/* {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
          <Spinner size="xl" color="primary" />
        </div> */}
      {/* ) : ( */}
      <>
        <Container />
        <ProductList />

        <Footer />
      </>
      {/* )} */}
    </>
  );
}

export default Home;
