
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

export const AddModal = ({ isOpen, toggle, handleSaveNew, handleNewInputChange, newItem }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
        <span style={{ fontSize: "16px"}}>Tambah Jenis Barang</span>
      </ModalHeader>
      <ModalBody>
        <Input
          placeholder='Jenis Barang'
          value={newItem.jenis_barang}
          onChange={handleNewInputChange}
        />
        <hr className="mt-4 mb-0" />
      </ModalBody>
      <ModalFooter className='mt-0 pt-0'>
        <Button color="primary" onClick={handleSaveNew}
          style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
          Simpan
        </Button>{' '}
        <Button color="secondary" onClick={toggle}
          style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const EditModal = ({ isOpen, toggle, handleSaveEdit, handleEditInputChange, editedItem }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
          <span style={{ fontSize: "16px"}}>Ubah Jenis Barang</span>
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Jenis Barang"
            value={editedItem ? editedItem.jenis_barang : ''}
            onChange={handleEditInputChange}
          />
          <hr className="mt-4 mb-0" />
        </ModalBody>
        <ModalFooter className='mt-0 pt-0'>
          <Button size="" color="primary" onClick={handleSaveEdit}
            style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
            Simpan
          </Button>{' '}
          <Button color="secondary" onClick={toggle}
            style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  export const DeleteModal = ({ isOpen, toggle, handleDelete, itemToDelete }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
          <span style={{ fontSize: "16px"}}>Hapus Jenis Barang</span>
        </ModalHeader>
        <ModalBody>
          Apakah Anda yakin untuk menghapus "{itemToDelete?.jenis_barang}"?
          <hr className="mt-4 mb-0" />
        </ModalBody>
        <ModalFooter className='mt-0 pt-0'>
          <Button color="danger" onClick={handleDelete}
            style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
            Hapus
          </Button>{' '}
          <Button color="secondary" onClick={toggle}
            style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
