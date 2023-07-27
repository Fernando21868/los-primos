import { IUsers, ICategories, IProducts } from '../interfaces/types';

export async function getCategories() {
  const response = await fetch('http://localhost:8080/categories', { credentials: 'include' });
  const body = (await response.json()) as unknown;
  assertIsCategories(body);
  return body;
}

export async function getUsers() {
  const response = await fetch('http://localhost:8080/users', { credentials: 'include' });
  const body = (await response.json()) as unknown;
  assertIsUsers(body);
  return body;
}

export async function getProducts() {
  const response = await fetch('http://localhost:8080/products', { credentials: 'include' });
  const body = (await response.json()) as unknown;
  assertIsProducts(body);
  return body;
}

export function assertIsCategories(categories: unknown): asserts categories is ICategories[] {
  if (!Array.isArray(categories)) {
    throw new Error("categories isn't an array");
  }
  if (categories.length === 0) {
    return;
  }
  categories.forEach((category) => {
    if (!('nameCategory' in category)) {
      throw new Error("category doens't contain nameCategory");
    }
    if (typeof category.nameCategory !== 'string') {
      throw new Error('nameCategory is not a string');
    }
    if (!('description' in category)) {
      throw new Error("category doens't contain description");
    }
    if (typeof category.description !== 'string') {
      throw new Error('description is not a string');
    }
    if (!('photo' in category)) {
      throw new Error("category doens't contain photo");
    }
    if (typeof category.photo !== 'string') {
      throw new Error('photo is not a string');
    }
  });
}

export function assertIsUsers(users: unknown): asserts users is IUsers[] {
  if (!Array.isArray(users)) {
    throw new Error("users isn't an array");
  }
  if (users.length === 0) {
    return;
  }
  users.forEach((user) => {
    if (!('_id' in user)) {
      throw new Error("user doens't contain _id");
    }
    if (typeof user._id !== 'string') {
      throw new Error('_id is not a string');
    }
    if (!('firstName' in user)) {
      throw new Error("user doens't contain firstName");
    }
    if (typeof user.firstName !== 'string') {
      throw new Error('firstName is not a string');
    }
    if (!('lastName' in user)) {
      throw new Error("user doens't contain lastName");
    }
    if (typeof user.lastName !== 'string') {
      throw new Error('lastName is not a string');
    }
    if (!('email' in user)) {
      throw new Error("user doens't contain email");
    }
    if (typeof user.email !== 'string') {
      throw new Error('email is not a string');
    }
    if (!('permissions' in user)) {
      throw new Error("user doens't contain permissions");
    }
    if (typeof user.permissions !== 'string') {
      throw new Error('permissions is not a string');
    }
    if (!('profilePhoto' in user)) {
      throw new Error("user doens't contain profilePhoto");
    }
    if (typeof user.profilePhoto !== 'string') {
      throw new Error('profilePhoto is not a string');
    }
    if (!('createdAt' in user)) {
      throw new Error("user doens't contain createdAt");
    }
    if (typeof user.createdAt !== 'string') {
      throw new Error('createdAt is not a string');
    }
    if (!('updatedAt' in user)) {
      throw new Error("user doens't contain updatedAt");
    }
    if (typeof user.updatedAt !== 'string') {
      throw new Error('updatedAt is not a string');
    }
  });
}

export function assertIsProducts(products: unknown): asserts products is IProducts[] {
  if (!Array.isArray(products)) {
    throw new Error("products isn't an array");
  }
  if (products.length === 0) {
    return;
  }
  products.forEach((product) => {
    if (!('_id' in product)) {
      throw new Error("product doens't contain _id");
    }
    if (typeof product._id !== 'string') {
      throw new Error('_id is not a string');
    }
    if (!('category' in product)) {
      throw new Error("product doens't contain category");
    }
    if (typeof product.category !== 'object') {
      throw new Error("category isn't an object");
    }
    if (!('nameCategory' in product.category)) {
      throw new Error("product doens't contain nameCategory");
    }
    if (typeof product.category.nameCategory !== 'string') {
      throw new Error('nameCategory is not a string');
    }
    if (!('photo' in product)) {
      throw new Error("product doens't contain photo");
    }
    if (typeof product.photo !== 'string') {
      throw new Error('photo is not a string');
    }
    if (!('price' in product)) {
      throw new Error("product doens't contain price");
    }
    if (typeof product.price !== 'number') {
      throw new Error('price is not a number');
    }
    if (!('stock' in product)) {
      throw new Error("product doens't contain stock");
    }
    if (typeof product.stock !== 'number') {
      throw new Error('stock is not a number');
    }
    if (!('brand' in product)) {
      throw new Error("product doens't contain brand");
    }
    if (typeof product.brand !== 'string') {
      throw new Error('brand is not a string');
    }
    if (!('name' in product)) {
      throw new Error("product doens't contain name");
    }
    if (typeof product.name !== 'string') {
      throw new Error('name is not a string');
    }
  });
}
