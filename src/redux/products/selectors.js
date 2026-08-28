export const selectProducts = (state) => state.products.items;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectIsLoadingProducts = (state) => state.products.isLoading;