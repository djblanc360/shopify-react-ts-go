import type { Product } from "./Product";

export type Collection = {
    id: number
    title: string
    handle: string
    products: Product[]
}