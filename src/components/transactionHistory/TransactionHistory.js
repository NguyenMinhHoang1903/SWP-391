import React from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TransactionHistory() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <>
      <div className="transactionHistory-component">
        <Container>
          <div className="heading">
            <video src="assets/videos/video-6.webm" autoPlay muted loop></video>
            <div className="heading-title">Transaction History</div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}
