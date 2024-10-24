package handlers

import (
	"net/http"
	"server/internal/services"

	"fmt"
	"server/internal/utils"

	"github.com/gorilla/mux"
)

func GetCollectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	handle := vars["handle"]

	fmt.Printf("in Go collection handler, handle: %v\n", handle)
	collection, err := services.FetchCollection(handle)
	if err != nil {
		http.Error(w, "Collection not found", http.StatusNotFound)
		return
	}

	json, err := utils.MapToJSON(collection)
	if err != nil {
		http.Error(w, fmt.Sprintf("error converting to JSON: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(json))
}
