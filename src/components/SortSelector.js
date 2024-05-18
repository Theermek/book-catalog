import React from 'react';

const SortSelector = ({ sortMode, setSortMode }) => {
  return (
    <div>
      <label htmlFor="sort-mode">Сортировать по: </label>
      <select id="sort-mode" value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
        <option value="year">Году</option>
        <option value="rating">Рейтингу</option>
        <option value="author">Автору</option>
      </select>
    </div>
  );
};

export default SortSelector;
