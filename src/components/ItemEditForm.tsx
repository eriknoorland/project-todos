import { useState } from 'react';
import itemTypes from '../data/itemTypes.json';
import itemPriorities from '../data/itemPriorities.json';
import { ItemData } from '../types';
import './ItemEditForm.scss';
import Button from './Button';

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
      <div className="form__element">
        <label
          htmlFor="title"
          className="form__elementLabel"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          name="title"
          className="form__elementInput"
          defaultValue={editData.title}
          onChange={handleOnInputChange}
        />
      </div>

      <div className="form__element">
        <label
          htmlFor="description"
          className="form__elementLabel"
        >
          Description
        </label>
        
        <textarea
          id="description"
          name="description"
          cols={40}
          rows={4}
          className="form__elementTextarea"
          defaultValue={editData.description}
          onChange={handleOnInputChange}
        />
      </div>

      <div className="form__element">
        <label
          htmlFor="type"
          className="form__elementLabel"
        >
          Type
        </label>

        <select
          id="type"
          name="type"
          defaultValue={editData.type}
          onChange={handleOnInputChange}
          className="form__elementSelect"
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
      </div>

      <div className="form__element">
        <label
          htmlFor="priority"
          className="form__elementLabel"
        >
          Priority
        </label>

        <select
          id="priority"
          name="priority"
          defaultValue={editData.priority}
          onChange={handleOnInputChange}
          className="form__elementSelect"
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
      </div>

      <div className="form__element itemEditForm__buttons">
        <Button
          modifiers="cancel"
          className="itemEditForm__cancelButton"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>

        <Button
          modifiers="submit"
          className="itemEditForm__saveButton"
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ItemEditForm;