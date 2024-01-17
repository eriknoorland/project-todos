import { useState } from 'react';
import itemTypes from '../data/itemTypes.json';
import itemPriorities from '../data/itemPriorities.json';
import { ItemData } from '../types';
import './ItemEditForm.scss';

interface ItemEditFormProps {
  data: ItemData;
  onSave: (item: ItemData) => void;
  onCancel: () => void;
}

const ItemEditForm = (props: ItemEditFormProps) => {
  const [editData, setEditData] = useState(props.data);

  function handleCancelClick() {
    setEditData(props.data);
    props.onCancel();
  }

  function handleSaveClick() {
    const editedItem = {
      ...props.data,
      ...editData,
    };

    props.onSave(editedItem);
  }

  function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
    <input
      type="text"
      name="title"
      className="item__titleInput"
      defaultValue={editData.title}
      onChange={handleOnInputChange}
    />

    <div>
      <textarea
        name="description"
        className="item__descriptionInput"
        defaultValue={editData.description}
        onChange={handleOnInputChange}
      />
    </div>

    <select
      name="type"
      defaultValue={editData.type}
      onChange={handleOnInputChange}
      className="item__select"
    >
      {itemTypes.map((type) => {
        return <option
          key={type.id}
          value={type.value}
        >
          {type.name}
        </option>
      })}
    </select>

    <select
      name="priority"
      defaultValue={editData.priority}
      onChange={handleOnInputChange}
      className="item__select"
    >
      {itemPriorities.map((priority) => {
      return <option
        key={priority.id}
        value={priority.value}
      >
        {priority.name}
      </option>
    })}
    </select>

    <div className="item__buttons">
      <button
        className="item__cancelButton"
        onClick={handleCancelClick}
      >
        Cancel
      </button>

      <button
        className="item__saveButton"
        onClick={handleSaveClick}
      >
        Save
      </button>
    </div>
  </>
  );
};

export default ItemEditForm;