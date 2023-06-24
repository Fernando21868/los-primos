import { TUsers, TProducts } from './types';

export async function getProducts() {
  const response = await fetch('http://localhost:8080/products');
  const body = (await response.json()) as unknown;
  assertIsProducts(body);
  return body;
}

export async function getUsers() {
  const response = await fetch('http://localhost:8080/users');
  const body = (await response.json()) as unknown;
  assertIsUsers(body);
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

export function assertIsUsers(users: unknown): asserts users is TUsers[] {
  if (!Array.isArray(users)) {
    throw new Error("users isn't an array");
  }
  if (users.length === 0) {
    return;
  }
  users.forEach((users) => {
    if (!('firstName' in users)) {
      throw new Error("users doens't contain firstName");
    }
    if (typeof users.firstName !== 'string') {
      throw new Error('firstName is not a string');
    }
    if (!('lastName' in users)) {
      throw new Error("users doens't contain lastName");
    }
    if (typeof users.lastName !== 'string') {
      throw new Error('lastName is not a string');
    }
    if (!('dni' in users)) {
      throw new Error("users doens't contain dni");
    }
    if (typeof users.dni !== 'number') {
      throw new Error('dni is not a number');
    }
    if (!('email' in users)) {
      throw new Error("users doens't contain email");
    }
    if (typeof users.email !== 'string') {
      throw new Error('email is not a string');
    }
    if (!('password' in users)) {
      throw new Error("users doens't contain password");
    }
    if (typeof users.password !== 'string') {
      throw new Error('password is not a string');
    }
    if (!('repeatPassword' in users)) {
      throw new Error("users doens't contain repeatPassword");
    }
    if (typeof users.repeatPassword !== 'string') {
      throw new Error('repeatPassword is not a string');
    }
    if (!('permissions' in users)) {
      throw new Error("users doens't contain permissions");
    }
    if (typeof users.permissions !== 'string') {
      throw new Error('permissions is not a string');
    }
    if (!('phoneNumber' in users)) {
      throw new Error("users doens't contain phoneNumber");
    }
    if (typeof users.phoneNumber !== 'string') {
      throw new Error('phoneNumber is not a string');
    }
  });
}
