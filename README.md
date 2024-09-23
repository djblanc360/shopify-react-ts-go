# Shopify Theme - React + GoTypeScript, Tailwind, Vite

This a skeleton Shopify theme using **TypeScript**, **Tailwind**, and **Vite** as the build tool. Initial fullstack build testing a Go backend for a Shopify storefront.

## Project Structure

```bash
root/
├── client/                          # react frontend
│   ├── public/                      
│   ├── src/
│   │   ├── components/              # ui components
│   │   │   ├── Headertsx.
│   │   │   ├── ProductCard.tsx      # renders a single product item
│   │   │   ├── Collection.tsx  	 # renders carousel or products
│   │   │   └── .../
│   │   ├── pages/                   # views/pages
│   │   │   ├── Home/
│   │   │   │   ├── HomePage.tsx
│   │   │   ├── Collections/
│   │   │   │   ├── CollectionPage.tsx      # displays a single collection
│   │   │   │   ├── CollectionsList.tsx     # displaysa list of collections
│   │   │   ├── Product/
│   │   │   │   └── ProductPage.tsx
│   │   │   └── .../
│   │   ├── hooks/                   # custom react hooks
│   │   │   ├── useFetch.ts			# promise factory
│   │   │   ├── useCart.ts
│   │   │   └── useCollectionData.ts
│   │   ├── services/                # api calls to backend
│   │   │   ├── productService.ts
│   │   │   └── collectionService.ts
│   │   ├── contexts/                # react contexts for global state
│   │   │   ├── CartContext.tsx      # for managing cart state
│   │   │   ├── AuthContext.tsx      # for authentication
│   │   │   └── .../
│   │   ├── types/                # shared typeScript types
│   │   │   ├── Product.ts
│   │   │   ├── Collection.ts.
│   │   ├── utils/                   # utility functions
│   │   │   ├── formatPrice.ts
│   │   │   └── debounce.ts          
│   │   ├── App.tsx                  # main app component
│   │   ├── imain.tsx                # entry point for React
│   │   ├──vite-env.d.ts       
│   │   └── index.css                # tailwind  
│   ├── index.html
│   ├── package.json                 
│   ├── tsconfig.json                # typeScript configuration
│   └── vite.config.ts               # vite configuration
├── server/                          # go backend
│   ├── cmd/                         # main apps
│   │   └── api/
│   │       └── main.go              # entry point for the go backend
│   ├── internal/                    # private application and library code
│   │   ├── handlers/                # http handlers for endpoints
│   │   │   ├── products.go
│   │   │   └── collections.go
│   │   ├── models/                  # data models
│   │   │   └── models.go
│   │   ├── services/                # business logic and external integrations
│   │   │   ├── collections_service.go
│   │   │   └── products_service.go
│   │   ├── middleware/              # custom middleware (e.g., authentication, logging)
│   │   │   ├── cors_middleware.go
│   │   │   └── logging_middleware.go
│   │   ├── config/                  # config files and environment variables
│   │   │   └── config.go
│   │   └── utils/                   # utility functions
│   │       └── utils.go
│   ├── go.mod                       # go module file
│   └── go.sum                       # go dependencies
└── .gitignore                       
```