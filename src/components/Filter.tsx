import React, { useEffect, useRef, useState } from 'react';
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

const Filter = ({ types, onChange }: FilterProps) => {
  const isInitialRender = useRef(true);
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
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    
    onChange([...selectedTypes]);
  }, [onChange, selectedTypes]);

  return (
    <div
      className="filter"
      data-testid="filter"
    >
      <span className="filter__title">
        Filter type:
      </span>

      {types.map((type) => {
        return <label
          key={type.id}
          className="filter__item"
          data-testid={`filter-option-${type.value}`}
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