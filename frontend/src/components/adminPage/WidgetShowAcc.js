import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import "./admin.css"
import { LuUserPlus } from "react-icons/lu";


const WidgetShowAcc = () => {
    const [showAccount, setShowAccount] = useState([]);

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: "include",
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                const sortedNewUsers = dataResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setShowAccount(sortedNewUsers.slice(0, 3)); // Get the 3 newest users



            } else if (dataResponse.error) {
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
                <span className="title">NEWEST ACCOUNTS</span>
                <span className='table'>
                        <table>
                            <tbody>
                                {showAccount.map((user, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                                        <td style={{ textAlign: "center" }}>{user.name}</td>
                                        <td style={{ textAlign: "center" }}>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </span>
            </div>
            <div className="right">
                <LuUserPlus className="iconWidget" />
            </div>
        </div>
    );
}

export default WidgetShowAcc
