
import { Product } from '@/contexts/CartContext';

// We'll use a mock API to fetch products
const API_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}
