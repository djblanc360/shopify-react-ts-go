export interface ProductVariant {
  id: number
  product_id: number
  title: string
  price: string
  position: number
  inventory_policy: string
  compare_at_price: string | null
  option1: string
  option2: string
  option3: string | null
  created_at: string
  updated_at: string
  taxable: boolean
  barcode: string
  fulfillment_service: string
  grams: number
  inventory_management: string
  requires_shipping: boolean
  sku: string
  weight: number
  weight_unit: string
  inventory_item_id: number
  inventory_quantity: number
  old_inventory_quantity: number
  admin_graphql_api_id: string
  image_id: number | null
}

export interface ProductOption {
  id: number
  product_id: number
  name: string
  position: number
  values: string[]
}

export interface ProductImage {
  id: number
  alt: string
  position: number
  product_id: number
  created_at: string
  updated_at: string
  admin_graphql_api_id: string
  width: number
  height: number
  src: string
  variant_ids: number[]
}

export interface Product {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  created_at: string
  handle: string
  updated_at?: string
  published_at: string
  template_suffix?: string | null
  published_scope?: string
  tags: string[]
  status: string
  admin_graphql_api_id: string
  variants: ProductVariant[]
  options?: ProductOption[]
  images: ProductImage[]
  image?: ProductImage
}

// interface ProductResponse {
//   product: Product
// }
