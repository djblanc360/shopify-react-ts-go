package handlers

import (
	"encoding/json"
	"net/http"
	"server/internal/services"

	"github.com/gorilla/mux"

	"fmt"
)

func GetCollectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	fmt.Printf("in Go collection handler, id: %v\n", id)
	collection, err := services.FetchCollection(id)
	if err != nil {
		http.Error(w, "Collection not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(collection)
}
