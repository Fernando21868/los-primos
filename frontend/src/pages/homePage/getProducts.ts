import { TProducts } from './types';

export async function getProducts() {
  const response = await fetch('http://localhost:8080/categories');
  const body = (await response.json()) as unknown;
  assertIsProducts(body);
  return body;
}

export function assertIsProducts(products: unknown): asserts products is TProducts[] {
  if (!Array.isArray(products)) {
    throw new Error("products isn't an array");
  }
  if (products.length === 0) {
    return;
  }
  products.forEach((product) => {
    if (!('nameCategory' in product)) {
      throw new Error("product doens't contain nameCategory");
    }
    if (typeof product.nameCategory !== 'string') {
      throw new Error('nameCategory is not a string');
    }
    if (!('description' in product)) {
      throw new Error("product doens't contain description");
    }
    if (typeof product.description !== 'string') {
      throw new Error('description is not a string');
    }
    if (!('photo' in product)) {
      throw new Error("product doens't contain photo");
    }
    if (typeof product.photo !== 'string') {
      throw new Error('photo is not a string');
    }
  });
}
