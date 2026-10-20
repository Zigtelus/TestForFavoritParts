import React from 'react';

function BrandList({ brands, isLoading, selectedBrand, onBrandSelect, isSearched, isError }) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status"></div>
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

    if (!brands || brands.length === 0) {
      return <p className="text-center text-muted my-3">По данному артикулу ничего не найдено</p>;
    }

    return (
      <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {brands.map((brand) => (
          <button 
            key={brand}
            type="button" 
            className={`list-group-item list-group-item-action fw-semibold ${selectedBrand === brand ? 'active' : ''}`}
            onClick={() => onBrandSelect(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-light py-3">
        <h5 className="card-title mb-0 fw-bold">1. Производители</h5>
      </div>
      <div className="card-body">
        {renderContent()}
      </div>
    </div>
  );
}

export default BrandList;