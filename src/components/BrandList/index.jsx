import React from 'react';
import Column from '@/ui/Column';

function BrandList({ brands, isLoading, selectedBrand, onBrandSelect, isSearched, isError }) {
  const renderContent = () => {
    if (!isSearched)
      return "Введите артикул выше для начала подбора";

    if (!brands || brands.length === 0)
      return "По данному артикулу ничего не найдено";

    return (
      <div className="list-group" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {brands.map((brand) => (
          <button 
            key={brand}
            type="button" 
            className={`list-group-item list-group-item-action fw-semibold cursor-pointer ${selectedBrand === brand ? 'active' : ''}`}
            onClick={() => onBrandSelect(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    )
  };

  return (
    <Column>
      <Column.Title>1. Производители</Column.Title>
      <Column.Body
        isLoading={isLoading}
        isError={isError}
      >
        {renderContent()}
      </Column.Body>
    </Column>
  );
}

export default BrandList;