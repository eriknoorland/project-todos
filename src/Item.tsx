import { useState } from 'react';
import { ItemData } from './interfaces';
import { ItemPriority, ItemStatus } from './types';
import './Item.scss';

interface ItemProps {
  data: ItemData;
  status: ItemStatus;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

export default (props: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState(props.data.priority);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('itemId', props.data.id.toString());
  }

  // function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
  // }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleDeleteClick() {
    props.onItemDelete(props.data);
  }

  function handleSaveClick() {
    const editedItem = {
      ...props.data,
      title,
      description,
      priority,
    };

    props.onItemEdit(editedItem);
    setIsEditing(false);
  }

  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPriority(event.target.value as ItemPriority);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      // onDragEnd={handleDragEnd}
      className={`item item--${props.status}`}
    >
      <div className="item__header">
        <div className="item__priorityLabel">
          {!isEditing && <>Priority: {props.data.priority}</>}

          {isEditing && 
            <select
              defaultValue={props.data.priority}
              onChange={handlePriorityChange}
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
        {!isEditing && title }

        {isEditing &&
          <input
            type="text"
            className="item__titleInput"
            defaultValue={title}
            onChange={handleTitleChange}
          />
        }
      </div>

      {!isEditing &&
        <p className="item__description">
          {description}
        </p>
      }

      {isEditing &&
        <div>
          <textarea
            className="item__descriptionInput"
            defaultValue={description}
            onChange={handleDescriptionChange}
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