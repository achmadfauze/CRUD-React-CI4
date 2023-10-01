
import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

export const AddModal = ({ isOpen, toggle, onSave, jenisBarangOptions, newItem, handleInputChange }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="bg-primary" toggle={toggle}>Tambah Barang</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label className="text-sm">Nama Barang</Label>
            <Input
              type='text'
              name='nama_barang'
              placeholder='Nama Barang'
              value={newItem.nama_barang}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-sm">Stok</Label>
            <Input
              type='number'
              name='stock'
              placeholder='Stock'
              value={newItem.stock}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-sm">Jenis Barang</Label>
            <Input
              type='select'
              name='id_jenis_barang'
              id='id'
              value={newItem.id_jenis_barang}
              onChange={handleInputChange}
            >
              <option value=''>Pilih jenis_barang</option>
              {jenisBarangOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.jenis_barang}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={onSave}>
          Simpan
        </Button>{' '}
        <Button color='secondary' onClick={toggle}>
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const DeleteModal = ({ isOpen, toggle, item, onDelete }) => {
    const handleDelete = () => {
      onDelete(item);
  
      // Close the modal
      toggle();
    };
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-primary" toggle={toggle}>Hapus Barang</ModalHeader>
        <ModalBody>
          Apakah Kamu yakin untuk menghapus "{item?.nama_barang}"?
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

 export const EditModal = ({ isOpen, toggle, onSave, jenisBarangOptions, editedItem, handleInputChange }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-primary" toggle={toggle}>Ubah Barang</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label className="text-sm">Nama Barang</Label>
              <Input
                type='text'
                name='nama_barang'
                value={editedItem ? editedItem.nama_barang : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label className="text-sm">Stok</Label>
              <Input
                type='number'
                name='stock'
                value={editedItem ? editedItem.stock : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for='jenis_barang' className="text-sm">Jenis Barang</Label>
              <Input
                type='select'
                name='id_jenis_barang'
                id='id'
                onChange={handleInputChange}
              >
                <option value=''>Pilih jenis_barang</option>
                {jenisBarangOptions.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    selected={option.id === (editedItem ? editedItem.id_jenis_barang : '')}
                  >
                    {option.jenis_barang}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSave}>
            Simpan
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
