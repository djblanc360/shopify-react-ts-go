export type FeaturedImage = {
  url: string
  alt: string
}

export type ProductImage = {
  id: string
  alt: string
  position: number
  product_id: string
  created_at: string
  updated_at: string
  admin_graphql_api_id: string
  width: number
  height: number
  url: string
  variant_ids: number[]
}

export type SelectedOption = {
  name: string
  value: string
  optionValue?: {
    hasVariants: boolean
    name: string
    swatch: string | null
  }
}

export type ProductVariant = {
  id: string
  product_id: string
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
  requires_shipping: boolean
  sku: string
  weight: number
  weight_unit: string
  inventory_item_id: number
  inventory_quantity: number
  admin_graphql_api_id: string
  image_id: number | null
  selectedOptions?: SelectedOption[]
}

export type ProductOption = {
  id: string
  name: string
  position: number
  values: string[]
}


export type Product = {
  id: string
  title: string
  handle: string
  description: string
  body_html: string
  vendor: string
  product_type: string
  created_at: string
  featured_image?: FeaturedImage
  images: ProductImage[]
  image?: ProductImage
  updated_at?: string
  published_at: string
  template_suffix?: string | null
  published_scope?: string
  tags: string[]
  status: string
  admin_graphql_api_id: string
  variants: ProductVariant[]
  options?: ProductOption[]
}

// interface ProductResponse {
//   product: Product
// }
