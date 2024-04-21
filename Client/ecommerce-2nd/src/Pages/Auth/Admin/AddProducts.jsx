import React, { useState } from "react";
import { addProductAPI } from "../../../api/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategoryAPI } from "../../../api/category.api";
import { getAllBrandAPI } from "../../../api/brand.api";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../utils/config";

export const AddProducts = () => {
    const { data: categoryData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategoryAPI()
    });

    let categories = null;
    if (categoryData && categoryData.data) {
        categories = categoryData.data.data.categories;
    }

    const { data: brandData } = useQuery({
        queryKey: ['brands'],
        queryFn: () => getAllBrandAPI()
    });
    console.log("BrandData:", brandData);

    let brands = null;
    if (brandData && brandData.data && brandData.data.brands) {
        brands = brandData.data.brands;
    }

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category_id: "",
        usage_status: "",
        image: "",
        current_quantity: "",
        quantity_sold: "",
        brand_id: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onImageChange = async (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
        const storageRef = ref(storage, `products/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Error uploading image:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setFormData((prevData) => ({
                    ...prevData,
                    image: downloadURL
                }));
            }
        );
    };

    const { mutate } = useMutation(
        (body) => addProductAPI(body),
        {
            onSuccess: () => {
                alert("Product added successfully!");
                setFormData({
                    name: "",
                    price: "",
                    description: "",
                    category_id: "",
                    usage_status: "",
                    image: "",
                    current_quantity: "",
                    quantity_sold: "",
                    brand_id: "",
                });
                setSelectedImage(null);
                setUploadProgress(0);
            },
            onError: (error) => {
                alert("Error adding product: " + error.message);
            },
        }
    );

    const onSubmit = (event) => {
        event.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto mb-20">
            <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>
            <form onSubmit={onSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Image */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Choose Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".jpg, .jpeg, .png"
                        onChange={onImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {selectedImage && (
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="mt-2 w-full" />
                    )}
                    {uploadProgress > 0 && <p className="mt-2 text-sm text-gray-600">Upload Progress: {uploadProgress}%</p>}
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    ></textarea>
                </div>
                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a category</option>
                        {categories &&
                            categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {/* Brand */}
                <div className="mb-6">
                    <label htmlFor="brand_id" className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                    <select
                        id="brand_id"
                        name="brand_id"
                        value={formData.brand_id}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select a brand</option>
                        {brands &&
                            brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {/* Usage Status */}
                <div className="mb-4">
                    <label htmlFor="usage_status" className="block text-gray-700 text-sm font-bold mb-2">Usage Status</label>
                    <input
                        type="text"
                        id="usage_status"
                        name="usage_status"
                        value={formData.usage_status}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Current Quantity */}
                <div className="mb-4">
                    <label htmlFor="current_quantity" className="block text-gray-700 text-sm font-bold mb-2">Current Quantity</label>
                    <input
                        type="text"
                        id="current_quantity"
                        name="current_quantity"
                        value={formData.current_quantity}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Quantity Sold */}
                <div className="mb-4">
                    <label htmlFor="quantity_sold" className="block text-gray-700 text-sm font-bold mb-2">Quantity Sold</label>
                    <input
                        type="text"
                        id="quantity_sold"
                        name="quantity_sold"
                        value={formData.quantity_sold}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Submit Button */}
                <div className="mb-6 text-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};
