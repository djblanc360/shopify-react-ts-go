import type { Product } from "./Product";

export type productsCount = {
    count: number
}

export type Collection = {
    id: number
    title: string
    handle: string
    products: Product[]
    productsCount: number
}