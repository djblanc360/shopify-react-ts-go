import type { Product } from "./Product";

export interface Collection {
    id: number
    title: string
    handle: string
    products: Product[]
}