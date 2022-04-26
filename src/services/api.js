export async function getCategories() {
  // Implemente aqui
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await result.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  let result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  result = await result.json();
  return result;
}
