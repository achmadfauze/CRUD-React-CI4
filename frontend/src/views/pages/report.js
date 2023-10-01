
import {useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Input, FormGroup,
} from "reactstrap";
import { getReportData } from '../../api/report';

const Report = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({
    tanggalAwal: '',
    tanggalAkhir: '',
  });

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handlePrintShow = () => {
    getReportData(newItem.tanggalAwal, newItem.tanggalAkhir)
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching report data:', error);
      });
  };
  return (
    <>
      {/* <Header /> */}
      <Container className="mt-4" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white ">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Laporan</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-4">
                <Row className="justify-content-evenly ">
                    <Col lg={4}>
                    <FormGroup>
                        <Input
                        type='date'
                        name='tanggalAwal'
                        value={newItem.tanggalAwal}
                        onChange={handleNewInputChange}
                        />
                    </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Input
                            type='date'
                            name='tanggalAkhir'
                            value={newItem.tanggalAkhir}
                            onChange={handleNewInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <Button className='border-0' color="primary" onClick={handlePrintShow}>Print</Button>
                    </Col>      
                </Row>
                <hr className="mt-sm-2"/>
                <div className='pt-0'>
                {data && (
                    <div>
                    {Object.keys(data).map((key) => (
                        <div key={key}>
                        <h5 style={{color : '#5856d6'}}>{key}</h5>
                        {/* <p className='mb-0'>Jenis Barang: {data[key].jenis_barang}</p>
                        <p>Total Terjual: {data[key].total_terjual}</p> */}
                        {data[key] ? (
                            <>
                            <h5 className='mb-0' >Jenis Barang: {data[key].jenis_barang}</h5>
                            <h5>Total Terjual: {data[key].total_terjual}</h5>
                            </>
                        ) : (
                            <h5>Transaksi tidak ditemukan.</h5>
                        )}
                        </div>
                    ))}
                    </div>
                )}
                </div>
              
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Report;
