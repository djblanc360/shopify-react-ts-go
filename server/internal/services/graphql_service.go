package services

import (
	"context"
	"os"

	"github.com/machinebox/graphql"
)

// executes GraphQL query with given variables and returns response data
func gqlQuery(query string, variables map[string]interface{}) (map[string]interface{}, error) {
	client := graphql.NewClient(os.Getenv("SHOPIFY_URL"))
	token := os.Getenv("SHOPIFY_ADMIN_TOKEN")

	req := graphql.NewRequest(query)
	req.Header.Set("X-Shopify-Access-Token", token)

	// set query variables
	for key, value := range variables {
		req.Var(key, value)
	}

	// define response structure
	var respData map[string]interface{}
	ctx := context.Background()

	if err := client.Run(ctx, req, &respData); err != nil {
		return nil, err
	}

	return respData, nil
}
