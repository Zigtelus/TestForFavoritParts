import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import BrandList from '@/components/BrandList';
import { useGetBrandsQuery, useLazyGetAnalogsQuery } from '@/store/partsApi';
import PartsTable from '@/components/PartsTable';

function App() {
  const [activeNumber, setActiveNumber] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const { 
    data: brands, 
    isFetching: isBrandsFetching,
    error: brandsError 
  } = useGetBrandsQuery(activeNumber, { skip: !activeNumber });

  const [
    triggerGetAnalogs, 
    { data: analogs, isFetching: isAnalogsFetching, error: analogsError }
  ] = useLazyGetAnalogsQuery();

  const handleBrandSelect = (brand) => {
    if (selectedBrand === brand) return;
    setSelectedBrand(brand);
    triggerGetAnalogs({ number: activeNumber, brand });
  };

  const getErrorMessage = (error) => {
    if (!error) return null;
    if (error.message) return error.message;
    if (error.data?.error) return error.data.error;
    return 'Ошибка сети. Проверьте подключение.';
  };

  useEffect(() => {
    if (brandsError) {
      setSelectedBrand('');
    }
  }, [brandsError]);

  return (
    <div className="container py-5" style={{ maxWidth: '1200px' }}>
      <header className="mb-5 text-center">
        <h1 className="display-6 fw-bold text-primary">Поиск автозапчастей</h1>
        <p className="text-muted">Интеграция с веб-сервисом «Проценка»</p>
      </header>
      
      <SearchForm 
        onSearch={(number) => {
          setSelectedBrand('');
          setActiveNumber(number);
        }} 
      />

      {(brandsError || analogsError) && (
        <div className="alert alert-danger shadow-sm mb-4" role="alert">
          <h5 className="alert-heading fw-bold">Ошибка:</h5>
          <p className="mb-0">{getErrorMessage(brandsError) || getErrorMessage(analogsError)}</p>
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <BrandList
            brands={brands}
            isLoading={isBrandsFetching}
            selectedBrand={selectedBrand}
            onBrandSelect={handleBrandSelect}
            isSearched={!!activeNumber}
            isError={!!brandsError}
          />
        </div>

        <div className="col-12 col-md-8">
          <PartsTable 
            analogs={analogs}
            isLoading={isBrandsFetching || isAnalogsFetching}
            selectedBrand={selectedBrand}
            isSearched={!!activeNumber}
            isError={!!(brandsError || analogsError)}
            noBrandsFound={!brands || brands.length === 0} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
