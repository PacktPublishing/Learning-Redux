import React from 'react'
import Filter from './Filter.jsx'

const FilterList = ({ categories, setFilter, clearFilter }) =>
  <span>
    {categories.map(
      (category, i) =>
        <span key={i.toString()}>
          <Filter
            name={category}
            onClick={() => setFilter(category)}
          />
          {' - '}
        </span>
    )}
    <a href="javascript:void(0)" onClick={clearFilter}>all posts</a>
  </span>

export default FilterList

