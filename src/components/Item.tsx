import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ItemData, ItemStatus } from '../types';
import ItemEditForm from './ItemEditForm';
import './Item.scss';

interface ItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ItemData;
  status: ItemStatus;
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

  function handleEditSave(item: ItemData) {
    props.onItemEdit(item);
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
        item--${props.status}
        ${isGrabbing ? 'item--is_grabbing' : ''}
      `}
    >
      {isEditing ?
        <ItemEditForm
          data={props.data}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      :
        <>
          <div className="item__title">
            {props.data.title}
          </div>

          <p className="item__description">
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
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>

              <span
                className="item__deleteAction"
                onClick={handleDeleteClick}
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