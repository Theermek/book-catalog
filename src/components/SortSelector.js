import React from 'react';

const SortSelector = ({ sortMode, setSortMode }) => {
  return (
    <div className="mb-4">
      <label htmlFor="sort-mode" className="mr-2">Сортировать по: </label>
      <select id="sort-mode" value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="border p-2">
        <option value="year">Году</option>
        <option value="rating">Рейтингу</option>
        <option value="author">Автору</option>
      </select>
    </div>
  );
};

export default SortSelector;
