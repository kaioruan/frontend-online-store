export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  result = await result.json();
  return result;
}

export async function getCategoriesList(id) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
  const categories = await result.json();
  return categories;
}
