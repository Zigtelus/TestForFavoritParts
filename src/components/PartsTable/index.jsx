import Column from '@/ui/Column';
import Head from './Head';
import Body from './Body';

function PartsTable({ analogs, isLoading, selectedBrand, isSearched, isError, noBrandsFound }) {

  const renderContent = () => {
    if (!isSearched)
      return <div role="status" className="text-secondary">Введите артикул выше для начала подбора</div>;

    if (noBrandsFound)
      return <div role="status" className="text-secondary">Поиск аналогов невозможен, так как производители не найдены</div>;

    if (!selectedBrand)
      return <div role="status" className="text-secondary">Выберите бренд из списка слева, чтобы загрузить склады, цены и аналоги детали</div>;

    if (!analogs || analogs.length === 0)
      return <div className="text-secondary">Склады, цены и аналоги детали отсутствуют</div>;

    return (
      <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 500px)', minHeight: '100px' }}>
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0">
            <Head />
            <Body analogs={analogs} />
          </table>
        </div>
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