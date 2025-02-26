import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../../common";
import { format } from 'date-fns';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import SubjectTwoToneIcon from '@mui/icons-material/SubjectTwoTone';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import PetsTwoToneIcon from '@mui/icons-material/PetsTwoTone';
import { Link } from "react-router-dom";

export default function ManageRefund() {
  const [refundList, setRefundList] = useState([]);

  const [data, setData] = useState({
    userName: "",
    petName: "",
    date: "",
    total: "",
    status: "",
  });


  const fetchAllRefund = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allListRefund.url, {
        method: SummaryApi.allListRefund.method,
        credentials: 'include',
      });

      const dataResponse = await fetchData.json();
      if (dataResponse.success) {
        setRefundList(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch refunds");
    }
  };

  useEffect(() => {
    fetchAllRefund();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="manageStaff-component">
      <div className="container-fluid">
        <div className="container">
          <div className="table">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="heading">List Refund</div>
              </div>
              <div className="col-2">
                <img
                  className="table-heading-right"
                  src="assets/imgs/gif-1.gif"
                  alt=""
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>
                    <NumbersTwoToneIcon /> No.
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PetsTwoToneIcon /> Customer's Name
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PetsTwoToneIcon /> Id's Account Banking
                  </th>
                  {/* <th style={{ textAlign: "center" }}>
                    <EventTwoToneIcon /> Date
                  </th> */}
                  <th style={{ textAlign: "center" }}>
                    <EventTwoToneIcon /> Time
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <PaymentsTwoToneIcon /> Total
                  </th>
                  <th style={{ textAlign: "center" }}>
                    <SubjectTwoToneIcon /> Status
                  </th>
                  <th>
                    <SubjectTwoToneIcon /> Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {refundList.map((data, index) => {
                  const date = new Date();
                //   const formattedDate = format(date, 'yyyy-MM-dd');
                  const formattedTime = format(date, 'HH:mm');
                  return (
                    <tr key={data?.userName}>
                      <td style={{ textAlign: "center" }}>{index + 1}</td>
                      <td style={{ textAlign: "center" }}>{data?.holder}</td>
                      <td style={{ textAlign: "center" }}>{data?.bankNumber}</td>
                      {/* <td style={{ textAlign: "center" }}>{formattedDate}</td> */}
                      <td style={{ textAlign: "center" }}>{formattedTime}</td>
                      <td style={{ textAlign: "right" }}>{data?.amount}</td>
                      <td style={{ textAlign: "center" }}>{data?.status}</td>
                      <td style={{ textAlign: "center" }}>{data?.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
