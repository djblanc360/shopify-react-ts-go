package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"server/internal/models"
)

func FetchProduct(id string) (*models.Product, error) {
	token := os.Getenv("SHOPIFY_ADMIN_TOKEN")
	baseURL := os.Getenv("SHOPIFY_URL")
	apiURL := fmt.Sprintf("%sproducts/%s.json", baseURL, id)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("X-Shopify-Access-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("failed to fetch product")
	}
	var result struct {
		Product models.Product `json:"product"`
	}

	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result.Product, nil
}
