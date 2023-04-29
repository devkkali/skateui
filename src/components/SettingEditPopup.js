import React, { useEffect, useState } from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";

import error from '../images/error.png'
import success from '../images/success.png'
import warning from '../images/warning.png'

function SettingEditPopup(props) {
    const [ApiLoading, setApiLoading] = useState(false);
    const [EditState, setEditState] = useState("");
    const [EditValue, setEditValue] = useState("");

    const [ApiError, setApiError] = useState(false);
    const [ApiErrorMessage, setApiErrorMessage] = useState("");
    const [HaveApiErrorArray, setHaveApiErrorArray] = useState(false);
    const [ApiErrorArray, setApiErrorArray] = useState([]);

    // useEffect(() => {
    //     setEditValue(props.value);
    // }, []);

    const EditValueOnchange = (e) => {
        var change = {};
        change = e.target.value;
        setEditValue(change);
    }

    const EditValueOnFocus = (e) => {
        setEditValue(e.target.value);
    }


    const CancleClick = () => {
        setApiLoading(false);
        setEditState("");
        setEditValue("");
        setApiError(false);
        setApiErrorMessage("");
        setHaveApiErrorArray(false);
        setHaveApiErrorArray([]);
        props.setIsSettingPop(false);
    }

    const OnOkClick = () => {
        var endpoint = '';
        // console.log(props.toEdit);
        switch (props.toEdit) {
            case ('first_interval_cost'):
                endpoint = requests.set_first_interval_cost;
                // console.log(endpoint);
                break;
            case ('increment_cost'):
                endpoint = requests.set_increment_cost;
                break;
            case ('sock_cost'):
                endpoint = requests.set_sock_cost;
                break;
            case ('water_cost'):
                endpoint = requests.set_water_cost;
                break;
            case ('first_interval_time'):
                endpoint = requests.set_first_interval_time;
                break;
            case ('additional_time'):
                endpoint = requests.set_additional_time;
                break;
            default:
                break;
        }

        setApiLoading(true);
        axios.post(requests.baseurl + endpoint, { value: EditValue }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiLoading(false);
                props.setreturnvalue(res.data.details.value);

                setApiLoading(false);
                setEditState("");
                setEditValue("");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray(false);
                setHaveApiErrorArray([]);
                props.setIsSettingPop(false);
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status == 422) {
                        setApiLoading(false);
                        setApiError(true);
                        setHaveApiErrorArray(true);
                        setApiErrorArray(error.response.data.details);
                    } else {
                        setApiLoading(false);
                        setApiError(true);
                        setApiErrorMessage(error);
                    }
                }
                else {
                    setApiLoading(false);
                    setApiError(true);
                    setApiErrorMessage('Request Server Error');
                }

            })

        setEditState("Please wait...");
    }


    const EnterEntered = () => {
        const okButton = document.querySelector(
            `button[name=popSubmit]`
        );
        if (okButton !== null) {
            okButton.focus();
        }
    }


    return (props.trigger) ? (
        <>
            {/* edit popup */}
            <div className="popup-container">
                <div className="popup-3 card">
                    <div className="card-header">
                        {!ApiError ? (<>Edit {props.Title}</>) : (<>Error</>)}

                    </div>
                    <div className="card-body text-nowrap">

                        <div className="mb-2 d-flex align-items-center">
                            {!ApiError ? (
                                <>
                                    <span className="mx-2">{props.Title}</span>
                                    <input onFocus={EditValueOnFocus} onChange={EditValueOnchange} defaultValue={props.value} disabled={ApiLoading} autoFocus onKeyPress={event => { if (event.key === 'Enter') { EnterEntered(event) } }} type="number" className="form-control form-control-sm" name="variable-name" />
                                </>
                            ) : (
                                <>
                                    {!HaveApiErrorArray ? (
                                        <>
                                            {ApiErrorMessage}
                                        </>
                                    ) : (
                                        <>
                                            {Object.keys(ApiErrorArray).map((error, index) => (
                                                <p key={error} className="mb-1">
                                                    <span className="fw-bold text-danger">{error}:</span>
                                                    <span className="ms-2 text-secondary text-danger">{ApiErrorArray[error][0]} </span>
                                                </p>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </div>


                    </div>
                    <div className="card-footer text-center d-flex justify-content-between">
                        {/* add or remove buttons as your wish */}
                        {/* <button className="btn btn-sm btn-secondary">Neutral</button> */}
                        {!ApiError ? (<><button disabled={ApiLoading} onClick={OnOkClick} className="btn btn-sm btn-success text-white" name="popSubmit" >Apply</button></>) : (<></>)}                        {ApiLoading ? (<>{EditState}</>) : (<></>)}
                        <button disabled={ApiLoading} onClick={CancleClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                    </div>
                </div>
            </div>
        </>
    ) : (<></>);
}
export default SettingEditPopup