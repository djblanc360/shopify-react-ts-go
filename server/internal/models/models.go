package models

type Product struct {
	ID          int64    `json:"id"`
	Title       string   `json:"title"`
	Handle      string   `json:"handle"`
	Price       string   `json:"price"`
	Description string   `json:"description"`
	Images      []string `json:"images"`
}

type Collection struct {
	ID       int64     `json:"id"`
	Title    string    `json:"title"`
	Handle   string    `json:"handle"`
	Products []Product `json:"products"`
}
