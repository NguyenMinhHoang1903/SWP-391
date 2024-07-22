import "./admin.css"
import { } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Management</h3>
          <ul className="sidebarList">
            <Link to="/manageStaff" className="linkToSlidebar">
              <li className="sidebarListItem">
                Account
              </li>
            </Link>

            <Link to="/managePet" className="linkToSlidebar">
              <li className="sidebarListItem">
                List Pet
              </li>
            </Link>

            {/* <Link to="/manageService" className="linkToSlidebar">
            <li className="sidebarListItem">
              Service
            </li>
            </Link> */}

            {/* <Link to="/listBooking" className="linkToSlidebar">
            <li className="sidebarListItem">
              Booking
            </li>
            </Link> */}

          </ul>
        </div>

      </div>
    </div>
  )
}
