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
  