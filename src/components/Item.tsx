import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ItemData, ItemFormData } from '../types';
import ItemForm from './ItemForm';
import './Item.scss';

interface ItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ItemData;
  onItemEdit: (item: ItemData) => void;
  onItemDelete: (item: ItemData) => void;
};

const Item = (props: ItemProps) => {
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const priorityIcon = {
    low: faArrowDown,
    medium: faArrowUp,
    high: faArrowUp,
  };

  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.setData('itemId', props.data.id);
    setIsGrabbing(true);
  }

  function handleDragEnd() {
    setIsGrabbing(false);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleDeleteClick() {
    props.onItemDelete(props.data);
  }

  function handleEditSubmit(formData: ItemFormData) {
    props.onItemEdit({
      ...props.data,
      ...formData,
    });
    setIsEditing(false);
  }

  function handleEditCancel() {
    setIsEditing(false);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        ${props.className}
        item
        item--${props.data.status}
        ${isGrabbing ? 'item--is_grabbing' : ''}
      `}
      data-testid="item"
    >
      {isEditing ?
        <ItemForm
          data={props.data}
          submitButtonLabel="Save"
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
        />
      :
        <>
          <div
            className="item__title"
            data-testid="itemTitle"
          >
            {props.data.title}
          </div>

          <p
            className="item__description"
            data-testid="itemDescription"
          >
            {props.data.description}
          </p>

          <div className="item__footer">
            <div className="item__footerLabels">
              <div className="item__typeLabel">
                {props.data.type}
              </div>

              <div className="item__priorityLabel">
                <div className="item__priorityIconWrapper">
                  <FontAwesomeIcon
                    icon={priorityIcon[props.data.priority]}
                    className={`
                      item__priorityIcon
                      item__priorityIcon--${props.data.priority}
                    `}
                  />
                </div>
              </div>
            </div>

            <div className="item__actions">
              <span
                className="item__editAction"
                onClick={handleEditClick}
                data-testid="itemEditButton"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>

              <span
                className="item__deleteAction"
                onClick={handleDeleteClick}
                data-testid="itemDeleteButton"
              >
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Item;