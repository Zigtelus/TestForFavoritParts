function Body ({ analogs }) {
  return (
    <tbody>
      {analogs.flatMap((good) => {
        if (!good.warehouses || good.warehouses.length === 0) {
          return [
            <tr key={`empty-wh-${good.goodsID}`}>
              <td>
                <div className="fw-bold text-dark">{good.name || 'Наименование не указано'}</div>
                <code className="text-muted">{good.number}</code>
              </td>
              <td><span className="badge bg-light text-dark border">{good.brand}</span></td>
              <td className="text-muted italic">Нет предложений</td>
              <td className="text-center text-danger fw-bold">0 шт.</td>
              <td className="text-end text-muted">—</td>
            </tr>
          ];
        }

        return good.warehouses.map((wh) => (
          <tr key={`${good.goodsID}-${wh.id}`}>
            <td>
              <div className="fw-bold text-dark">{good.name || 'Наименование не указано'}</div>
              <code className="text-secondary">{good.number}</code>
              {(good.notRefund || wh.notRefund) && (
                <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.75rem' }}>
                  Невозвратный
                </span>
              )}
            </td>
            <td>
              <span className="badge bg-light text-dark border">{good.brand}</span>
            </td>
            <td>
              <span className="text-primary fw-semibold">{wh.code || wh.id}</span>
              {wh.own && <span className="badge bg-success ms-1" style={{ fontSize: '0.65rem' }}>Наш</span>}
            </td>
            <td className="text-center fw-bold">
              {wh.stock > 0 ? (
                <span className="text-success">{wh.stock} шт.</span>
              ) : (
                <span className="text-danger">0 шт.</span>
              )}
            </td>
            <td className="text-end text-dark fw-bold fs-5">
              {wh.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </td>
          </tr>
        ));
      })}
    </tbody>
  );
}

export default Body;