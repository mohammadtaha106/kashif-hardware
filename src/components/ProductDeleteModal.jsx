import { FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { db } from "../../utils/firebase";
import { toast } from "sonner";

export default function ProductDeleteModal({ productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const docRef = doc(db, "products", productId);

    toast.promise(
      deleteDoc(docRef)
        .then(() => {
          setIsLoading(false);
          onClose(); 
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error deleting product:", error);
        }),
      {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Error deleting product.",
      }
    );
  };

  return (
    <>
      <Button 
        variant="flat" 
        onPress={onOpen} 
        className="p-2 text-red-600"
      >
        <FaTrash size={20} />
      </Button>
      
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Confirmation</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this item?</p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  disabled={isLoading} // Disable the Cancel button when loading
                >
                  Cancel
                </Button>
                <Button 
                  onPress={handleDelete} 
                  color="danger"
                  isLoading={isLoading} // Show loading state on the Delete button
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
