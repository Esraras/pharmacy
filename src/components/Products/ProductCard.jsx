export default function ProductCard({ product }) {
  return (
    <article>
      <h3>{product?.name || 'Ürün'}</h3>
      <p>{product?.price ? `${product.price} ₺` : 'Fiyat bilgisi yok'}</p>
    </article>
  );
}
