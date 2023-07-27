export async function deleteSingleUser(id: string) {
  await fetch(`http://localhost:8080/users/${id}`, {
    method: 'delete',
  });
}

export async function deleteSingleCategory(id: string) {
  await fetch(`http://localhost:8080/categories/${id}`, {
    method: 'delete',
  });
}

export async function deleteSingleProduct(id: string) {
  await fetch(`http://localhost:8080/products/${id}`, {
    method: 'delete',
  });
}
