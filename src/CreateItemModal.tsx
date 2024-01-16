import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from './Modal';
import Button from './Button';
import { ItemData } from './interfaces';
import { ItemStatus } from './types';
import './CreateItemModal.scss';

interface CreateItemModalProps extends ModalProps {
  onItemAdd: (item: ItemData) => void;
  onCancel: () => void;
};

type ItemFormData = Pick<ItemData, 'title' | 'description' | 'priority'>;

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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
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