
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

export const AddModal = ({ isOpen, toggle, handleSaveNew, handleNewInputChange, newItem }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-primary" toggle={toggle}>
        Tambah Jenis Barang
      </ModalHeader>
      <ModalBody>
        <Input
          placeholder='Jenis Barang'
          value={newItem.jenis_barang}
          onChange={handleNewInputChange}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSaveNew}>
          Simpan
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const EditModal = ({ isOpen, toggle, handleSaveEdit, handleEditInputChange, editedItem }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-primary" toggle={toggle}>
          Ubah Jenis Barang
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Jenis Barang"
            value={editedItem ? editedItem.jenis_barang : ''}
            onChange={handleEditInputChange}
          />
        </ModalBody>
        <ModalFooter className="mt-0">
          <Button size="" color="primary" onClick={handleSaveEdit}>
            Simpan
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  export const DeleteModal = ({ isOpen, toggle, handleDelete, itemToDelete }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-primary" toggle={toggle}>
          Hapus Jenis Barang
        </ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk menghapus "{itemToDelete?.jenis_barang}"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Hapus
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
