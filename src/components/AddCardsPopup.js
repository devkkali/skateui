import React, { useEffect, useState } from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";

import error from '../images/error.png'
import success from '../images/success.png'
import warning from '../images/warning.png'

function AddCardsPopup(props) {
    const [ApiLoading, setApiLoading] = useState(false);
    const [ApiError, setApiError] = useState(false);
    const [ApiErrorMessage, setApiErrorMessage] = useState("");
    const [HaveApiErrorArray, setHaveApiErrorArray] = useState(false);
    const [ApiErrorArray, setApiErrorArray] = useState([]);
    const [CardToEntryArray, setCardToEntryArray] = useState([]);
    const [ApiState, setApiState] = useState("");
    const [ApiResponseState, setApiResponseState] = useState("N");
    const [FailedCards, setFailedCards] = useState([]);

    const CancleClick = () => {
        setApiLoading(false);
        setApiError(false);
        setApiErrorMessage("");
        setHaveApiErrorArray(false);
        setApiErrorArray([]);
        setCardToEntryArray([]);
        setApiState("");
        setApiResponseState("N");
        setFailedCards([]);

        props.setTrigger(false);
    }

    useEffect(() => {
        console.log(CardToEntryArray);
    }, [CardToEntryArray]);


    const AddToArray = (e) => {

        if (e.target.value != '') {
            let newValue = e.target.value;
            setCardToEntryArray(CardToEntryArray => [...CardToEntryArray, newValue])
        }
        e.target.value = null;
    }

    const OnAddClick = () => {
        setApiResponseState("N");
        setApiLoading(true);
        axios.post(requests.register_cards, { cards: CardToEntryArray }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setApiResponseState("S");
                setApiLoading(false);
                setApiLoading(false);
                setApiState("Success !!");
                setApiError(false);
                setApiErrorMessage("");
                setHaveApiErrorArray(false);
                setHaveApiErrorArray([]);

                setFailedCards(res.data.details.cardfailure);


            })
            .catch(error => {
                setApiResponseState("F");
                setApiState("Failed !!");
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

        setApiState("Please wait...");

    }


    return (props.Trigger) ? (
        <>
            {/* edit popup */}
            <div className="popup-container">
                <div className="popup-3 card">
                    <div className="card-header">
                        {!ApiError ? (<>Add Cards</>) : (<>Error</>)}
                    </div>
                    <div className="card-body text-nowrap">

                        <div className={`mb-2 d-flex    ${ApiResponseState === "S" ? 'flex-column add-card-error-overflow' : 'align-items-center'}`}>
                            {!ApiError ? (
                                <>


                                    {(() => {
                                        if (ApiResponseState === "S") {
                                            return (
                                                <>
                                                    <span className="fw-bold text-danger ">failed Card List</span>
                                                    <ul>
                                                        {FailedCards.map((query, i) => (
                                                            <li>{query}</li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <>
                                                    <span className="mx-2">Scan Card</span>
                                                    <input autoFocus onKeyPress={event => { if (event.key === 'Enter') { AddToArray(event) } }} type="number" className="form-control form-control-sm" name="variable-name" />
                                                </>
                                            )
                                        }
                                    })()}
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

                        <div className="mb-2 d-flex align-items-center">

                            {!ApiError ? (
                                <>


                                    {(() => {
                                        if (ApiResponseState === "S") {
                                            return (<></>)
                                        } else {
                                            return (
                                                <>
                                                    <span className="ms-2 text-secondary text-danger">Total no of cards: {(CardToEntryArray).length} </span>
                                                </>
                                            )
                                        }
                                    })()}
                                </>
                            ) : (<></>)}

                        </div>

                    </div>
                    <div className={`card-footer text-center d-flex ${ApiResponseState === "S" ? 'justify-content-center' : 'justify-content-between'} `}>
                        {/* add or remove buttons as your wish */}
                        {/* <button className="btn btn-sm btn-secondary">Neutral</button> */}
                        {!ApiError ? (
                            <>
                                {(() => {
                                    if (ApiResponseState === "S") {
                                        return (<></>)
                                    } else {
                                        return (
                                            <>
                                                <button disabled={ApiLoading} onClick={OnAddClick} className="btn btn-sm btn-success text-white" name="popSubmit" >Add Cards</button>
                                            </>
                                        )
                                    }
                                })()}
                            </>
                        ) : (
                            <>
                            </>
                        )}


                        {(() => {
                            switch (ApiResponseState) {
                                case "N":
                                    console.log(ApiResponseState);
                                    console.log("N");
                                    return (<><span>{ApiState}</span></>)
                                    break;
                                // case "S":
                                //     console.log("S");
                                //     return (<><span className="fw-bold text-success">{ApiState}</span></>)
                                //     break;
                                case "F":
                                    console.log("F");
                                    return (<><span className="fw-bold text-danger">{ApiState}</span></>)
                                    break;

                                default:
                                    break;
                            }
                        })()}

                        <button disabled={ApiLoading} onClick={CancleClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                        {/* {(() => {
                            if (ApiResponseState === "S") {
                                return (
                                    <>
                                        <button disabled={ApiLoading} onClick={CancleClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <button disabled={ApiLoading} onClick={CancleClick} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>
                                    </>
                                )
                            }
                        })()} */}

                    </div>
                </div>
            </div>
        </>
    ) : (<></>);
}
export default AddCardsPopup