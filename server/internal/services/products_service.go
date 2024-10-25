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
            handle
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
            options {
                id
                name
                position
                values
            }
            tags
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
                        selectedOptions {
                            name
                            optionValue {
                                hasVariants
                                name
                                swatch {
                                    color
                                }
                            }
                            value
                        }
                        sku
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
		"options":     []map[string]interface{}{},
		"tags":        productNode["tags"],
		"variants":    []map[string]interface{}{},
	}

	if featuredImage, ok := productNode["featuredImage"].(map[string]interface{}); ok {
		product["featuredImage"] = map[string]interface{}{
			"alt": featuredImage["altText"].(string),
			"url": featuredImage["url"].(string),
		}
	}

	if images, ok := productNode["images"].(map[string]interface{}); ok {
		imageEdges := images["edges"].([]interface{})
		for _, edge := range imageEdges {
			imageNode := edge.(map[string]interface{})["node"].(map[string]interface{})
			image := map[string]interface{}{
				"alt": imageNode["altText"].(string),
				"url": imageNode["url"].(string),
			}
			product["images"] = append(product["images"].([]map[string]interface{}), image)
		}
	}

	// extract options
	if options, ok := productNode["options"].([]interface{}); ok {
		for _, obj := range options {
			option := map[string]interface{}{
				"id":       obj.(map[string]interface{})["id"].(string),
				"name":     obj.(map[string]interface{})["name"].(string),
				"position": obj.(map[string]interface{})["position"].(float64),
				"values":   obj.(map[string]interface{})["values"].([]interface{}),
			}
			product["options"] = append(product["options"].([]map[string]interface{}), option)
		}
	}
	// fmt.Printf("testing options: %v\n", product["options"])

	// extract variants
	variants := productNode["variants"].(map[string]interface{})["edges"].([]interface{})
	for _, variantEdge := range variants {
		variantNode := variantEdge.(map[string]interface{})["node"].(map[string]interface{})
		variant := map[string]interface{}{
			"handle":          handle,
			"id":              variantNode["id"].(string),
			"title":           variantNode["title"].(string),
			"price":           variantNode["price"].(string),
			"selectedOptions": []map[string]interface{}{},
			"sku":             variantNode["sku"].(string),
		}

		// if image
		if image, ok := variantNode["image"].(map[string]interface{}); ok {
			variant["image"] = map[string]interface{}{
				"alt": image["altText"].(string),
				"url": image["url"].(string),
			}
		}

		// extract selected options
		if selectedOptions, ok := variantNode["selectedOptions"].([]interface{}); ok {
			for _, obj := range selectedOptions {
				option := map[string]interface{}{
					"name":  obj.(map[string]interface{})["name"].(string),
					"value": obj.(map[string]interface{})["value"].(string),
				}
				optionValue := obj.(map[string]interface{})["optionValue"].(map[string]interface{})
				optionValueMap := map[string]interface{}{
					"hasVariants": optionValue["hasVariants"].(bool),
					"name":        optionValue["name"].(string),
				}
				if swatch, ok := optionValue["swatch"].(map[string]interface{}); ok && swatch != nil {
					optionValueMap["swatch"] = map[string]interface{}{
						"color": swatch["color"].(string),
					}
				}
				option["optionValue"] = optionValueMap
				variant["selectedOptions"] = append(variant["selectedOptions"].([]map[string]interface{}), option)
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
