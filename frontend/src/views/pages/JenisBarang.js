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
import { toast } from 'react-toastify';
import { fetchJenisBarang, addJenisBarang, editJenisBarang, deleteJenisBarang } from '../../api/jenisbarang';
import {
  AddModal,
  EditModal,
  DeleteModal
} from '../modal/ModalKategory';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'components/pagination/pagination';


const JenisBarang = () => {
  const [editedItem, setEditedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    jenis_barang: '',
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState('');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [deleteModal, setModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchData = () => {
    fetchJenisBarang(searchQuery, sort, orderDirection,currentPage,perPage)
      .then((data) => {
        setFilteredData(data.data);
        setTotalPages(data.pagination.total_pages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, orderDirection, sort,currentPage,perPage]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onJenisBarangClick = () => {
    if (sort === 'jenis_barang') {
      const newOrderDirection = orderDirection === 'asc' ? 'desc' : 'asc';
      setOrderDirection(newOrderDirection);
    }
    setSort('jenis_barang');
  };

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModalEdit(!modalEdit);
  const toggleDeleteModal = () => setModalDelete(!deleteModal);

  const handleEdit = (item) => {
    setEditedItem(item);
    toggle2();
  };

  const handleSaveEdit = () => {
    const updatedItemData = {
      jenis_barang: editedItem.jenis_barang,
    };
    editJenisBarang(editedItem.id, updatedItemData)
      .then((message) => {
        toggle2();
        fetchData();
        toast.success(message);
        setEditedItem(null);
      })
      .catch((error) => {
        console.error('Error updating item:', error);
      });
  };

  const handleAddNew = () => {
    setNewItem({
      jenis_barang: '',
    });
    toggle();
  };

  const handleNewInputChange = (e) => {
    setNewItem({
      ...newItem,
      jenis_barang: e.target.value,
    });
  };

  const handleSaveNew = () => {
    addJenisBarang(newItem)
      .then((message) => {
        fetchData();
        toast.success(message);
        toggle();
      })
      .catch((error) => {
        console.error('Error adding new item:', error);
      });
  };

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
    toggleDeleteModal();
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteJenisBarang(itemToDelete.id)
      .then((message) => {
        toggleDeleteModal(); 
        // if(response.status==200){
            toast.success(message);
            fetchData();
        // }
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
        });
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginations = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",     
  };
  return (
    <Container className="mt-4" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-white">
              <Row className="align-items-center">
                <Col xs="7">
                  <h3 className="mb-0">Jenis Barang</h3>
                </Col>
                <Col className="text-right" xs="5">
                  <Button
                    color="primary"
                    style={{width:"80px",height:"30px",fontSize: "12px", textAlign:"center"}}
                    onClick={handleAddNew}
                    size="sm"
                  >
                    Tambah
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="px-0">
              <div className="px-4 mb-2 d-flex">
                <Input
                  className='mr-2'
                  style={{width:"70px",height:"36px",fontSize: "12px"}}
                  type='select'
                  onChange={(e) => setPerPage(parseInt(e.target.value))}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </Input>
                  <Input
                    style={{height:"36px",fontSize: "12px"}}
                    placeholder="Cari .."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th >Jenis Barang 
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
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{(currentPage - 1) * perPage + index + 1}</td>
                      <td>{item.jenis_barang}</td>
                      <td>
                        <Button color="secondary" size="sm" onClick={() => handleEdit(item)}>Ubah</Button>
                        <Button color="danger" size="sm" onClick={() => handleDeleteConfirmation(item)}>Hapus</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr className="mt-3" />
              <div className='py-0' style={paginations}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </Row>
      <AddModal
        isOpen={modal}
        toggle={toggle}
        handleSaveNew={handleSaveNew}
        handleNewInputChange={handleNewInputChange}
        newItem={newItem}
      />
      <EditModal
        isOpen={modalEdit}
        toggle={toggle2}
        handleSaveEdit={handleSaveEdit}
        handleEditInputChange={(e) =>
          setEditedItem({
            ...editedItem,
            jenis_barang: e.target.value,
          })
        }
        editedItem={editedItem}
      />
      <DeleteModal
        isOpen={deleteModal}
        toggle={toggleDeleteModal}
        handleDelete={handleDelete}
        itemToDelete={itemToDelete}
      />
    </Container>
  );
};

export default JenisBarang;

