package utils

import (
	"encoding/json"
	"fmt"
)

// map to JSON string
func MapToJSON(data map[string]interface{}) (string, error) {
	json, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return "", fmt.Errorf("error marshalling to JSON: %v", err)
	}
	return string(json), nil
}
