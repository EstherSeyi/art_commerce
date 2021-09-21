export type Cart = {
  name: string;
  category: string;
  price: number;
  currency: number;
  image: {
    src: string;
    alt: string;
  };
  bestseller: boolean;
  featured: boolean;
  details?: string;
};
