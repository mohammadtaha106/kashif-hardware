import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import ProductDeleteModal from "./ProductDeleteModal";
import React, { useState, useMemo } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function ProductsTable({ products }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["All"])); // Default selection

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const filteredProducts = useMemo(() => {
    if (selectedValue === "All" ) {
      return products; 
    }
    return products.filter((product) => product.title === selectedValue);
  }, [selectedValue, products]);

  return (
    <div>
    <div className="mt-6">
      {products && products.length === 0 && (
        <div className="flex h-screen w-full items-center justify-center">
          No products found
        </div>
      )}
      

      <div className="w-full">
        <h1 className="mb-4 text-center">Sort by Title:</h1>
        <div className="flex justify-center items-center mt-4  ">
  <Dropdown>
    <DropdownTrigger>
      <Button
        variant="flat"
        className="capitalize bg-gray-300 text-black w-full sm:w-2/3 md:w-1/3"
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
      {products.map((product, index) => (
        <DropdownItem
          key={product.title || `title-${index}`}
          css={{
            fontSize: "14px",
            color: "#333",
            "&:hover": {
              backgroundColor: "#eee",
              color: "#000",
            },
          }}
        >
          {product.title || "No Title"}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
</div>

      </div>

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
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              <TableCell>{product.price}rs</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>
                <ProductDeleteModal productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
    </div>
  );
}
