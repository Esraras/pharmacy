export default function ProductFilter() {
  return (
    <div>
      <label>
        Kategori:
        <select>
          <option value="all">Tümü</option>
          <option value="vitamin">Vitamin</option>
          <option value="pain">Ağrı Kesici</option>
        </select>
      </label>
    </div>
  );
}
