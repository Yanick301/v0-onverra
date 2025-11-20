export enum Language {
  DE = 'de',
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  PT = 'pt'
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'accessories' | 'winter' | 'christmas';
  images: string[];
  sizes: string[];
  colors: string[];
  brand: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  tags: string[];
  translations?: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Translation {
  nav: {
    home: string;
    men: string;
    women: string;
    accessories: string;
    winter: string;
    christmas: string;
    brands: string;
    about: string;
    contact: string;
    cart: string;
    checkout: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  home: {
    usp_shipping: string;
    usp_authentic: string;
    usp_return: string;
    section_new: string;
    section_categories: string;
    section_editorial: string;
    editorial_title: string;
    editorial_subtitle: string;
    editorial_btn: string;
    brands_title: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    submitLogin: string;
    submitRegister: string;
    noAccount: string;
    hasAccount: string;
    error: string;
    success: string;
    welcome: string;
    orderHistory: string;
    accountDetails: string;
  };
  common: {
    addToCart: string;
    buyNow: string;
    price: string;
    size: string;
    color: string;
    description: string;
    reviews: string;
    related: string;
    total: string;
    checkout: string;
    login: string;
    register: string;
    logout: string;
  };
  product: {
    freeShipping: string;
    returns: string;
    securePayment: string;
    addToWishlist: string;
  };
}
