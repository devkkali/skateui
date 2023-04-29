import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";
import NepaliDate from "nepali-date-converter";
import ParkingOutPopup from "../components/ParkingOutPopup";
import { useDocumentTitle } from "../helpers/setDocumentTitle";


function ParkingOut() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Parking Out");



    const [CardNumberInput, setCardNumberInput] = useState("");
    const [CardNumberBackup, setCardNumberBackup] = useState("");
    const [HaveDetails, setHaveDetails] = useState(false);
    const [LoadingApi, setLoadingApi] = useState(false);
    const [Details, SetDetails] = useState([]);


    const [InTimeFromApi, SetInTimeFromApi] = useState(null);
    const [OutTimeToSubmit, SetOutTimeToSubmit] = useState(null);


    const [DoTickel, setDoTickel] = useState(0);
    const [PlayTime, setPlayTime] = useState("");

    const [isReloading, setisReloading] = useState(false);


    const [GrandTotalFromApi, setGrandTotalFromApi] = useState(0);
    const [GrandTotal, setGrandTotal] = useState(0);
    const [DiscountAmount, setDiscountAmount] = useState(0);


    const OnDiscountChange = (e) => {
        setDiscountAmount(e.target.value);
        setGrandTotal(GrandTotalFromApi - e.target.value);
    }






    const ClearClicked = () => {
        setCardNumberInput("");
        setHaveDetails(false);
        setLoadingApi(false);
        SetDetails([]);
        SetInTimeFromApi(null);
        SetOutTimeToSubmit(null);
        setPlayTime("");
        setDiscountAmount(0);


        setDoTickel(0);

        const nextSibling = document.querySelector(
            `input[name=card_number]`
        );
        if (nextSibling !== null) {
            nextSibling.focus();
        }


    }


    let nepaliDateTime = new NepaliDate();
    NepaliDate.language = 'np';
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let englishDateTime = new Date();

    const OnChangeCardNumberInput = (e) => {
        setCardNumberInput(e.target.value);
    }




    useEffect(() => {
        // console.log(InTimeFromApi ? InTimeFromApi.getFullYear() : null);
        // console.log(englishDateTime ? englishDateTime.getMonth() + 1 : null);
    }, [Details]);



    const CardInputEnter = (event) => {
        setLoadingApi(true);
        setHaveDetails(false);

        axios.get(requests.park_out_check + "/" + CardNumberInput, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                // console.log(res.data.details);

                setLoadingApi(false);
                setCardNumberInput("");
                SetDetails(res.data.details)
                setGrandTotalFromApi(res.data.details.total);
                setGrandTotal(res.data.details.total);
                let intimefromapi = new Date(res.data.details.in_time);

                SetInTimeFromApi(intimefromapi);
                SetOutTimeToSubmit(new Date());
                setDoTickel(1);
                setHaveDetails(true);

            })
            .catch(error => {
                setLoadingApi(false);
                setHaveDetails(false);
                setCardNumberInput("");




                setLoadingApi(false);
                setRApiError(true);
                console.log(RApiError, "hello");

                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                        console.log(error.response.data.details);
                    } else {
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }

            })
    }



    const ReloadData = (Card_id) => {

        axios.get(requests.park_out_check + "/" + Card_id, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res.data.details);
                SetDetails(res.data.details);
                setGrandTotalFromApi(res.data.details.total);
                setGrandTotal(res.data.details.total);
                setisReloading(false);
            })
            .catch(error => {
                setisReloading(false);


                setLoadingApi(false);
                setRApiError(true);
                console.log(RApiError, "hello");

                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                        console.log(error.response.data.details);
                    } else {
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }

            })


    }





    const parseMillisecondsIntoReadableTime = (milliseconds) => {
        //Get Days from milliseconds
        var days = milliseconds / (1000 * 60 * 60 * 24);
        var absoluteDays = Math.floor(days);
        var d = absoluteDays;

        //Get hours from milliseconds
        var hours = (days - absoluteDays) * 24
        var absoluteHours = Math.floor(hours);
        var h = absoluteHours;

        //Get remainder from hours and convert to minutes
        var minutes = (hours - absoluteHours) * 60;
        var absoluteMinutes = Math.floor(minutes);
        var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

        //Get remainder from minutes and convert to seconds
        var seconds = (minutes - absoluteMinutes) * 60;
        var absoluteSeconds = Math.floor(seconds);
        var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


        return d + 'd : ' + h + 'h : ' + m + 'm : ' + s + 's';
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            let date = new Date(Details.in_time);
            let now = new Date();
            setPlayTime(parseMillisecondsIntoReadableTime(now.getTime() - date.getTime()));

            if (DoTickel === 0) {

                clearInterval(myInterval)
            }

        }, 1000)
        return () => {

            clearInterval(myInterval);
        };
    });


    // buttons controls#########################################################
    const [IsParkingOutPop, setIsParkingOutPop] = useState(false);
    const [PopType, setPopType] = useState("");
    const [ToEdit, setToEdit] = useState("");
    const [ToEditValue, setToEditValue] = useState("");
    const [PopTitle, setPopTitle] = useState("");

    // for error to render in same page directly
    const [RApiError, setRApiError] = useState(false);
    const [RHaveApiErrorArray, setRHaveApiErrorArray] = useState(false);
    const [RApiErrorMessage, setRApiErrorMessage] = useState("");
    const [RApiErrorArray, setRApiErrorArray] = useState([]);

    const onErrorClear = () => {
        setRApiError(false);
        setRHaveApiErrorArray(false);
        setRApiErrorMessage("");
        setRApiErrorArray([]);

        const nextSibling = document.querySelector(
            `input[name=card_number]`
        );
        if (nextSibling !== null) {
            nextSibling.focus();
        }

    }


    const OnViewDetailsClick = () => {
        setIsParkingOutPop(true);
        setPopType("details");
        console.log("poptrigger", IsParkingOutPop);
        console.log("view detail is clicked");
    }


    const AddClient = (event) => {
        setLoadingApi(true);
        // setHaveDetails(false);
        setisReloading(true);
        axios.get(requests.park_out_add_player + "/" + Details.card_id, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingApi(false);

                ReloadData(Details.card_id);

            })
            .catch(error => {



                setLoadingApi(false);
                setRApiError(true);
                console.log(RApiError, "hello");

                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                        console.log(error.response.data.details);
                    } else {
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })

    }

    const AddWaterClick = () => {
        setIsParkingOutPop(true);
        setPopType("add");
        setPopTitle('Water');
        setToEditValue("");
        setToEdit("water");

    }

    const EditWaterClick = () => {
        setIsParkingOutPop(true);
        setPopType("edit");
        setPopTitle('Water');
        setToEditValue(Details.waters)
        setToEdit("water");
    }


    const AddSockClick = () => {
        setIsParkingOutPop(true);
        setPopType("add");
        setPopTitle('Socks');
        setToEditValue("");
        setToEdit("sock");

    }

    const EditSockClick = () => {
        setIsParkingOutPop(true);
        setPopType("edit");
        setPopTitle('Socks');
        setToEditValue(Details.socks)
        setToEdit("sock");
    }

    const AddDepositClick = () => {
        setIsParkingOutPop(true);
        setPopType("add");
        setPopTitle('Deposit');
        setToEditValue("");
        setToEdit("deposit");

    }

    const EditDepositClick = () => {
        setIsParkingOutPop(true);
        setPopType("edit");
        setPopTitle('Deposit');
        setToEditValue(Details.deposit)
        setToEdit("deposit");
    }

    const RemovePlayerClick = () => {
        setIsParkingOutPop(true);
        setPopType("remove");
        setPopTitle('Remove Player');
        setToEditValue(Details.deposit)
        setToEdit("remove");
    }








    const OnExitClicked = () => {
        setLoadingApi(true);
        // setHaveDetails(false);
        // setisReloading(true);
        axios.post(requests.park_out + "/" + Details.card_id, { paid_amount: +Details.deposit+GrandTotal }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingApi(false);

                alert("parked Out");
                ClearClicked();

            })
            .catch(error => {
                setLoadingApi(false);


                setLoadingApi(false);
                setRApiError(true);
                console.log(RApiError, "hello");

                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                        console.log(error.response.data.details);
                    } else {
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })

    }





    const convertFirstCharacterToUppercase = (stringToConvert) => {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);

        return firstCharacter.toUpperCase() + restString;
    };
    const convertFirstCharacterAllWordsToUppercase = (stringToConvert) => {
        const wordsArray = stringToConvert.split(" ");
        const convertedWordsArray = wordsArray.map((word) => {
            return convertFirstCharacterToUppercase(word);
        });

        return convertedWordsArray.join(" ");
    };
    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}
            <ParkingOutPopup Trigger={IsParkingOutPop} setTrigger={setIsParkingOutPop} Type={PopType} Details={Details} Title={PopTitle} toEdit={ToEdit} value={ToEditValue} setLoadingApi={setLoadingApi} ReloadData={ReloadData} />

            {RApiError ? (
                <>
                    <div className="popup-container d-nones">
                        <div className="popup-3 card">
                            <div className="card-header">
                                Error
                            </div>
                            <div className="card-body text-nowrap">

                                <div className="mb-2 d-flex-inline align-items-center">

                                    {!RHaveApiErrorArray ? (
                                        <>
                                            {RApiErrorMessage}
                                        </>
                                    ) : (
                                        <>
                                            {Object.keys(RApiErrorArray).map((error, index) => (
                                                <p key={error} className="mb-1">
                                                    <span className="fw-bold text-danger">{error}:</span>
                                                    <span className="ms-2 text-secondary text-danger">{RApiErrorArray[error][0]} </span>
                                                </p>
                                            ))}
                                        </>
                                    )}

                                </div>


                            </div>
                            <div className="card-footer text-center d-flex justify-content-center">
                                <button autoFocus onClick={onErrorClear} className="btn btn-sm btn-danger text-white">Cancel</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )}







            {<Header />}
            {/*  start body content */}
            <div className="body-content p-4">

                <div className="wrapper">
                    <p className="page-title mb-3">Parking Out</p>
                    <div>
                        <div className="bg-white p-4 rounded">
                            <label htmlFor="card_number" className="form-label">Card Number</label>
                            <div className="d-flex">
                                <input autoFocus disabled={LoadingApi} onKeyPress={event => { if (event.key === 'Enter') { CardInputEnter(event) } }} onChange={OnChangeCardNumberInput} value={CardNumberInput} autoComplete="off" placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" />
                                <button onClick={ClearClicked} className="ms-2 btn  btn-secondary px-3">Clear</button>

                            </div>

                        </div>

                        {HaveDetails ? (
                            <>
                                <div className="d-flex my-2 align-items-stretch">
                                    <div className="col pe-1 d-flex flex-column">
                                        <div className="bg-white rounded p-3">
                                            <h6 className="mb-1 text-success">Entry Details</h6>
                                            <div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Card Number :</div>
                                                    <div className="col">{Details.card_id}</div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Client Type :</div>
                                                    {/* <div className="col">{Details.type}</div> */}
                                                    <div className="col client-type">
                                                        {Details.type ? convertFirstCharacterAllWordsToUppercase(Details.type) : null}
                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Name :</div>
                                                    <div className="col">{Details.name}</div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Phone :</div>
                                                    <div className="col">{Details.phone_no}</div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Date :</div>
                                                    {/* <div className="col">2021/12/01</div> */}
                                                    <div className="col">
                                                        {InTimeFromApi ? InTimeFromApi.getFullYear() + '/' + InTimeFromApi.getMonth() + 1 + '/' + InTimeFromApi.getDate() + ',' + weekday[InTimeFromApi.getDay()] : null}
                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Time :</div>
                                                    <div className="col">
                                                        {InTimeFromApi ? InTimeFromApi.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white h-100 rounded p-3 mt-2">
                                            <h6 className="mb-1 text-warning">Exit Details</h6>
                                            <div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Date :</div>
                                                    <div className="col">
                                                        {OutTimeToSubmit ? OutTimeToSubmit.getFullYear() + '/' + OutTimeToSubmit.getMonth() + 1 + '/' + OutTimeToSubmit.getDate() + ',' + weekday[OutTimeToSubmit.getDay()] : null}
                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-4 fw-light text-muted pe-2">Time :</div>
                                                    <div className="col">
                                                        {OutTimeToSubmit ? OutTimeToSubmit.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col ps-1">
                                        <div className="bg-white d-flex flex-column rounded p-3 h-100">
                                            <h6 className="mb-1 text-primary">Payment Details</h6>

                                            <div className="row py-1">
                                                <div className="col-4 fw-light text-muted pe-2"><h4>Interval :</h4></div>
                                                {/* <div className="col">00:30:19</div> */}
                                                <div className="col">
                                                    {/* {minutes === 0 && seconds === 0 && hours === 0 ? null : <h4> {hours} hr : {minutes < 10 ? `0${minutes}` : minutes} min : {seconds < 10 ? `0${seconds}` : seconds} sec</h4>} */}
                                                    {/* {<h4> {hours} hr : {minutes < 10 ? `0${minutes}` : minutes} min : {seconds < 10 ? `0${seconds}` : seconds} sec</h4>} */}
                                                    <h4>{PlayTime}</h4>
                                                </div>
                                            </div>
                                            <div className="row bg-light-200 py-1 d-flex align-items-center">
                                                <div className="col-4 fw-light text-muted pe-2">Number of clients :</div>
                                                <div className="col d-flex align-items-center">
                                                    <div className="btn-group d-flex align-items-center">
                                                        <button disabled={isReloading} onClick={RemovePlayerClick} className="btn lh-sm btn-sm px-3 fw-bold shadow-none btn-outline-secondary rounded-1">
                                                            -
                                                        </button>
                                                        {isReloading ? (
                                                            <>
                                                                <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="mx-3 fw-bold">{Details.no_of_client}</span>
                                                            </>
                                                        )}

                                                        <button disabled={isReloading} onClick={AddClient} className="btn lh-sm btn-sm px-3 fw-bold shadow-none btn-outline-secondary rounded-1">
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row py-1 g-0">
                                                <div className="col-4 fw-light text-muted pe-2">Time Charge :</div>

                                                {isReloading ? (
                                                    <>
                                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="col">Rs. {Details.time_cost}</div>
                                                    </>
                                                )
                                                }







                                            </div>
                                            <div className="row bg-light-200 py-1 d-flex align-items-center">
                                                <div className="col-4 fw-light text-muted pe-2">Water Qt :</div>
                                                <div className="col d-flex align-items-center">

                                                    {isReloading ? (
                                                        <>
                                                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{Details.waters}</span>
                                                        </>
                                                    )
                                                    }





                                                    <div className="ms-auto">
                                                        <button onClick={AddWaterClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-success rounded-1 text-white">Add</button>
                                                        <button onClick={EditWaterClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-secondary rounded-1">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row py-1 g-0">
                                                <div className="col-4 fw-light text-muted pe-2">Water Cost :</div>

                                                {isReloading ? (
                                                    <>
                                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="col">Rs. {Details.water_total}</div>
                                                    </>
                                                )
                                                }





                                            </div>
                                            <div className="row bg-light-200 py-1 d-flex align-items-center">
                                                <div className="col-4 fw-light text-muted pe-2">Socks Qt :</div>
                                                <div className="col d-flex align-items-center">

                                                    {isReloading ? (
                                                        <>
                                                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>{Details.socks}</span>
                                                        </>
                                                    )
                                                    }


                                                    <div className="ms-auto">
                                                        <button onClick={AddSockClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-success rounded-1 text-white">Add
                                                        </button>
                                                        <button onClick={EditSockClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-secondary rounded-1">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row py-1 g-0">
                                                <div className="col-4 fw-light text-muted pe-2">Socks Cost :</div>

                                                {isReloading ? (
                                                    <>
                                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="col">Rs. {Details.socks_total}</div>
                                                    </>
                                                )
                                                }


                                            </div>
                                            <div className="row d-flex align-items-center bg-light-200 py-1">
                                                <div className="col-4 fw-light text-muted pe-2">Deposit Amount :</div>
                                                <div className="col text-success d-flex align-items-center">
                                                    {isReloading ? (
                                                        <>
                                                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Rs. {Details.deposit}</span>
                                                        </>
                                                    )
                                                    }

                                                    <div className="ms-auto">
                                                        <button onClick={AddDepositClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-success rounded-1 text-white">Add
                                                        </button>
                                                        <button onClick={EditDepositClick} disabled={isReloading} className="btn lh-sm btn-sm ms-2 px-3 btn-secondary rounded-1">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row py-1 mb-3">
                                                <div className="col-4 fw-light text-muted pe-2">Discount :</div>
                                                <div className="col">
                                                    <input onChange={OnDiscountChange} value={DiscountAmount} disabled={isReloading} placeholder="Enter discount amount.." type="number" className="shadow-none border-end-0 border-start-0 border-top-0 rounded-0 bg-white p-0 w-auto form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row dashed-top mt-auto pt-3 d-flex fw-semibold align-items-center">
                                                <div className="col-4 text-muted pe-2">Grand Total :</div>
                                                <div className="col d-flex align-items-center">

                                                    {isReloading ? (
                                                        <>
                                                            <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/*use one*/}
                                                            {/*                                <span className="text-success">Rs. 800</span>*/}

                                                            {/* {GrandTotal} */}

                                                            {/* <span className={` ${GrandTotal < 1 ? "text-success":"text-danger" } `}>Rs. {GrandTotal} {GrandTotal < 1?(<>(Return)</>):(<></>)}</span> */}
                                                            <span className={` ${GrandTotal > 0 ? "text-success" : "text-danger"} `}>Rs. {GrandTotal} {GrandTotal > 0 ? "" : "(Return)"}</span>


                                                            {/**/}
                                                        </>
                                                    )}






                                                    <span onClick={OnViewDetailsClick} className="btn text-primary btn-sm ms-auto px-3">View Details</span>
                                                    <button onClick={OnExitClicked} disabled={isReloading} className="btn btn-sm btn-warning ms-auto px-3">Exit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="my-auto p-3 mat-4 text-center screen-centered-loading">
                                    {/* <p className="display-1">⛷</p> */}
                                    {/* <img className="loading-animation-1" src={loading} alt="loading..." /> */}

                                    <p className="opacity-50">...Please enter a Card...</p>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
            {/*  end body content */}

        </>
    )
}
export default ParkingOut