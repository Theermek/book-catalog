import React from 'react';

const SortSelector = ({ sortMode, setSortMode }) => {
  return (
    <div className=" self-end text-end basis-1/4">
      <label htmlFor="sort-mode" className="mr-2">Сортировать по: </label>
      <select id="sort-mode" value={sortMode} onChange={(e) => setSortMode(e.target.value)} className="border-2 mb-2 border-neutral-500 hover:border-indigo-700 rounded bg-neutral-100">
        <option value="year">Году</option>
        <option value="rating">Рейтингу</option>
        <option value="author">Автору</option>
      </select>
    </div>
  );
};

export default SortSelector;
