import { useState } from 'react';
import { ItemData } from './interfaces';
import { ItemStatus } from './types';
import './Item.scss';

interface ItemProps {
  data: ItemData;
  status: ItemStatus;
  onItemEdit: (item: ItemData) => void;
};

export default (props: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
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

  function handleSaveClick() {
    // FIXME send up to app component
    const editedItem = {
      ...props.data,
      title,
      description,
    };

    props.onItemEdit(editedItem);
    setIsEditing(false);
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
      className={`
        item
        item--${props.status}
        ${isEditing ? 'item--is_editing' : ''}
      `}
    >
      {!isEditing &&
        <div
          className="item__editLink"
          onClick={handleEditClick}
        >
          edit
        </div>
      }

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