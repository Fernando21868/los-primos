import { IUsers, ICategories } from './types';

export async function getCategories() {
  const response = await fetch('http://localhost:8080/categories');
  const body = (await response.json()) as unknown;
  assertIsCategories(body);
  return body;
}

export async function getUsers() {
  const response = await fetch('http://localhost:8080/users');
  const body = (await response.json()) as unknown;
  assertIsUsers(body);
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

// export function assertIsUsers(users: unknown): asserts users is IUsers[] {
//   if (!Array.isArray(users)) {
//     throw new Error("users isn't an array");
//   }
//   if (users.length === 0) {
//     return;
//   }
//   users.forEach((users) => {
//     if (!('firstName' in users)) {
//       throw new Error("users doens't contain firstName");
//     }
//     if (typeof users.firstName !== 'string') {
//       throw new Error('firstName is not a string');
//     }
//     if (!('lastName' in users)) {
//       throw new Error("users doens't contain lastName");
//     }
//     if (typeof users.lastName !== 'string') {
//       throw new Error('lastName is not a string');
//     }
//     if (!('dni' in users)) {
//       throw new Error("users doens't contain dni");
//     }
//     if (typeof users.dni !== 'number') {
//       throw new Error('dni is not a number');
//     }
//     if (!('email' in users)) {
//       throw new Error("users doens't contain email");
//     }
//     if (typeof users.email !== 'string') {
//       throw new Error('email is not a string');
//     }
//     if (!('password' in users)) {
//       throw new Error("users doens't contain password");
//     }
//     if (typeof users.password !== 'string') {
//       throw new Error('password is not a string');
//     }
//     if (!('repeatPassword' in users)) {
//       throw new Error("users doens't contain repeatPassword");
//     }
//     if (typeof users.repeatPassword !== 'string') {
//       throw new Error('repeatPassword is not a string');
//     }
//     if (!('permissions' in users)) {
//       throw new Error("users doens't contain permissions");
//     }
//     if (typeof users.permissions !== 'string') {
//       throw new Error('permissions is not a string');
//     }
//     if (!('phoneNumber' in users)) {
//       throw new Error("users doens't contain phoneNumber");
//     }
//     if (typeof users.phoneNumber !== 'string') {
//       throw new Error('phoneNumber is not a string');
//     }
//   });
// }
