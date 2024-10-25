// import { Product } from "../types/Product";
import { Collection } from "../types/Collection";
/**
 * transforms incoming data to types
 */
// Omit<Collection, 'products'>
export const transformCollection = (data: unknown): Collection => {
    const { id, title, handle, products, productsCount } = data as Collection;
    return {
        id: id,
        title: title,
        handle: handle,
        products: products,
        productsCount: productsCount // Flattening `productsCount.count`
    };
};