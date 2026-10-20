import React from 'react';

function PartsTable({ analogs, isLoading, selectedBrand, isSearched, isError }) {

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center text-danger my-5">
          <p>Упс, что-то пошло не так</p>
        </div>
      );
    }

    if (!isSearched) {
      return <p className="text-center text-muted my-3">Введите артикул выше для начала подбора</p>;
    }

    if (!selectedBrand) {
      return <p className="text-center text-muted my-3">Выберите бренд из списка слева, чтобы загрузить склады, цены и аналоги детали</p>;
    }
    
    if (!analogs || analogs.length === 0) {
      return (
        <div className="text-center text-muted py-5">
          <p>Склады, цены и аналоги детали отсутствуют</p>
        </div>
      );
    }
    
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <thead className="table-dark text-uppercase" style={{ fontSize: '0.85rem' }}>
            <tr>
              <th>Деталь / Артикул</th>
              <th>Бренд</th>
              <th>Склад</th>
              <th className="text-center">Остаток</th>
              <th className="text-end">Цена</th>
            </tr>
          </thead>
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
        </table>
      </div>
    );
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-light py-3">
        <h5 className="card-title mb-0 fw-bold">2. Результаты поиска и аналоги</h5>
      </div>
      <div className="card-body">
        {renderContent()}
      </div>
    </div>
  );
}

export default PartsTable;
