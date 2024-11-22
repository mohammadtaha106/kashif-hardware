import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Spinner,
} from "@nextui-org/react";
import ProductDeleteModal from "./ProductDeleteModal";
import React, { useState, useMemo, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import ProductModal from "./addProductModal";

export default function ProductsTable({ products }) {
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [search, setSearch] = useState('');
  const [selectedKeys, setSelectedKeys] = useState(new Set(["All"])); 
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (selectedValue !== "All") {
      filtered = filtered.filter((product) => product.category === selectedValue);
    }

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.price.toString().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) 
        );
      });
    }
    return filtered;
  }, [selectedValue, products, search]);

  
  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    } else {
      setLoading(true); 
    }
  }, [products]);

  return (
    <div>
      <div className="mt-6">
        {products && products.length === 0 && (
          <div className="flex h-screen w-full items-center justify-center">
            No products found
          </div>
        )}

        <div className="w-full flex gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 items-center">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search anything" className="w-3/4" />
            <ProductModal />
          </div>

          <div className="flex gap-4 items-center justify-between">
            <h1 className="text-center">Sort by Category:</h1>
            <div className="flex justify-center items-center">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    className="capitalize bg-gray-300 text-black w-full"
                    css={{
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "14px",
                      padding: "10px 15px",
                    }}
                  >
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Product Titles"
                  variant="solid"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  css={{
                    maxWidth: "400px",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "5px",
                  }}
                >
                  <DropdownItem key="All">All</DropdownItem>
                  {categories.map((c, index) => (
                    <DropdownItem
                      key={c || `category-${index}`}
                      css={{
                        fontSize: "14px",
                        color: "#333",
                        "&:hover": {
                          backgroundColor: "#eee",
                          color: "#000",
                        },
                      }}
                    >
                      {c || "No Category"}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <h1 className="text-center text-red-500 mt-10">No Product Found.</h1>
        ) : (
          loading ? (
            <div className="flex justify-center items-center my-16">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table aria-label="Products Table" className="mt-6">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>PRICE</TableColumn>
                <TableColumn>BRAND NAME</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                        {product.title}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>PKR {product.price}.00</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <ProductDeleteModal productId={product.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}
      </div>
    </div>
  );
}
