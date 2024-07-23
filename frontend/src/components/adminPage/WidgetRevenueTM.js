import { useEffect, useState } from "react";
import "./admin.css"
import { IoBarChartOutline } from "react-icons/io5";
import SummaryApi from "../../common";
import toast from "react-hot-toast";
import { isThisMonth } from "date-fns";


const WidgetRevenueTM = ({ type }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);


  useEffect(() => {
    fetchAllBooking();
  }, []);

  const fetchAllBooking = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allListBooking.url, {
        method: SummaryApi.allListBooking.method,
        credentials: 'include',
      });


      const dataResponse = await fetchData.json();
      if (dataResponse.success) {

        //filter this month and status booking != pending
        const filteredBookings = dataResponse.data.filter(booking => booking.status !== 'PENDING' && isThisMonth(new Date(booking.date))
      );

        //Sum all total in list booking
        const Revenue = filteredBookings.reduce((totalAll, totalBooking) => totalAll = totalAll + totalBooking.total, 0);
        
        setTotalRevenue(Revenue);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };


  return (
    <div className="widget-part">
      <div className="left">
        <span className="title">REVENUE THIS MONTH</span>
        <span className="counter">{formatCurrency(totalRevenue)} VND</span>
      </div>
      <div className="right">
        <IoBarChartOutline className="iconWidget" />
      </div>
    </div>
  )
}

export default WidgetRevenueTM
