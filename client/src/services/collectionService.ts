import type { Collection } from '../types/Collection'

export const getCollection = async (handle: string): Promise<Partial<Collection>> => {
    const response = await fetch(`/api/collections/${handle}`)
    if (!response.ok) {
      throw new Error('Failed to fetch collection')
    }
    const data = await response.json()
    console.log("getCollection: ", data)
    return data.collection as Partial<Collection>  // see postman npm-test-shopify / collections
}