import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from './Modal';
import Button from './Button';
import { ItemData, ItemStatus } from '../types';
import itemTypes from '../data/itemTypes.json';
import itemPriorities from '../data/itemPriorities.json';
import './CreateItemModal.scss';

interface CreateItemModalProps extends ModalProps {
  onItemAdd: (item: ItemData) => void;
  onCancel: () => void;
};

type ItemFormData = Pick<ItemData, 'title' | 'description' | 'priority' | 'type'>;

const CreateItemModal = (props: CreateItemModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as ItemFormData;
    
    const item: ItemData = {
      id: uuidv4(),
      status: 'open' as ItemStatus,
      ...data,
    };
    
    props.onItemAdd(item);
    event.currentTarget.reset();
  }

  function handleCancelClick() {
    if (formRef.current) {
      formRef.current.reset();
    }

    props.onCancel();
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="createItemModal">
        <div className="createItemModal__title">
          Create new item
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
        >
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
              required
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
              required
            ></textarea>
          </div>

          <label
            htmlFor="type"
            className="form__elementLabel"
          >
            Type
          </label>

          <div className="form__element">
            <select
              id="type"
              name="type"
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

          <label
            htmlFor="priority"
            className="form__elementLabel"
          >
            Priority
          </label>

          <div className="form__element">
            <select
              id="priority"
              name="priority"
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

          <div className="form__element createItemModal__buttons">
            <Button
              modifiers="cancel"
              className="createItemModal__button createItemModal__button--submit"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>

            <Button
              modifiers="submit"
              className="createItemModal__button createItemModal__button--submit"
              type="submit"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateItemModal;