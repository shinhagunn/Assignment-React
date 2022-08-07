export type Product = {
  id?: number
  key?: number
  categoryId?: number
  name: string
  old_price: number
  new_price: number
  feature?: string
  short_description?: string
  description?: string
  image?: string
  status?: boolean
  category?: Category
}

export type Category = {
  id?: number
  name?: string
}

export type Cart = {
  product_id: number
  quantity: number
  name: string
  old_price: number
  new_price: number
}

export type User = {
  id: number
  email: string
  password: string
  role: string
}