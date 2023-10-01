
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import Image from '../assets/underC.jpg'

const Index = (props) => {
  const cardBodyStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",   
    minHeight: "300px",      
  };
  return (
    <>
      {/* Page content */}
      <Container className="mt-4" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-white">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Dashboard</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-0" style={cardBodyStyle}>
                <img src={Image} alt="Under Construction" className="img-fluid" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
