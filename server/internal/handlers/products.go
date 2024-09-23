package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"

	"server/internal/services"
)

func GetProductHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["handle"]

	product, err := services.FetchProduct(id)
	if err != nil {
		http.Error(w, "Product not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}
