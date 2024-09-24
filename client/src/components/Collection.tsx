/*
import { useCollectionData } from "@hooks/useCollectionData";


const CollectionSection = ({ collectionId }: { collectionId: string }) => {
    const { collection, loading, error } = useCollectionData(collectionId)

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

const CollectionSection = ({ collectionId }: { collectionId: string }) => {
  const [collection, setCollection] = useState<Partial<Collection> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/collections/${collectionId}`);
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
  }, [collectionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{collection?.title}</h1>
      <div className="keen-slider">
            <div className="keen-slider__slide">
                {collection?.products?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default CollectionSection;
