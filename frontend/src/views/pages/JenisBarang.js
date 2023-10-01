
// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardHeader,
//   Table,
//   Container,
//   Row,
//   Col,
//   Button,
//   CardBody,
//   Input,
//   Modal,
//   ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Form 
// } from "reactstrap";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const JenisBarang = () => {
//     const [editedItem, setEditedItem] = useState(null);
//     const [newItem, setNewItem] = useState({
//       jenis_barang: '',
//     });
//     const [itemToDelete, setItemToDelete] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredData, setFilteredData] = useState([]);
//     const [sort, setSort] = useState('');
//     const [orderDirection, setOrderDirection] = useState('desc');
  
//     const fetchData = async () => {
//       try {
//         const requestData = {
//           search: {
//             column: ["jenis_barang"],
//             value: searchQuery,
//           },
//           order: 
//             {
//               column: sort,
//               dir: orderDirection,
//             }
        
//         };
  
//         const response = await axios.get(`http://localhost:8080/jenisbarang?searchValue=${searchQuery}&searchColumn[0]=id&searchColumn[1]=jenis_barang&orderColumn=${requestData.order.column}&orderDir=${requestData.order.dir}`);
  
  
//         setFilteredData(response?.data?.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchData();
//     }, [searchQuery,orderDirection,sort]);
  
//     const handleSearchInputChange = (e) => {
//       setSearchQuery(e.target.value);
//     };
  
//     const onJenisBarangClick = () => {
//       if (sort === 'jenis_barang') {
//         const newOrderDirection = orderDirection === 'asc' ? 'desc' : 'asc';
//       setOrderDirection(newOrderDirection);
//       }
//       setSort('jenis_barang');
//     }
  
//     const [modal, setModal] = useState(false);
//     const toggle = () => setModal(!modal);
  
//     const [modalEdit, setModalEdit] = useState(false);
//     const toggle2 = () => setModalEdit(!modalEdit);
    
//     const [deleteModal, setModalDelete] = useState(false);
//     const toggleDeleteModal = () => setModalDelete(!deleteModal);
  
//     const handleEdit = (item) => {
//       setEditedItem(item);
//       toggle2(); 
//     };
  
//     const handleSaveEdit = () => {
//       const updatedItemData = {
//         jenis_barang: editedItem.jenis_barang,
//       };
//       axios
//         .put(`http://localhost:8080/jenisbarang/${editedItem.id}`, updatedItemData)
//         .then((response) => {
//           toggle2(); 
//           fetchData();
//           toast.success(response.data.message);
//           setEditedItem(null);
//         })
//         .catch((error) => {
//           console.error('Error updating item:', error);
//         });
//     };
    
//     const handleAddNew = () => {
//       setNewItem({
//         jenis_barang: '', 
//       });
//       toggle(); 
//     };
  
//     const handleNewInputChange = (e) => {
//       setNewItem({
//         ...newItem,
//         jenis_barang: e.target.value,
//       });
//     };
    
//     const handleSaveNew = () => {
//       axios
//         .post('http://localhost:8080/jenisbarang', newItem)
//         .then((response) => {
//           fetchData();
//           toast.success(response.data.message);
//           toggle();
//         })
//         .catch((error) => {
//           console.error('Error adding new item:', error);
//         });
//     };
  
//     const handleDeleteConfirmation = (item) => {
//       setItemToDelete(item);
//       toggleDeleteModal();
//     };
  
//     const handleDelete = () => {
//       if (itemToDelete) {
        
