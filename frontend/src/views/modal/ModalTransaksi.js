
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
      <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
          <span style={{ fontSize: "16px"}}>Tambah Transaksi</span>
        </ModalHeader>
      <ModalBody>
            <Form>
               <FormGroup>
                 <Label for='nama_barang' className="text-sm">Nama Barang</Label>
                 <Input
                  type='select'
                  name='id_barang'
                  id='id'
                  value={newItem.id_barang}
                  onChange={handleInputChange}
                >
                  <option value=''>Pilih Nama Barang</option>
                  {jenisBarangOptions.map((option) => (
                    <option key={option.id} value={option.id} >
                      {option.nama_barang}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className="text-sm">Jumlah Terjual</Label>
                <Input
                  type='number'
                  name='jumlah_terjual'
                  placeholder='Jumlah terjual'
                  value={newItem.jumlah_terjual}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="text-sm">Tanggal Transaksi</Label>
                <Input
                  type='date'
                  name='tanggal_transaksi'
                  value={newItem.tanggal_transaksi}
                  onChange={handleInputChange}
                />
              </FormGroup>
        </Form>
        <hr className="mt-4 mb-0" />
      </ModalBody>
      <ModalFooter className='mt-0 pt-0'>
        <Button color='primary' onClick={onSave}
          style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
          Simpan
        </Button>{' '}
        <Button color='secondary' onClick={toggle}
          style={{width:"100px",height:"40px",fontSize: "13px", textAlign:"center"}}>
          Batal
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const EditModal = ({ isOpen, toggle, onSave, BarangOptions, editedItem, handleInputChange }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
          <span style={{ fontSize: "16px"}}>Ubah Transaksi</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='jenis_barang' className="text-sm">Nama Barang</Label>
              <Input
                type='select'
                name='id_barang'
                disabled
                id='id'
                onChange={handleInputChange}
              >
                <option value=''>Pilih Nama Barang</option>
                {BarangOptions.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    selected={option.id === (editedItem ? editedItem.id_barang : '')}
                  >
                    {option.nama_barang}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
                 <Input
                    type='number'
                    name='jumlah_terjual'
                    value={editedItem ? editedItem.jumlah_terjual : ''}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type='date'
                    name='tanggal_transaksi'
                    value={editedItem ? editedItem.tanggal_transaksi : ''}
                    onChange={handleInputChange}
                  />
                </FormGroup>
          </Form>
          <hr className="mt-4 mb-0" />
        </ModalBody>
        <ModalFooter className='mt-0 pt-0'>
          <Button color="primary" onClick={onSave}
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

  export const DeleteModal = ({ isOpen, toggle, item, onDelete }) => {
    const handleDelete = () => {
      onDelete(item);
  
      // Close the modal
      toggle();
    };
  
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader className="bg-secondary pt-3 pb-2" style={{textAlign:"center"}} toggle={toggle}>
          <span style={{ fontSize: "16px"}}>Hapus Transaksi</span>
        </ModalHeader>
        <ModalBody>
          Apakah Kamu yakin untuk menghapus "{item?.nama_barang}"?
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
