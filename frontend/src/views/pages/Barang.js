
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Input,
} from 'reactstrap';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { toast } from 'react-toastify';

import {
  AddModal,
  EditModal,
  DeleteModal
} from '../modal/ModalBarang';

import {
  fetchBarang,
  fetchJenisBarangOptions,
  addBarang,
  editBarang,
  deleteBarang,
} from '../../api/barang';

const Barang = () => {
  const [editedItem, setEditedItem] = useState(null);
  const [jenisBarangOptions, setJenisBarangOptions] = useState([]);
  const [newItem, setNewItem] = useState({
    nama_barang: '',
    stock: '',
    id_jenis_barang: '',
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState('');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [searchQuery, orderDirection, sort]);

  useEffect(() => {
    fetchJenisBarangOptions()
      .then((options) => {
        setJenisBarangOptions(options);
      })
      .catch((error) => {
        console.error('Error fetching jenis_barang options:', error);
      });
  }, []);

  const fetchData = () => {
    fetchBarang(searchQuery, sort, orderDirection)
      .then((data) => {
        setFilteredData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onNambaBarangSortClick = () => {
    if (sort === 'nama_barang') {
      const newOrderDirection = orderDirection === 'asc' ? 'desc' : 'asc';
      setOrderDirection(newOrderDirection);
    }
    setSort('nama_barang');
  };

  const onJenisBarangClick = () => {
    if (sort === 'jenis_barang') {
      const newOrderDirection = orderDirection === 'asc' ? 'desc' : 'asc';
      setOrderDirection(newOrderDirection);
    }
    setSort('jenis_barang');
  };

  const handleAddNew = () => {
    setNewItem({
      nama_barang: '',
      stock: '',
      id_jenis_barang: '',
    });
    setAddModalOpen(true);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleSaveNew = () => {
    addBarang(newItem)
      .then((response) => {
        toast.success(response.message);
        fetchData();
        setAddModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding new item:', error);
      });
  };

  const handleEdit = (item) => {
    setEditedItem(item);
    setEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };

  const handleSaveEdit = () => {
    editBarang(editedItem.id, editedItem)
      .then((response) => {
        toast.success(response.message);
        fetchData();
        setEditModalOpen(false);
        setEditedItem(null);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteBarang(itemToDelete.id)
        .then((response) => {
          setDeleteModalOpen(false);
            toast.success(response.message);
            fetchData();
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };

  return (
    <>
      <Container className="mt-4" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Barang</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={handleAddNew}
                      size="sm"
                    >
                      Tambah
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-0">
                <div className="px-4 mb-2">
                  <Input
                    placeholder="Cari .."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th className='d-flex gap-2'>Nama Barang 
                        <Button
                          size='sm'
                          className={ `mx-4 ${sort === 'nama_barang' ? 'bg-transparent' : 'bg-transparent'
                            } border-0`}
                          onClick={onNambaBarangSortClick}
                        >
                          
                          {sort === 'nama_barang' && orderDirection === 'asc' && (
                            <FontAwesomeIcon icon={faSortUp} />
                          )}
                          {sort === 'nama_barang' && orderDirection === 'desc' && (
                            <FontAwesomeIcon icon={faSortDown} />
                          )}
                          {sort !== 'nama_barang' && (
                            <FontAwesomeIcon icon={faSortUp} />
                          )}
                        </Button>
                      </th>
                      <th scope="col">Stok</th>
                      <th className='d-flex gap-2'>Nama Barang 
                        <Button
                          size='sm'
                          className={ `mx-4 ${sort === 'jenis_barang' ? 'bg-transparent' : 'bg-transparent'
                            } border-0`}
                          onClick={onJenisBarangClick}
                        >
                          
                          {sort === 'jenis_barang' && orderDirection === 'asc' && (
                            <FontAwesomeIcon icon={faSortUp} />
                          )}
                          {sort === 'jenis_barang' && orderDirection === 'desc' && (
                            <FontAwesomeIcon icon={faSortDown} />
                          )}
                          {sort !== 'jenis_barang' && (
                            <FontAwesomeIcon icon={faSortUp} />
                          )}
                        </Button>
                      </th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama_barang}</td>
                        <td>{item.stock}</td>
                        <td>{item.jenis_barang}</td>
                        <td>
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            Ubah
                          </Button>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleDeleteConfirmation(item)}
                          >
                            Hapus
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <AddModal
        isOpen={addModalOpen}
        toggle={() => setAddModalOpen(!addModalOpen)}
        onSave={handleSaveNew}
        jenisBarangOptions={jenisBarangOptions}
        newItem={newItem}
        handleInputChange={handleNewInputChange}
      />

      <EditModal
        isOpen={editModalOpen}
        toggle={() => setEditModalOpen(!editModalOpen)}
        onSave={handleSaveEdit}
        jenisBarangOptions={jenisBarangOptions}
        editedItem={editedItem}
        handleInputChange={handleEditInputChange}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(!deleteModalOpen)}
        item={itemToDelete}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Barang;