//         axios
//           .delete(`http://localhost:8080/jenisbarang/${itemToDelete.id}`)
//           .then((response) => {
//             toggleDeleteModal(); 
//             if(response.status==200){
//               toast.success(response.data.message);
//               fetchData();
//             }
//           })
//           .catch((error) => {
//             console.error('Error deleting item:', error);
//           });
//       }
//     };
//   return (
//     <>
//       {/* <Header /> */}
//       <Container className="mt-4" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow">
//               <CardHeader className="bg-white ">
//                 <Row className="align-items-center">
//                   <Col xs="8">
//                     <h3 className="mb-0">Jenis Barang</h3>
//                   </Col>
//                   <Col className="text-right" xs="4">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={handleAddNew}
//                       size="sm"
//                     >
//                       Tambah
//                     </Button>
//                   </Col>
//                 </Row>
//               </CardHeader>
//               <CardBody className="px-0">
//                   <div className='px-4 mb-2'>
//                     <Input
//                         placeholder='Cari ..'
//                         value={searchQuery}
//                         onChange={handleSearchInputChange}
//                       />
//                     {/* <Button  style={{width:"300px"}} className={`${sort === 'nama_barang' ? 'bg-primary' : 'bg-secondary'} border-0`} onClick={onNambaBarangSortClick}>
//                       Nama barang {sort === 'nama_barang' && orderDirection}
//                     </Button>
//                     <Button style={{width:"400px"}} className={`${sort === 'jenis_barang' ? 'bg-primary' : 'bg-secondary'} border-0`} onClick={onJenisBarangClick}>
//                       Jenis Barang {sort === 'jenis_barang' && orderDirection}
//                     </Button> */}
//                   </div>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                     <tr>
//                     <th>No</th>
//                     <th>Jenis Barang</th>
//                     <th>Aksi</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {filteredData.map((item, index) => (
//                     <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{item.jenis_barang}</td>
//                       <td>
//                         <Button color="secondary" size="sm" onClick={() => handleEdit(item)}>Ubah</Button>
//                         <Button color="danger" size="sm" onClick={() => handleDeleteConfirmation(item)}>Hapus</Button>
//                       </td>
//                     </tr>
//                   ))}
                  
//                 </tbody>
//               </Table>
              
//               </CardBody>
//             </Card>
//           </div>
//         </Row>
//         <Modal isOpen={modal} toggle={toggle}>
//             <ModalHeader className="bg-primary" toggle={toggle}>Tambah Jenis Barang</ModalHeader>
//             <ModalBody>
//                 <Input
//                 placeholder='Jenis Barang'
//                 value={newItem.jenis_barang}
//                 onChange={handleNewInputChange}
//                 />
//             </ModalBody>
//             <ModalFooter>
//                 <Button color="primary" onClick={handleSaveNew}>
//                 Simpan
//                 </Button>{' '}
//                 <Button color="secondary" onClick={toggle}>
//                 Batal
//                 </Button>
//             </ModalFooter>
//         </Modal>


//         <Modal isOpen={modalEdit} toggle={toggle2}>
//             <ModalHeader className="bg-primary" toggle={toggle2}>Ubah Jenis Barang</ModalHeader>
//             <ModalBody>
//                 <Input
//                 placeholder="Jenis Barang"
//                 value={editedItem ? editedItem.jenis_barang : ''}
//                 onChange={(e) =>
//                     setEditedItem({
//                     ...editedItem,
//                     jenis_barang: e.target.value,
//                     })
//                 }
//                 />
                

//             </ModalBody>
//             <ModalFooter className="mt-0">
//                 <Button size="" color="primary" onClick={handleSaveEdit}>
//                 Simpan
//                 </Button>{' '}
//                 <Button color="secondary" onClick={() => { toggle2(); setEditedItem(null); }}>
//                 Batal
//                 </Button>
//             </ModalFooter>
//         </Modal>

//         <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
//             <ModalHeader className="bg-primary" toggle={toggleDeleteModal}>Hapus Jenis Barang</ModalHeader>
//             <ModalBody>
//                 Apakah Kamu yakin untuk menghapus "{itemToDelete?.jenis_barang}"?
//             </ModalBody>
//             <ModalFooter>
//                 <Button color="danger" onClick={handleDelete}>
//                 Hapus
//                 </Button>{' '}
//                 <Button color="secondary" onClick={toggleDeleteModal}>
//                 Batal
//                 </Button>
//             </ModalFooter>
//         </Modal>
//       </Container>
//     </>
//   );
// };

// export default JenisBarang;

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

  const fetchData = async () => {
    try {
      const data = await fetchJenisBarang(searchQuery, sort, orderDirection);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery, orderDirection, sort]);

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

  return (
    <Container className="mt-4" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="bg-white">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Jenis Barang</h3>
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
                    <th>No</th>
                    <th className='d-flex gap-2'>Jenis Barang 
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
                      <td>{index + 1}</td>
                      <td>{item.jenis_barang}</td>
                      <td>
                        <Button color="secondary" size="sm" onClick={() => handleEdit(item)}>Ubah</Button>
                        <Button color="danger" size="sm" onClick={() => handleDeleteConfirmation(item)}>Hapus</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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

