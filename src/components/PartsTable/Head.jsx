function Head () {
  return (
    <thead className="table-dark text-uppercase" style={{ fontSize: '0.85rem' }}>
      <tr>
        <th>Деталь / Артикул</th>
        <th>Бренд</th>
        <th>Склад</th>
        <th className="text-center">Остаток</th>
        <th className="text-end">Цена</th>
      </tr>
    </thead>
  );
}

export default Head;