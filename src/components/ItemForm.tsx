import { useRef } from 'react';
import itemTypes from '../data/itemTypes.json';
import itemPriorities from '../data/itemPriorities.json';
import { ItemData, ItemFormData } from '../types';
import Button from './Button';
import './ItemForm.scss';

interface ItemFormProps {
  data?: ItemData;
  submitButtonLabel?: string;
  onSubmit: (a: ItemFormData) => void;
  onCancel: () => void;
}

const ItemForm = (props: ItemFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as ItemFormData;

    props.onSubmit(data);
    event.currentTarget.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      data-testid="itemForm"
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
          defaultValue={props.data?.title}
          data-testid="itemFormTitleInput"
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
          defaultValue={props.data?.description}
          data-testid="itemFormDescriptionInput"
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
          defaultValue={props.data?.type}
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
          defaultValue={props.data?.priority}
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

      <div className="form__element itemForm__buttons">
        <Button
          type="reset"
          modifiers="cancel"
          className="itemForm__button itemForm__button--submit"
          onClick={() => props.onCancel()}
          data-testid="itemFormCancel"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          modifiers="submit"
          className="itemForm__button itemForm__button--submit"
          data-testid="itemFormSubmit"
        >
          {props.submitButtonLabel || 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;