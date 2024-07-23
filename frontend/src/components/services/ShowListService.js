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
                    style={{ width: "19.2rem", height: "38rem" }}
                  >
                    <Card.Img
                      variant="top"
                      style={{ width: "100%", height: "14rem" }}
                      src={data.imageUrl}
                      className="card-img"
                    />
                    <Card.Body >
                      <Card.Title style={{ width: "100%", height: "1.5rem" }}>{data.name}</Card.Title>
                      <h5>Price:</h5>
                      <Card.Text style={{ width: "100%", height: "5rem" }}>{data.priceByWeight.map((value) => (
                        <div key={value} className="row">
                          <div className="col-7"> {formattedPrice(value.price)} VND</div>
                          <div className="col-5">{formattedPrice(value.weight)} KG</div>
                        </div>
                      ))}</Card.Text>
                      <Card.Text style={{ width: "100%" }}>
                        Rating: {Math.round(data.rating * 100) / 100}/5 - {data.ratingNumber} Votes
                      </Card.Text>
                      <Card.Text style={{ width: "100" }}>
                        {data.desc}
                      </Card.Text>
                      <a href={data.path} className="loginContainer btnBooking">
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
