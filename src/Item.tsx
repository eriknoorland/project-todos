import { useState } from 'react';
import { ItemData } from './interfaces';
import { ItemStatus } from './types';
import './Item.scss';

interface ItemProps {
  data: ItemData;
  status: ItemStatus;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

export default (props: ItemProps) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(props.data);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('itemId', props.data.id.toString());
    setIsGrabbing(true);
  }

  function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
    setIsGrabbing(false);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleDeleteClick() {
    props.onItemDelete(props.data);
  }

  function handleSaveClick() {
    const editedItem = {
      ...props.data,
      ...editData,
    };

    props.onItemEdit(editedItem);
    setIsEditing(false);
  }

  function handleOnInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        item
        item--${props.status}
        ${isGrabbing ? 'item--is_grabbing' : ''}
      `}
    >
      <div className="item__header">
        <div className="item__priorityLabel">
          {!isEditing && <>Priority: {editData.priority}</>}

          {isEditing && 
            <select
              name="priority"
              defaultValue={editData.priority}
              onChange={handleOnInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          }
        </div>

        <div className="item__actions">
          {!isEditing &&
            <span
              className="item__editAction"
              onClick={handleEditClick}
            >
              edit
            </span>
          }

          <span
            className="item__editAction"
            onClick={handleDeleteClick}
          >
            delete
          </span>
        </div>
      </div>

      <div className="item__title">
        {!isEditing && editData.title }

        {isEditing &&
          <input
            type="text"
            name="title"
            className="item__titleInput"
            defaultValue={editData.title}
            onChange={handleOnInputChange}
          />
        }
      </div>

      {!isEditing &&
        <p className="item__description">
          {editData.description}
        </p>
      }

      {isEditing &&
        <div>
          <textarea
            name="description"
            className="item__descriptionInput"
            defaultValue={editData.description}
            onChange={handleOnInputChange}
          />
        </div>
      }

      {isEditing &&
        <button
          className="item__saveButton"
          onClick={handleSaveClick}
        >
          Save
        </button>
      }
    </div>
  );
};