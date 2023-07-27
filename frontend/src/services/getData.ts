import { IUsers, ICategories, IProducts } from '../interfaces/types';

export async function getSingleCategory(id: string) {
  const response = await fetch(`http://localhost:8080/categories/${id}`);
  const body = (await response.json()) as unknown;
  assertIsSingleCategory(body);
  return body;
}

export async function getSingleUser(id: string) {
  const response = await fetch(`http://localhost:8080/users/${id}`);
  const body = (await response.json()) as unknown;
  assertIsSingleUser(body);
  return body;
}

export async function getSingleProduct(id: string) {
  const response = await fetch(`http://localhost:8080/products/${id}`);
  const body = (await response.json()) as unknown;
  assertIsSingleProduct(body);
  return body;
}

export function assertIsSingleCategory(category: unknown): asserts category is ICategories {
  if (typeof category !== 'object' || category === null) {
    throw new Error("category isn't an object");
  }
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
}

export function assertIsSingleUser(user: unknown): asserts user is IUsers {
  if (typeof user !== 'object' || user === null) {
    throw new Error("user isn't an object");
  }
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
}

export function assertIsSingleProduct(product: unknown): asserts product is IProducts {
  if (typeof product !== 'object' || product === null) {
    throw new Error("product isn't an object");
  }
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
  if (!('nameCategory' in product.category!)) {
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
  if (!('description' in product)) {
    throw new Error("product doens't contain description");
  }
  if (typeof product.description !== 'string') {
    throw new Error('description is not a string');
  }
  if (!('expirationDate' in product)) {
    throw new Error("product doens't contain expirationDate");
  }
  if (typeof product.expirationDate !== 'string') {
    throw new Error('expirationDate is not a string');
  }
  if (!('name' in product)) {
    throw new Error("product doens't contain name");
  }
  if (typeof product.name !== 'string') {
    throw new Error('name is not a string');
  }
}
