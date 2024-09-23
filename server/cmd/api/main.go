package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"   // https://github.com/gorilla/mux
	"github.com/joho/godotenv" // https://github.com/joho/godotenv

	"server/internal/handlers"
	"server/internal/middleware"
)

func main() {
	// load env variables
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := mux.NewRouter()

	// apply middleware
	r.Use(middleware.LoggingMiddleware)
	r.Use(middleware.CORSMiddleware)

	// register url paths and handlers
	// product routes
	// r.HandleFunc("/api/products", handlers.GetAllProductsHandler).Methods("GET")
	r.HandleFunc("/api/products/{id}", handlers.GetProductHandler).Methods("GET")

	// collection routes
	// r.HandleFunc("/api/collections", handlers.GetAllCollectionsHandler).Methods("GET")
	r.HandleFunc("/api/collections/{id}", handlers.GetCollectionHandler).Methods("GET")
	// r.HandleFunc("/api/search", handlers.SearchProductsHandler).Methods("GET")

	// cart routes
	// r.HandleFunc("/api/cart", handlers.GetCartHandler).Methods("GET")
	// r.HandleFunc("/api/cart", handlers.AddToCartHandler).Methods("POST")
	// r.HandleFunc("/api/cart/{itemId}", handlers.UpdateCartItemHandler).Methods("PUT")
	// r.HandleFunc("/api/cart/{itemId}", handlers.RemoveCartItemHandler).Methods("DELETE")

	// start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting server on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
