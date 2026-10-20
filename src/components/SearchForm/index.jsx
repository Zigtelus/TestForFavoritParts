import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [searchNumber, setSearchNumber] = useState('');
  const [lastSearchedNumber, setLastSearchedNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentInput = searchNumber.trim();

    if (!currentInput) return; 

    if (currentInput === lastSearchedNumber) {
      return;
    }

    onSearch(currentInput); 
    setLastSearchedNumber(currentInput);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12 col-sm-9">
            <input 
              type="text" 
              className="form-control form-control-lg"
              placeholder="Введите номер детали (например, 01089)..." 
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-3">
            <button className="btn btn-primary btn-lg w-100" type="submit">
              Искать бренды
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
