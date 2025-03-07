export type Color = {
  id: string;
  name: string;
  hex: string;
  created_at: string;
};

export type Size = {
  id: string;
  name: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  created_at: string;
};

export type SubCategory = {
  id: string;
  name: string;
  category_id: string;
  image: string;
  created_at: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  bannerImage: string;
  establishedYear: number;
  headquarters: string;
  website: string;
  contactEmail: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  categories: string[]; // Category IDs
  featuredProducts: string[]; // Featured product IDs
  totalProducts: number;
  averageRating: number;
  totalReviews: number;
  missionStatement: string;
  values: string[];
  isActive: boolean;
  created_at: string;
};

export type Variant = {
  id: string;
  product_id: string;
  color: string;
  image_id: string;
  stock: number;
  price: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  discount_percentage?: number;
  discount_start_date?: string;
  discount_end_date?: string;
  is_discounted: boolean;
  stock: number;
  brand_id: string;
  brand?: Brand; // Optional populated brand details
  category_ids: string[];
  subcategory_ids: string[];
  size_ids: string[];
  color_ids: string[];
  images: string[];
  created_at: string;
  updated_at: string;
  views: number;
  likes: number;
  is_featured: boolean;
  number_sold: number;
  average_rating: number;
  total_reviews: number;
  variant_ids: string[];
  categories?: Category[]; // Optional populated categories
  subcategories?: SubCategory[]; // Optional populated subcategories
  sizes?: Size[]; // Optional populated sizes
  colors?: Color[]; // Optional populated colors
  variants?: Variant[]; // Can be expanded based on the specific variant structure
};

export type FeaturedOffering = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  keywords: string[];
  is_featured: boolean;
  trending: boolean;
  is_new: boolean;
  top_selling: boolean;
  top_choice: boolean;
  rating: string; // If rating should be a number, change to `number`
  category_id: string | null;
  subcategory_id: string | null;
  is_discounted: boolean;
  created_at: string; // If using Date objects, change to `Date`
  updated_at: string; // If using Date objects, change to `Date`
};

export interface Notification {
  id: string;
  user_id: string;
  subject: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

export type UserData = {
  _id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  nearest_bus_stop: string;
  profile_image: string | null;
  preferred_payment_method: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export interface SelectedSize {
  label: string;
  gender: string;
  chest: number;
  waist: number;
  hips: number;
  description: string;
  created_at: string;
  id: string;
}

export interface SelectedMaterial {
  name: string;
  description: string;
  created_at: string;
  material_image_id: string;
  id: string;
}

export interface SelectedColor {
  name: string;
  created_at: string;
  hex: string;
  id: string;
}

export interface CartItem {
  product_id: string;
  quantity: number;
  created_at: string;
  id: string;
  selected_sizes: SelectedSize[];
  selected_materials: SelectedMaterial[];
  selected_colors: SelectedColor[];
  cart_id: string;
}

export interface CartData {
  user_id: string;
  created_at: string;
  cartitem_ids: string[];
  total_items: number;
  total_price: string;
  id: string;
  items: CartItem[];
}

export interface ApiResponse<T> {
  data: T;
}

export interface CartState {
  cart: CartData | null;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  removeItems: (ids: string[]) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  getCart: () => Promise<void>;
  synchronizeCart: () => Promise<void>;
}

export type Upload = {
  id: string;
  name: string;
  file: string;
  type: string;
  created_at: string;
};

export interface Blog {
  id: string;
  imageUrl: string;
  title: string;
  blogDate: string;
  authorName: string;
  authorImage: string;
  postDate: string;
  readingTime: string;
}
