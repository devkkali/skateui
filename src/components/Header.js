import NepaliDate from "nepali-date-converter";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {

    let navigate = useNavigate();

    let nepali = new NepaliDate();
    NepaliDate.language = 'np';
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let englishDate = new Date();

    const [time, setTime] = useState(englishDate);

    useEffect(() => {
        setInterval(() => {
            englishDate = new Date();
            setTime(englishDate);
        }, 1000);
    }, []);


    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }





    return (
        <>
            {/* start header menu (extract it as component) */}
            <div className="menu container-xxl bg-white d-flex align-items-center">
                <div className="menu-item">
                    <span className="menu-name">App</span>
                    <div className="dropdown-container">
                        <div className="menu-dropdown">
                            <ul className="list-unstyled">
                                {/* <li className="menu-option"><span>Change Password</span></li> */}
                                <li onClick={Logout} className="menu-option"><span>Log Out</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <span className="menu-name">Transaction</span>
                    <div className="dropdown-container">
                        <div className="menu-dropdown">
                            <ul className="list-unstyled">
                                <li className="menu-option"><a target="_blank" href="/">Parking In</a></li>
                                <li className="menu-option"><a target="_blank" href="parking-out">Parking Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <span className="menu-name">Membership</span>
                    <div className="dropdown-container">
                        <div className="menu-dropdown">
                            <ul className="list-unstyled">
                                <li className="menu-option"><a target="_blank" href="membership">Add Clients</a></li>
                                <li className="menu-option"><a target="_blank" href="membership-users">Membership Clients</a></li>
                                <li className="menu-option"><a target="_blank" href="package-users">Packages Clients</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <span className="menu-name">Report</span>
                    <div className="dropdown-container">
                        <div className="menu-dropdown">
                            <ul className="list-unstyled">
                                <li className="menu-option"><a target="_blank" href="parking-report">Parking Report</a></li>
                                <li className="menu-option"><a target="_blank" href="sales-report">Sales Report</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <span className="menu-name">Tools</span>
                    <div className="dropdown-container">
                        <div className="menu-dropdown">
                            <ul className="list-unstyled">
                                <li className="menu-option"><a target="_blank" href="setting">Card Settings</a></li>
                                <li className="menu-option"><a target="_blank" href="membership-types">Membership Type</a></li>
                                <li className="menu-option"><a target="_blank" href="package-types">package Type</a></li>
                                <li className="menu-option"><a target="_blank" href="user-management">User Management</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="date fw-bolder small ms-auto">
                    <span>
                        {englishDate.getFullYear() + '/' + (englishDate.getMonth() + 1) + '/' + englishDate.getDate() + ',' + weekday[englishDate.getDay()]}
                        {/* 2021/11/08, Wednesday */}
                    </span>
                    <span className="fst-italic fw-normal ms-2">
                        {/* {nepali} */}
                        ( {nepali.format('DD MMMM YYYY')} )
                        {/* ( 22 Mangsir 2078 ) */}
                    </span>
                    <span className="mx-2">
                        {/* {minutes === 0 && seconds === 0 ? null : <h1> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                        } */}
                        {/* {englishDate.getHours +':'} */}
                        {time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
                        {/* 08 : 48 PM */}
                    </span>
                </div>
            </div>
            {/* end header menu */}
        </>
    )
}
export default Header