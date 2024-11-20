import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cloudinaryUrl, db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ProductModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    if (Object.keys(errors).length === 0) {
      console.log(data);
      const file = data.image[0];
      console.log(file);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "default-preset");

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const imageUploadResult = await response.json();

      const imageUrl = imageUploadResult.url;

      const docref = await addDoc(collection(db, "products"), {
        ...data,
        image: imageUrl,
      });
      console.log('docref=>', docref);

      toast.success("Product Added Successfully!");

      // const imageRef = ref(storage, `images/${file.name}`);
      // uploadBytes(imageRef, file).then((snapshot) => {
      //   getDownloadURL(imageRef).then((url) => console.log(url));
      // });

      reset();
      onOpenChange(false); // Close modal on successful submission
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Add Product</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="sm:max-w-md w-full mx-auto p-6">
          {(onClose) => (
            <>
              <ModalHeader className="text-center font-bold text-xl">
                Add Product
              </ModalHeader>
              <ModalBody>
                <form
                  id="product-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        Product Title
                      </label>
                      <Input
                        id="title"
                        placeholder="Enter product title"
                        {...register("title", {
                          required: "Title is required",
                        })}
                        isInvalid={!!errors.title}
                        aria-describedby="title-error"
                        fullWidth
                      />
                      {errors.title && (
                        <div id="title-error" className="text-red-600 text-sm">
                          {errors.title.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        Category
                      </label>
                      <Input
                        id="category"
                        placeholder="Enter product category"
                        {...register("category", {
                          required: "Category is required",
                        })}
                        isInvalid={!!errors.category}
                        aria-describedby="category-error"
                        fullWidth
                      />
                      {errors.category && (
                        <div
                          id="category-error"
                          className="text-red-600 text-sm"
                        >
                          {errors.category.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="price"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        Price
                      </label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter product price"
                        {...register("price", {
                          required: "Price is required",
                          min: {
                            value: 1,
                            message: "Price must be greater than 0",
                          },
                        })}
                        isInvalid={!!errors.price}
                        aria-describedby="price-error"
                        fullWidth
                      />
                      {errors.price && (
                        <div id="price-error" className="text-red-600 text-sm">
                          {errors.price.message}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="brand"
                        className="block mb-2 text-gray-700 font-medium"
                      >
                        Brand Name
                      </label>
                      <Input
                        id="brand"
                        placeholder="Enter brand name"
                        {...register("brand", {
                          required: "Brand is required",
                        })}
                        isInvalid={!!errors.brand}
                        aria-describedby="brand-error"
                        fullWidth
                      />
                      {errors.brand && (
                        <div id="brand-error" className="text-red-600 text-sm">
                          {errors.brand.message}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Image
                    </label>
                    <Input
                      id="image"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      {...register("image", {
                        required: "Image is required",
                      })}
                      isInvalid={!!errors.image}
                      aria-describedby="image-error"
                      fullWidth
                    />
                    {errors.image && (
                      <div id="image-error" className="text-red-600 text-sm">
                        {errors.image.message}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-gray-700 font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Enter product description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      isInvalid={!!errors.description}
                      aria-describedby="description-error"
                      fullWidth
                    />
                    {errors.description && (
                      <div
                        id="description-error"
                        className="text-red-600 text-sm"
                      >
                        {errors.description.message}
                      </div>
                    )}
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit" form="product-form">
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
