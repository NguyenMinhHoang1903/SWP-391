import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function ShowListService() {
  const [services, setServices] = useState([]);

  // Get all service from database
  const fetchData = async () => {
    await fetch("http://localhost:5000/api/services/read")
      .then((res) => res.json())
      .then((json) => setServices(json))
      .catch((err) => console.log(err));
  };

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleNameLink = (name) => {
    if(name === "Cut nails") return '/cutnailservice';
    if(name === "Hair dye") return '/hairdyeservice';
    if(name === "Trim fur") return '/trimfurservice';
    if(name === "Washing body") return '/washingservice';
    return '/booking';
  }

  // Start fetching all service
  useEffect(() => {
    let isFetched = true;
    if (isFetched) {
      fetchData();
    }
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <div className="showServiceCombo-component">
      <section id="listServiceCombo" className="showServiceCombo">
        <Container fluid>
          <div className="text-center p-4">
            <h2>List Service Spa</h2>
          </div>
          <Row>
            {services.map((data, index) => (
              <Col sm={3} key={data._id}>
                <div className="listService">
                  <Card
                    className="card"
                    style={{ width: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ width: "100%"}}
                      src={data.imageUrl}
                      className="card-img"
                    />
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Text>{data.priceByWeight.map((value) => (
                        <div key={value} >{formattedPrice(value.price)} VND</div>
                      ))}</Card.Text>
                      <Card.Text style={{ width: "16rem", height: "7rem" }}>
                        {data.desc}
                      </Card.Text>
                      <a href={handleNameLink(data.name)} className="loginContainer btnBooking">
                        Booking
                      </a>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
