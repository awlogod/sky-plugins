export interface Plugin {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
