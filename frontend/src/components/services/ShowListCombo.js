import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function ShowListCombo() {
  const [combos, setCombos] = useState([]);

  // Get all combo from database
  const fetchData = async () => {
    let isFetched = true;
    await fetch("http://localhost:5000/api/combos/read")
      .then((res) => res.json())
      .then((json) => {
        if (isFetched) {
          const combosWithStatus = json.map((combo) => {
            const currentDate = new Date();
            const startDate = new Date(combo.startDate);
            const endDate = new Date(combo.endDate);

            let status = "Processing";
            if (currentDate < startDate) status = "Soon";
            else if (currentDate > endDate) status = "Expired";

            return { ...combo, status };
          });

          setCombos(combosWithStatus);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isFetched = false;
    };
  };

  // Currency functions
  const formattedPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  // Start fetching all service
  useEffect(() => {
    let isFetched = true;
    if (isFetched) fetchData();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <div className="showServiceCombo-component">
      <section id="listServiceCombo" className="showServiceCombo">
        <Container fluid>
          <div className="text-center p-4">
            <h2>List Combo Spa</h2>
          </div>
          <Row>
            {combos.map((data, index) => (
              <Col sm={4} key={data._id}>
                <div className="listService">
                  <Card style={{ width: "19.2rem", height: "35rem" }}>
                    <Card.Img
                      variant="top"
                      style={{ width: "100%" }}
                      src={data.imageUrl}
                      className="card-img"
                    />

                    <Card.Body>
                      <Card.Title style={{ width: "100%", height: "1.5rem" }}>
                        {data.name}
                      </Card.Title>
                      <Card.Text style={{ width: "100%", height: "1rem" }}>
                        Price: {formattedPrice(data.price)} VND
                      </Card.Text>
                      <Card.Text style={{ width: "100%", height: "1rem" }}>
                        Rating: {Math.round(data.rating * 100) / 100}/5 - {data.ratingNumber} Votes
                      </Card.Text>
                      <Card.Text style={{ width: "100%", height: "8rem" }}>
                        Description: <br/>
                        {data.desc}
                      </Card.Text>
                      <a href="/booking" className="loginContainer btnBooking">
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
