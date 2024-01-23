import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from './Modal';
import ItemForm from './ItemForm';
import { ItemData, ItemFormData, ItemStatus } from '../types';
import './CreateItemModal.scss';

interface CreateItemModalProps extends ModalProps {
  onItemAdd: (item: ItemData) => void;
  onCancel: () => void;
};

const CreateItemModal = (props: CreateItemModalProps) => {
  function handleSubmit(formData: ItemFormData) {
    const item: ItemData = {
      id: uuidv4(),
      status: 'open' as ItemStatus,
      ...formData,
    };
    
    props.onItemAdd(item);
  }

  function handleCancel() {
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

        <ItemForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </Modal>
  );
};

export default CreateItemModal;