import React, { useEffect, useState } from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";


function ParkingOutPopup(props) {
    const [PopupType, setpopupType] = useState(props.Type);
    const [PlayersDetails, setPlayersDetails] = useState(props.Details);

    const [ApiLoading, setApiLoading] = useState(false);


    const [EditState, setEditState] = useState("");
    const [EditValue, setEditValue] = useState("");



    const [ApiError, setApiError] = useState(false);
    const [ApiErrorMessage, setApiErrorMessage] = useState("");
    const [HaveApiErrorArray, setHaveApiErrorArray] = useState(false);
    const [ApiErrorArray, setApiErrorArray] = useState([]);





    const cancelClick = () => {

        setPlayersDetails(null);


        setApiLoading(false);
        setEditState("");
        setEditValue("");
        setApiError(false);
        setApiErrorMessage("");
        setHaveApiErrorArray([]);

        props.setTrigger(false);

    }



    useEffect(() => {

        setPlayersDetails(props.Details);
        setpopupType(props.Type)

    }, [props.Trigger][props.Details])
















    const EditValueOnchange = (e) => {
        setEditValue(e.target.value);
    }





    const OnAddClick = () => {
        var endpoint = '';
        switch (props.toEdit) {
            case ('water'):
                endpoint = requests.park_out_add_water;
                break;
            case ('sock'):
                endpoint = requests.park_out_add_socks;
                break;
            case ('deposit'):
                endpoint = requests.park_out_add_deposit;
                break;
            default:
                break;
        }

        setApiLoading(true);
        props.setLoadingApi(true);
        axios.post(requests.baseurl + endpoint + "/" + PlayersDetails.card_id, { value: EditValue }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiLoading(false);
                // props.setreturnvalue(res.data.details.value);

                setEditState("");
                setEditValue("");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray([]);
                props.setLoadingApi(false);
                props.ReloadData(PlayersDetails.card_id)
                props.setTrigger(false);

            })
            .catch(error => {
                props.setLoadingApi(false);
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








































    const OnEditClick = () => {
        var endpoint = '';
        switch (props.toEdit) {
            case ('water'):
                endpoint = requests.park_out_edit_water;
                break;
            case ('sock'):
                endpoint = requests.park_out_edit_socks;
                break;
            case ('deposit'):
                endpoint = requests.park_out_edit_deposit;
                break;
            default:
                break;
        }

        setApiLoading(true);
        props.setLoadingApi(true);
        axios.post(requests.baseurl + endpoint + "/" + PlayersDetails.card_id, { value: EditValue }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiLoading(false);
                // props.setreturnvalue(res.data.details.value);

                setEditState("");
                setEditValue("");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray([]);
                props.setLoadingApi(false);
                props.ReloadData(PlayersDetails.card_id)
                props.setTrigger(false);

            })
            .catch(error => {
                props.setLoadingApi(false);
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











    const ParkOutClick = (player_id) => {

        setApiLoading(true);
        props.setLoadingApi(true);
        axios.get(requests.park_out_single_player + "/" + player_id, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiLoading(false);
                // props.setreturnvalue(res.data.details.value);

                setEditState("");
                setEditValue("");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray([]);
                props.setLoadingApi(false);
                props.ReloadData(PlayersDetails.card_id)


                // props.setTrigger(false);

            })
            .catch(error => {
                props.setLoadingApi(false);
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
    }

    const DeletePlayer = (player_id) => {
        setApiLoading(true);
        props.setLoadingApi(true);
        axios.delete(requests.park_out_del_player + "/" + player_id, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiLoading(false);
                // props.setreturnvalue(res.data.details.value);

                setEditState("");
                setEditValue("");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray([]);
                props.setLoadingApi(false);
                props.ReloadData(PlayersDetails.card_id)


                // props.setTrigger(false);

            })
            .catch(error => {
                props.setLoadingApi(false);
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
    }


















































    return (props.Trigger) ? (
        <><div className="popup-container d-nones">
            {(() => {
                switch (PopupType) {
                    case "details":
                        return (
                            <>
                                {/* table popup */}
                                <div className="popup-table card">
                                    <div className="card-header">
                                        Payment Details
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <span className="d-flex">
                                                <h6 className="me-2">Card Id: </h6>
                                                <h6>{PlayersDetails.card_id}</h6>
                                            </span>
                                            <span className="d-flex">
                                                <h6 className="me-2">Name:</h6>
                                                <h6>{PlayersDetails.name}</h6>
                                            </span>

                                        </div>

                                        <div className="card-list-table mt-3 pe-2 add-card-error-overflow37">

                                            <table className="table table-bordered table-striped">
                                                <tbody><tr className="sticky-top bg-white shadow-sm">
                                                    <th>SN</th>
                                                    <th>Player</th>
                                                    <th>In Time</th>
                                                    <th>Out Time</th>
                                                    <th>Interval</th>
                                                    <th>cost</th>
                                                </tr>

                                                    {/* {PlayersDetails.players.map((query, i) => (
                                                        <li key={i}>{query}</li>
                                                    ))} */}




                                                    {Object.keys(PlayersDetails.players).map((player, index) => (
                                                        <tr key={player}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-end">Player {index + 1}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].in_time}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].out_time ? PlayersDetails.players[player].out_time : null}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].interval}</td>
                                                            <td className="text-end" >{PlayersDetails.players[player].time_cost}</td>
                                                        </tr>
                                                    ))}
                                                    <tr >
                                                        <td className="text-end" colSpan={4} >Total Time Cost</td>
                                                        <td className="text-end" colSpan={2}>{PlayersDetails.time_cost}</td>
                                                    </tr>
                                                    <tr >
                                                        <td className="text-end" colSpan={4} >Water bottle</td>
                                                        <td className="text-center" >{PlayersDetails.waters}</td>
                                                        <td className="text-end" >{PlayersDetails.water_total}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-end" colSpan={4} >Socks</td>
                                                        <td className="text-center">{PlayersDetails.socks}</td>
                                                        <td className="text-end">{PlayersDetails.socks_total}</td>
                                                    </tr>
                                                    <tr >
                                                        <td className="text-end" colSpan={4} >Deposited</td>
                                                        <td className="text-end" colSpan={2}>{PlayersDetails.deposit}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-end" colSpan={5} >Grand Total</td>
                                                        <td className="text-end">{PlayersDetails.total}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center d-flex justify-content-between">
                                        {/* add or remove buttons as your wish */}
                                        {/*                <button class="btn btn-sm btn-secondary">Neutral</button>*/}
                                        <button onClick={cancelClick} className="ms-auto btn btn-sm btn-success text-white">Close</button>
                                    </div>
                                </div>
                            </>
                        )
                        break;
                    case "edit":
                        return (
                            <>
                                <div className="popup-3 card">
                                    <div className="card-header">
                                        {!ApiError ? (<>Edit {props.Title}</>) : (<>Error</>)}

                                    </div>
                                    <div className="card-body text-nowrap">

                                        <div className="mb-2 d-flex align-items-center">
                                            {!ApiError ? (
                                                <>
                                                    <span className="mx-2">{props.Title}</span>
                                                    <input onChange={EditValueOnchange} defaultValue={props.value} disabled={ApiLoading} autoFocus type="number" className="form-control form-control-sm" name="variable-name" />
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
                                        {!ApiError ? (<><button disabled={ApiLoading} onClick={OnEditClick} className="btn btn-sm btn-success text-white" name="popSubmit" >Apply</button></>) : (<></>)}                        {ApiLoading ? (<>{EditState}</>) : (<></>)}
                                        <button disabled={ApiLoading} onClick={cancelClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                                    </div>
                                </div>
                            </>
                        )
                        break;
                    case "add":
                        return (
                            <>
                                <div className="popup-3 card">
                                    <div className="card-header">
                                        {!ApiError ? (<>Add {props.Title}</>) : (<>Error</>)}

                                    </div>
                                    <div className="card-body text-nowrap">

                                        <div className="mb-2 d-flex align-items-center">
                                            {!ApiError ? (
                                                <>
                                                    <span className="mx-2">{props.Title}</span>
                                                    <input onChange={EditValueOnchange} defaultValue={props.value} disabled={ApiLoading} autoFocus type="number" className="form-control form-control-sm" name="variable-name" />
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
                                        {!ApiError ? (<><button disabled={ApiLoading} onClick={OnAddClick} className="btn btn-sm btn-success text-white" name="popSubmit" >Add</button></>) : (<></>)}                        {ApiLoading ? (<>{EditState}</>) : (<></>)}
                                        <button disabled={ApiLoading} onClick={cancelClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                                    </div>
                                </div>
                            </>
                        )
                        break;
                    case "remove":
                        return (
                            <>
                                <div className="popup-table card">
                                    <div className="card-header">
                                        Remove Player
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <span className="d-flex">
                                                <h6 className="me-2">Card Id: </h6>
                                                <h6>{PlayersDetails.card_id}</h6>
                                            </span>
                                            <span className="d-flex">
                                                <h6 className="me-2">Name:</h6>
                                                <h6>{PlayersDetails.name}</h6>
                                            </span>

                                        </div>

                                        <div className="card-list-table mt-3 pe-2 add-card-error-overflow37">

                                            <table className="table table-bordered table-striped">
                                                <tbody><tr className="sticky-top bg-white shadow-sm">
                                                    <th>SN</th>
                                                    <th>Player</th>
                                                    <th>In Time</th>
                                                    <th>Out Time</th>
                                                    <th>Interval</th>
                                                    <th>cost</th>
                                                    <th>Park Out</th>
                                                    <th>Delete</th>
                                                </tr>

                                                    {/* {PlayersDetails.players.map((query, i) => (
                                                        <li key={i}>{query}</li>
                                                    ))} */}




                                                    {Object.keys(PlayersDetails.players).map((player, index) => (
                                                        <tr key={player}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-end">Player {index + 1}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].in_time}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].out_time ? PlayersDetails.players[player].out_time : null}</td>
                                                            <td className="text-center">{PlayersDetails.players[player].interval}</td>
                                                            <td className="text-end" >{PlayersDetails.players[player].time_cost}</td>
                                                            <td className="text-center">

                                                                {ApiLoading ? (
                                                                    <>
                                                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {PlayersDetails.players[player].out_time != null ? (
                                                                            <>
                                                                                <button disabled className="ms-auto btn btn-sm btn-secondary">Park Out</button>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <button onClick={() => { ParkOutClick(PlayersDetails.players[player].id) }} className="ms-auto btn btn-sm btn-warning text-white">Park Out</button>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                )}



                                                            </td>
                                                            <td className="text-center">
                                                                {ApiLoading ? (
                                                                    <>
                                                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {((PlayersDetails.players).length) == 1 ? (<>
                                                                        </>) : (<>
                                                                            <button onClick={() => { DeletePlayer(PlayersDetails.players[player].id) }} className="ms-auto btn btn-sm btn-danger text-white">Delete</button>
                                                                        </>)}


                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center d-flex justify-content-between">
                                        {/* add or remove buttons as your wish */}
                                        {/*                <button class="btn btn-sm btn-secondary">Neutral</button>*/}
                                        <button onClick={cancelClick} className="ms-auto btn btn-sm btn-success text-white">Close</button>
                                    </div>
                                </div>
                            </>
                        )
                        break;
                    case "error":
                        
                        break;
                    default:
                        break;
                }
            })()}



        </div>
        </>
    ) : (<></>);
}
export default ParkingOutPopup