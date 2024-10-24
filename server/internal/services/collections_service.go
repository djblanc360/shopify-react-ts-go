package services

import (
	"fmt"
	"log"
)

func FetchCollection(handle string) (map[string]interface{}, error) {
	query := `
    query getCollection($handle: String!) {
        collectionByHandle(handle: $handle) {
            id
            title
            products(first: 5) {
                edges {
                    node {
                        id
                        title
                        handle
                    }
                }
            }
        }
    }`
	variables := map[string]interface{}{
		"handle": handle,
	}

	// fetch collection
	respData, err := gqlQuery(query, variables)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch collection: %v", err)
	}

	// extract collection
	collection := respData["collectionByHandle"].(map[string]interface{})
	collectionProducts := map[string]interface{}{
		"id":       collection["id"].(string),
		"title":    collection["title"].(string),
		"products": []map[string]interface{}{},
	}

	// iterate over products in collection
	productsData := collection["products"].(map[string]interface{})["edges"].([]interface{})

	for _, productEdge := range productsData {
		productNode := productEdge.(map[string]interface{})["node"].(map[string]interface{})
		handle := productNode["handle"].(string)

		// fetch product by handle
		product, err := FetchProduct(handle)
		if err != nil {
			log.Printf("error fetching product details: %v\n", err)
			continue
		}
		// append product to collection
		collectionProducts["products"] = append(collectionProducts["products"].([]map[string]interface{}), product)
	}

	return collectionProducts, nil
}
