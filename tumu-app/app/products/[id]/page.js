"use client";

import { useParams, useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Spinner from '../../components/Spinner';

const API_URL = 'https://next-ecommerce-api.vercel.app/products';

export default function ProductDetail() {
  const { id } = useParams(); 
  const router = useRouter(); // For handling navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  const images = product.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="bg-gray-300 text-black px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative h-96">
          {currentImage && (
            <Image
              src={currentImage}
              alt={product.title}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg border-4 border-gray-300" // Added border class here
            />
          )}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={prevImage}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={nextImage}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-lg font-semibold mb-6">Price: ${product.price}</p>
          <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-sm text-gray-600">Tags: {product.tags.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}