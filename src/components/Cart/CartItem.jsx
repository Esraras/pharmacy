export default function CartItem({ item }) {
  return (
    <div>
      <strong>{item?.name || 'Ürün'}</strong>
      <span>{item?.quantity || 1} adet</span>
    </div>
  );
}
