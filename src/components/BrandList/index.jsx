import Column from '@/ui/Column';

function BrandList({ brands, isLoading, selectedBrand, onBrandSelect, isSearched, isError }) {
  const renderContent = () => {
    if (!isSearched)
      return <div role="status" className="text-secondary">Введите артикул выше для начала подбора"</div>;

    if (!brands || brands.length === 0)
      return <div role="status" className="text-secondary">По данному артикулу ничего не найден</div>;

    return (
      <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 500px)', minHeight: '100px' }}>
        <div className="list-group">
          {brands.map((brand) => (
            <button 
              key={brand}
              type="button" 
              className={`list-group-item list-group-item-action fw-semibold cursor-pointer ${selectedBrand === brand ? 'active' : ''}`}
              onClick={() => onBrandSelect(brand)}
              aria-selected={selectedBrand === brand}
            >
              {brand}
            </button>
          ))}
        </div>
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