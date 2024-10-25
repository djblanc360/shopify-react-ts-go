/*
import { useCollectionData } from "@hooks/useCollectionData";


const CollectionSection = ({ collectionHandle }: { collectionHandle: string }) => {
    const { collection, loading, error } = useCollectionData(collectionHandle)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{String(error)}</p>

    return (
        <div>
            <h1>{collection?.title}</h1>
            <p>{collection?.handle}</p>
        </div>
    )
}

export default CollectionSection;
*/

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Collection } from '../types/Collection';

const server = import.meta.env.VITE_SERVER_URL;

const CollectionSection = ({ collectionHandle }: { collectionHandle: string }) => {
  const [collection, setCollection] = useState<Partial<Collection> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${server}/collections/${collectionHandle}`);
        console.log("Response object:", response);
        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Expected JSON, but received ${contentType}`);
        }
        const data = await response.json();
        console.log('Collection data:', data);
        setCollection(data);
        setError(null);
      } catch (err) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionHandle]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{collection?.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {collection?.products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    </div>
  );
};

export default CollectionSection;
