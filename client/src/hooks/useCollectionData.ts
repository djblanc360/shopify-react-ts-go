import useFetch from "./useFetch"
import { getCollection } from "@services/collectionService"
import type { Collection } from "../types/Collection"


// hook to fetch and return collection data
export const useCollectionData = (collectionId: string) => {
    const { data: collection, loading, error } = useFetch<Partial<Collection>>(
        () => getCollection(collectionId), // pas to `useFetch`
        [collectionId] // dependency array, refetch id `collectionId` changes
    );

    return { collection, loading, error }
}