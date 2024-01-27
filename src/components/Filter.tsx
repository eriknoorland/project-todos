import React, { useEffect, useState } from 'react';
import { ItemType } from '../types';
import './Filter.scss';

interface FilterProps {
  onChange: (a: ItemType[]) => void;
  types: {
    id: number;
    name: string;
    value: string;
  }[];
};

const Filter = (props: FilterProps) => {
  const [selectedTypes, setSelectedTypes] = useState<ItemType[]>([]);
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setSelectedTypes([
        ...selectedTypes,
        event.target.value as ItemType,
      ]);

      return;
    }
    
    setSelectedTypes(selectedTypes.filter((type) => type !== event.target.value));
  }

  useEffect(() => {
    props.onChange([...selectedTypes]);
  }, [selectedTypes]);

  return (
    <div className="filter">
      <span className="filter__title">
        Filter type:
      </span>

      {props.types.map((type) => {
        return <label
          key={type.id}
          className="filter__item"
        >
            <input
              type="checkbox"
              name="type"
              value={type.value}
              onChange={handleChange}
              className="filter__itemCheckbox"
            />
            
            {type.name}
          </label>;
      })}
    </div>
  );
};

export default Filter;