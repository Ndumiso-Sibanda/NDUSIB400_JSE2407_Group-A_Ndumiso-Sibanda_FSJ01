import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-md shadow-lg">
    <img
      className="w-full h-48 object-cover mb-4"
      src={product.images[0]}
      alt={product.title}
    />
    <h2 className="text-lg font-semibold">{product.title}</h2>
    <p className="text-gray-500">Price: ${product.price}</p>
    <Link
      href={`/products/${product.id}`}
      className="text-blue-500 mt-2 inline-block"
    >
      View Details
    </Link>
  </div>
  );
}
