import { useEffect, useState } from "react";
import "./admin.css"
import { FaRegUser } from "react-icons/fa";
import SummaryApi from "../../common";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const WidgetAccount = ({ type }) => {
    const [countAccount, setCountAccount] = useState(0);

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: "include",
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setCountAccount(dataResponse.data.length);
            }

            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch account users");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);



    return (
        <div className="widget-part">
            <div className="left">
                <span className="title">ACCOUNTS</span>
                <span className="counter">{countAccount} </span>
                <Link to="/manageStaff" className="linkWidget">
                <span className="">See all users</span>
                </Link>
            </div>
            <div className="right">
                <FaRegUser className="iconWidget" />
            </div>
        </div>
    )
}

export default WidgetAccount
