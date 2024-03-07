import React from 'react'

const ProductCard = ({product})=> {
    return (
        <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
            <p className="text-gray-700 text-base">{product.description}</p>
            <p className="mt-2 text-gray-800">${product.price}</p>
          </div>
        </div>
      );
    };
export default ProductCard;
