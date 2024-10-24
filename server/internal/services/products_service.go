package services

import (
	"fmt"
	"strings"
	// "server/internal/models"
)

func FetchProduct(handle string) (map[string]interface{}, error) {
	//make query
	query := `
    query getProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
            id
            title
            description
            featuredImage {
                url
                altText
            }
            images(first: 10) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        title
                        price
                        image {
                            altText
                            url
                        }
                    }
                }
            }
        }
    }`

	variables := map[string]interface{}{
		"handle": handle,
	}
	respData, err := gqlQuery(query, variables)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch product: %v", err)
	}

	// sanitize string properties
	data := respData["productByHandle"].(map[string]interface{})
	if desc, ok := data["description"].(string); ok {
		data["description"] = sanitizeString(desc)
	}

	// extract product
	productNode := respData["productByHandle"].(map[string]interface{})
	product := map[string]interface{}{
		"handle":      handle,
		"id":          productNode["id"].(string),
		"title":       productNode["title"].(string),
		"description": productNode["description"].(string),
		"images":      []map[string]interface{}{},
		"variants":    []map[string]interface{}{},
	}

	if featuredImage, ok := productNode["featuredImage"].(map[string]interface{}); ok {
		product["featuredImage"] = map[string]interface{}{
			"altText": featuredImage["altText"].(string),
			"url":     featuredImage["url"].(string),
		}
	}

	if images, ok := productNode["images"].(map[string]interface{}); ok {
		imageEdges := images["edges"].([]interface{})
		for _, edge := range imageEdges {
			imageNode := edge.(map[string]interface{})["node"].(map[string]interface{})
			image := map[string]interface{}{
				"altText": imageNode["altText"].(string),
				"url":     imageNode["url"].(string),
			}
			product["images"] = append(product["images"].([]map[string]interface{}), image)
		}
	}

	// extract variants
	variants := productNode["variants"].(map[string]interface{})["edges"].([]interface{})
	for _, variantEdge := range variants {
		variantNode := variantEdge.(map[string]interface{})["node"].(map[string]interface{})
		variant := map[string]interface{}{
			"handle": handle,
			"id":     variantNode["id"].(string),
			"title":  variantNode["title"].(string),
			"price":  variantNode["price"].(string),
		}

		// if image
		if image, ok := variantNode["image"].(map[string]interface{}); ok {
			variant["image"] = map[string]interface{}{
				"altText": image["altText"].(string),
				"url":     image["url"].(string),
			}
		}

		// append variant to product
		product["variants"] = append(product["variants"].([]map[string]interface{}), variant)
	}
	return product, nil
}

// remove new lines and escape characters
func sanitizeString(s string) string {
	s = strings.ReplaceAll(s, "\n", " ")
	s = strings.ReplaceAll(s, `\"`, ``)
	s = strings.TrimSpace(s)
	// s = template.HTMLEscapeString(s)

	return s
}