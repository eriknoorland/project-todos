import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ItemData, ItemStatus } from '../types';
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

export default Item;