import {
  ICategories,
  IProducts,
  IUsers,
  TCategoryForm,
  TProductForm,
  TUserForm,
} from '../interfaces/types';

export async function updateUser(newUserData: TUserForm, id: string) {
  const response = await fetch(`http://localhost:8080/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newUserData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedUser(body);
  return { ...newUserData, ...body };
}

export async function updateCategory(newCategoryData: TCategoryForm, id: string) {
  const response = await fetch(`http://localhost:8080/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newCategoryData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedCategory(body);
  return { ...newCategoryData, ...body };
}

export async function updateProduct(newProductData: TProductForm, id: string) {
  const response = await fetch(`http://localhost:8080/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newProductData),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedProduct(body);
  return { ...newProductData, ...body };
}

export async function updateCategoryPhoto(file: File, id: string) {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  const response = await fetch(`http://localhost:8080/categories/${id}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedCategory(body);
  return body;
}

export async function updateUserProfilePhoto(file: File, id: string) {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  const response = await fetch(`http://localhost:8080/users/${id}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedUserProfilePhoto(body);
  return body;
}

export async function updateProductPhoto(file: File, id: string) {
  const formData = new FormData();
  formData.append('file', file);
  console.log(formData);
  const response = await fetch(`http://localhost:8080/products/${id}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });
  const body = await response.json();
  assertIsUpdatedProduct(body);
  return body;
}

export function assertIsUpdatedProduct(product: unknown): asserts product is IProducts {
  console.log(product);
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
  if (typeof product.category !== 'string') {
    throw new Error("category isn't an string");
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

function assertIsUpdatedCategory(category: any): asserts category is ICategories {
  if (!('_id' in category)) {
    throw new Error("category doesn't contain _id");
  }
  if (typeof category._id !== 'string') {
    throw new Error('id is not a string');
  }
  if (!('description' in category)) {
    throw new Error("category doesn't contain description");
  }
  if (typeof category.description !== 'string') {
    throw new Error('description is not a string');
  }
  if (!('nameCategory' in category)) {
    throw new Error("category doesn't contain nameCategory");
  }
  if (
    ![
      'conveniencia',
      'golosinas',
      'bebidas',
      'limpieza',
      'refrigerados',
      'no perecederos',
    ].includes(category.nameCategory)
  ) {
    throw new Error('nameCategory is not a a valid category');
  }
  if (!('photo' in category)) {
    throw new Error("category doesn't contain photo");
  }
  if (typeof category.photo !== 'string') {
    throw new Error('photo is not a string');
  }
  if (!('updatedAt' in category)) {
    throw new Error("category doesn't contain updatedAt");
  }
  if (typeof category.updatedAt !== 'string') {
    throw new Error('updatedAt is not a string');
  }
  if (!('createdAt' in category)) {
    throw new Error("category doesn't contain createdAt");
  }
  if (typeof category.createdAt !== 'string') {
    throw new Error('createdAt is not a string');
  }
}

function assertIsUpdatedUser(user: any): asserts user is IUsers {
  if (!('_id' in user)) {
    throw new Error("user doesn't contain _id");
  }
  if (typeof user._id !== 'string') {
    throw new Error('id is not a string');
  }
  if (!('createdAt' in user)) {
    throw new Error("user doesn't contain createdAt");
  }
  if (typeof user.createdAt !== 'string') {
    throw new Error('createdAt is not a string');
  }
  if (!('email' in user)) {
    throw new Error("user doesn't contain email");
  }
  if (typeof user.email !== 'string') {
    throw new Error('email is not a string');
  }
  if (!('firstName' in user)) {
    throw new Error("user doesn't contain firstName");
  }
  if (typeof user.firstName !== 'string') {
    throw new Error('firstName is not a string');
  }
  if (!('googleId' in user)) {
    throw new Error("user doesn't contain googleId");
  }
  if (typeof user.googleId !== 'string') {
    throw new Error('googleId is not a string');
  }
  if (!('lastName' in user)) {
    throw new Error("user doesn't contain lastName");
  }
  if (typeof user.lastName !== 'string') {
    throw new Error('lastName is not a string');
  }
  if (!('password' in user)) {
    throw new Error("user doesn't contain password");
  }
  if (typeof user.password !== 'string') {
    throw new Error('password is not a string');
  }
  if (!('permissions' in user)) {
    throw new Error("user doesn't contain permissions");
  }
  if (!['cliente', 'gerente', 'empleado', 'administrador'].includes(user.permissions)) {
    throw new Error('permissions is not a string');
  }
  if (!('phoneNumber' in user)) {
    throw new Error("user doesn't contain phoneNumber");
  }
  if (typeof user.phoneNumber !== 'string') {
    throw new Error('phoneNumber is not a string');
  }
  if (!('profilePhoto' in user)) {
    throw new Error("user doesn't contain profilePhoto");
  }
  if (typeof user.profilePhoto !== 'string') {
    throw new Error('profilePhoto is not a string');
  }
  if (!('repeatPassword' in user)) {
    throw new Error("user doesn't contain repeatPassword");
  }
  if (typeof user.repeatPassword !== 'string') {
    throw new Error('repeatPassword is not a string');
  }
  if (!('sex' in user)) {
    throw new Error("user doesn't contain sex");
  }
  if (!['masculino', 'femenino', 'sin especificar'].includes(user.sex)) {
    throw new Error('sex is not a string');
  }
  if (!('updatedAt' in user)) {
    throw new Error("user doesn't contain updatedAt");
  }
  if (typeof user.updatedAt !== 'string') {
    throw new Error('updatedAt is not a string');
  }
  if (!('dni' in user)) {
    throw new Error("user doesn't contain dni");
  }
  if (typeof user.dni !== 'number') {
    throw new Error('dni is not a number');
  }
}

function assertIsUpdatedUserProfilePhoto(user: any): asserts user is IUsers {
  if (!('_id' in user)) {
    throw new Error("user doesn't contain _id");
  }
  if (typeof user._id !== 'string') {
    throw new Error('id is not a string');
  }
  if (!('createdAt' in user)) {
    throw new Error("user doesn't contain createdAt");
  }
  if (typeof user.createdAt !== 'string') {
    throw new Error('createdAt is not a string');
  }
  if (!('email' in user)) {
    throw new Error("user doesn't contain email");
  }
  if (typeof user.email !== 'string') {
    throw new Error('email is not a string');
  }
  if (!('firstName' in user)) {
    throw new Error("user doesn't contain firstName");
  }
  if (typeof user.firstName !== 'string') {
    throw new Error('firstName is not a string');
  }
  if (!('googleId' in user)) {
    throw new Error("user doesn't contain googleId");
  }
  if (typeof user.googleId !== 'string') {
    throw new Error('googleId is not a string');
  }
  if (!('lastName' in user)) {
    throw new Error("user doesn't contain lastName");
  }
  if (typeof user.lastName !== 'string') {
    throw new Error('lastName is not a string');
  }
  if (!('permissions' in user)) {
    throw new Error("user doesn't contain permissions");
  }
  if (!['cliente', 'gerente', 'empleado', 'administrador'].includes(user.permissions)) {
    throw new Error('permissions is not a string');
  }
  if (!('profilePhoto' in user)) {
    throw new Error("user doesn't contain profilePhoto");
  }
  if (typeof user.profilePhoto !== 'string') {
    throw new Error('profilePhoto is not a string');
  }
  if (!('updatedAt' in user)) {
    throw new Error("user doesn't contain updatedAt");
  }
  if (typeof user.updatedAt !== 'string') {
    throw new Error('updatedAt is not a string');
  }
}
