import useFetch from "./useFetch"
import { getCollection } from "@services/collectionService"
import type { Collection } from "../types/Collection"


// hook to fetch and return collection data
export const useCollectionData = (collectionHandle: string) => {
    const { data: collection, loading, error } = useFetch<Partial<Collection>>(
        () => getCollection(collectionHandle), // pas to `useFetch`
        [collectionHandle] // dependency array, refetch handle `collectionHandle` changes
    );

    return { collection, loading, error }
}