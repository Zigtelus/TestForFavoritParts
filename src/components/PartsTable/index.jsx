import React from 'react';
import Column from '@/ui/Column';
import Head from './Head';
import Body from './Body';

function PartsTable({ analogs, isLoading, selectedBrand, isSearched, isError, noBrandsFound }) {

  const renderContent = () => {
    if (!isSearched)
      return "Введите артикул выше для начала подбора";

    if (noBrandsFound)
      return "Поиск аналогов невозможен, так как производители не найдены";

    if (!selectedBrand)
      return "Выберите бренд из списка слева, чтобы загрузить склады, цены и аналоги детали";
    
    if (!analogs || analogs.length === 0)
      return "Склады, цены и аналоги детали отсутствуют";

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle mb-0">
          <Head />
          <Body analogs={analogs} />
        </table>
      </div>
    )
  }

  return (
    <Column>
      <Column.Title>2. Результаты поиска и аналоги</Column.Title>
      <Column.Body
        isLoading={isLoading}
        isError={isError}
      >
        {renderContent()}
      </Column.Body>
    </Column>
  );
}

export default PartsTable;