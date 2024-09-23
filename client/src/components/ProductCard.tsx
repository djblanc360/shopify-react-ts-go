import type { Product } from "../types/Product"

const ProductCard = ({product}: {product: Product}) => {
    return (
        <div className="flex items-center justify-center text-lg bg-white text-primary h-[300px] max-h-screen">
            <h2>{product.title}</h2>
            <p>{product.handle}</p>
            <p>{product.tags}</p>
        </div>
    )
}

export default ProductCard;