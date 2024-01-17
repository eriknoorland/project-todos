import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ItemData, ItemStatus } from '../types';
import itemTypes from '../data/itemTypes.json';
import itemPriorities from '../data/itemPriorities.json';
import './Item.scss';

interface ItemProps {
  data: ItemData;
  status: ItemStatus;
  className?: string;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

const Item = (props: ItemProps) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(props.data);

  const priorityIcon = {
    low: faArrowDown,
    medium: faArrowUp,
    high: faArrowUp,
  };

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('itemId', props.data.id);
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

  function handleCancelClick() {
    setEditData(props.data);
    setIsEditing(false);
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
        ${props.className}
        item
        item--${props.status}
        ${isGrabbing ? 'item--is_grabbing' : ''}
      `}
    >
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

      <div className="item__footer">
        <div className="item__footerLabels">
          {!isEditing &&
            <div className="item__typeLabel">
              {editData.type}
            </div>
          }

          {isEditing &&
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
          }

          <div className="item__priorityLabel">
            {!isEditing &&
              <div className="item__priorityIconWrapper">
                <FontAwesomeIcon
                  icon={priorityIcon[editData.priority]}
                  className={`
                    item__priorityIcon
                    item__priorityIcon--${editData.priority}
                  `}
                />
              </div>
            }

            {isEditing && 
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
            }
          </div>
        </div>

        <div className="item__actions">
          {!isEditing &&
            <span
              className="item__editAction"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
          }

          <span
            className="item__deleteAction"
            onClick={handleDeleteClick}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </div>

      {isEditing &&
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
      }
    </div>
  );
};

export default Item;