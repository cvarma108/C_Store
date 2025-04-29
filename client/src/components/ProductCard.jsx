import { EditIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useProductsStore } from "../store/useProductStore";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductsStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/*product image*/}
      <figure className="relative pt-[56.25%]">
        <img
          src={product.image}
          alt={product.image}
          className="absolute top-0 w-full h-full left-0 object-cover"
        />
      </figure>
      {/*product info*/}
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-primary text-2xl font-bold">
          ${Number(product.price).toFixed(2)}
        </p>

        {/*product actions*/}
        <div className="card-actions mt-4 justify-end">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-info btn-outline rounded-full"
          >
            <EditIcon className="size4" />
          </Link>
          <button
            className="btn btn-error btn-outline btn-sm rounded-full"
            onClick={()=>deleteProduct(product.id)}
          >
            <TrashIcon className="size4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
