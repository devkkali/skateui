import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import requests from "../helpers/Requests";
import SettingEditPopup from "./SettingEditPopup";
import { useNavigate } from "react-router-dom";

function Setting(props) {
    let navigate = useNavigate();

    const [FirstIntervalCost, setFirstIntervalCost] = useState(0);
    const [IncrementCost, setIncrementCost] = useState(0);
    const [SockCost, setSockCost] = useState(0);
    const [WaterCost, setWaterCost] = useState(0);
    const [FirstIntervaltime, setFirstIntervalTime] = useState(0);
    const [AdditionalTime, setAdditionTime] = useState(0);
    const [IsBill, setIsBill] = useState(0);
    const [IsBillLoading, setIsBillLoading] = useState(false);
    const [IsSettingPop, setIsSettingPop] = useState(false);

    const [EditPopTitle, setEditPopTitle] = useState("");
    const [ToEdit, setToEdit] = useState("");
    const [ToEditValue, setToEditValue] = useState("");


    useEffect(() => {
        axios.get(requests.get_all_settings, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setFirstIntervalCost(res.data.details.first_interval_cost[0]);
                setIncrementCost(res.data.details.increment_cost[0]);
                setSockCost(res.data.details.sock_cost[0]);
                setWaterCost(res.data.details.water_cost[0]);
                setFirstIntervalTime(res.data.details.first_interval_time[0]);
                setAdditionTime(res.data.details.additional_time[0]);
                if (res.data.details.isbill[0] === '0') {
                    setIsBill(false);
                } else {
                    setIsBill(true);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const Onqrclick = () => {
        navigate("/qrprint");

    }
    const OnDownloadApp = () => {
        axios({
            url: requests.downloadapk,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'skatepark.apk'); //or any other extension
             document.body.appendChild(link);
             link.click();
          });

    }


    const OnChangeIsBill = () => {
        setIsBillLoading(true);
        axios.get(requests.switch_isbill, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.data.details.value === "0") {
                    setIsBill(false);
                } else {
                    setIsBill(true);
                }
                setIsBillLoading(false);
            })
            .catch(error => {
                setIsBillLoading(false);
            })
    }

    const setValue = (value) => {
        if (ToEdit === 'first_interval_cost') {
            setFirstIntervalCost(value);
        } else if (ToEdit === 'increment_cost') {
            setIncrementCost(value);
        } else if (ToEdit === 'sock_cost') {
            setSockCost(value);
        } else if (ToEdit === 'water_cost') {
            setWaterCost(value);
        } else if (ToEdit === 'first_interval_time') {
            setFirstIntervalTime(value);
        } else if (ToEdit === 'additional_time') {
            setAdditionTime(value);
        } else {
            alert(value);
        }
    }

    const editFirstIntervalCostPop = () => {
        setEditPopTitle("First Interval Cost");
        setToEdit('first_interval_cost');
        setToEditValue(FirstIntervalCost);
        setIsSettingPop(true);
    }
    const editIncrementalCostPop = () => {
        setEditPopTitle("Increment Cost");
        setToEdit('increment_cost');
        setToEditValue(IncrementCost);
        setIsSettingPop(true);
    }
    const editSockCostPop = () => {
        setEditPopTitle("Sock Cost");
        setToEdit('sock_cost');
        setToEditValue(SockCost);
        setIsSettingPop(true);
    }
    const editWaterCostPop = () => {
        setEditPopTitle("Water Cost");
        setToEdit('water_cost');
        setToEditValue(WaterCost);
        setIsSettingPop(true);
    }
    const editFirstIntervalTimePop = () => {
        setEditPopTitle("First Interval Time");
        setToEdit('first_interval_time');
        setToEditValue(FirstIntervaltime);
        setIsSettingPop(true);
    }
    const editAdditionalTimePop = () => {
        setEditPopTitle("Additional Time");
        setToEdit('additional_time');
        setToEditValue(AdditionalTime);
        setIsSettingPop(true);
    }


    return (
        <>

            <SettingEditPopup trigger={IsSettingPop} setIsSettingPop={setIsSettingPop} Title={EditPopTitle} value={ToEditValue} setreturnvalue={setValue} toEdit={ToEdit} >
                <h3>My popup</h3>
            </SettingEditPopup>

            <div className="col overflow-auto d-flex bg-white rounded flex-column ps-1">
                <div className="bg-white d-flex flex-column rounded p-3 pb-1">
                    <h6 className="mb-1">Costs Setting</h6>
                    <div className="row py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">1st Interval cost :</div>
                        <div className="col d-flex align-items-center">
                            <span>Rs. {FirstIntervalCost}</span>
                            <button onClick={editFirstIntervalCostPop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                    <div className="row bg-light-200 py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">Increment cost :</div>
                        <div className="col d-flex align-items-center">
                            <span>Rs. {IncrementCost}</span>
                            <button onClick={editIncrementalCostPop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                    <div className="row py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">Socks cost :</div>
                        <div className="col d-flex align-items-center">
                            <span>Rs. {SockCost}</span>
                            <button onClick={editSockCostPop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                    <div className="row bg-light-200 py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">Water cost :</div>
                        <div className="col d-flex align-items-center">
                            <span>Rs. {WaterCost}</span>
                            <button onClick={editWaterCostPop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                    <div className="row py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">1st Interval Time :</div>
                        <div className="col d-flex align-items-center">
                            <span className="me-2 fw-bold">{FirstIntervaltime}</span>
                            <span>Minutes</span>
                            <button onClick={editFirstIntervalTimePop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                    <div className="row py-2 bg-light-200 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">Additional Time :</div>
                        <div className="col d-flex align-items-center">
                            <span className="me-2 fw-bold">{AdditionalTime}</span>
                            <span>Minutes</span>
                            <button onClick={editAdditionalTimePop} className="btn ms-auto lh-sm btn-sm px-3 btn-secondary rounded-1">Edit</button>
                        </div>
                    </div>
                </div>
                <div className="bg-white d-flex mt-2 flex-column rounded p-3 pb-2 h-100">
                    <h6 className="mb-1">Extra Setting</h6>
                    {/* <div className="row py-2 d-flex align-items-center">
                        <div className="col-4 fw-light text-muted pe-2">Print Bill :</div>
                        <div className="col d-flex align-items-center">
                            {IsBillLoading ? (<>Loading...</>) : (<>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" checked={IsBill} onChange={OnChangeIsBill} />
                                </div>
                            </>)}



                        </div>

                    </div> */}
                    <div className="row py-2 d-flex align-items-center">

                        <div className="col d-flex align-items-center">
                            <button onClick={Onqrclick} className="btn btn-sm btn-success text-white" name="popSubmit" >Print QR</button>
                        </div>
                    </div>
                    <div className="row py-2 d-flex align-items-center">

                        <div className="col d-flex align-items-center">
                            <button onClick={OnDownloadApp} className="btn btn-sm btn-success text-white" name="popSubmit" >Download App</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Setting