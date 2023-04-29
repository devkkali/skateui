import React, { useEffect, useState } from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";
import NepaliDate from "nepali-date-converter";
// import Select from 'react-select'
import error from '../images/error.png'
import success from '../images/success.png'
import warning from '../images/warning.png'


function MembershipMember() {
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
    }

    //for date calculation
    const defaultDate = new Date()
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);
    const [packageCost, setpackageCost] = useState(0);
    const [noOfDays, setnoOfDays] = useState(0);


    // membership_type
    const [MemberhsipTypes, setMemberhsipTypes] = useState();
    const [LoadingApi, setLoadingApi] = useState(false);
    const [OptionSelected, setOptionSelected] = useState(null);


    let option = [];
    useEffect(() => {
        if (MemberhsipTypes) {
            if (MemberhsipTypes.length > 0) {
                MemberhsipTypes.forEach(role => {
                    let roleDate = {}
                    roleDate.value = role.type_name
                    roleDate.label = role.type_name
                    option.push(roleDate)
                })
            }
        }
    }, [option]);

    const OnTypeChange = (e) => {
        setOptionSelected(e.target.value)
        let expDate = new Date();
        const index = MemberhsipTypes.findIndex(item => item.id == e.target.value);
        expDate.setDate(startDate.getDate() + parseInt(MemberhsipTypes[index]['validity_in_day']))
        setEndDate(expDate);
        setpackageCost(MemberhsipTypes[index]['cost']);
        setnoOfDays(MemberhsipTypes[index]['validity_in_day']);

    }

    useEffect(() => {
        if (MemberhsipTypes) {
            setOptionSelected(MemberhsipTypes[0]['id']);
            let expDate = new Date();
            expDate.setDate(startDate.getDate() + parseInt(MemberhsipTypes[0]['validity_in_day']))
            setEndDate(expDate);
            setpackageCost(MemberhsipTypes[0]['cost'])
            setnoOfDays(MemberhsipTypes[0]['validity_in_day'])

        }
    }, [MemberhsipTypes]);




    useEffect(() => {
        setLoadingApi(true);

        axios.get(requests.membership_type, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingApi(false);
                setMemberhsipTypes(res.data.details)

            })
            .catch(error => {
                setLoadingApi(false);
                setRApiError(true);
                if (error.response) {
                    console.log('hi1');

                    if (error.response.status == 422) {
                        console.log('hi2');
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                        console.log(error.response.data.details);
                    } else {
                        console.log('h3');
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    console.log('hi4');
                    setRApiErrorMessage("Request Server Error");
                }
            })


    }, [])



    const [CardNumber, setCardNumber] = useState("");
    const [Phone, setPhone] = useState("");
    const [Name, setName] = useState("");
    const [Amount, setAmount] = useState("");
    const [isApiSuccess, setisApiSuccess] = useState(false);


    const changeCard = (e) => {
        setCardNumber(e.target.value);
    }
    const changePhone = (e) => {
        setPhone(e.target.value);
    }
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeAmount = (e) => {
        setAmount(e.target.value);
    }




    const SubmitClicked = (event) => {
        event.preventDefault();

        axios.post(requests.membership_user, { membership_type_id: OptionSelected, card_id: CardNumber, name: Name, phone_no: Phone, paid: Amount }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingApi(false);
                setisApiSuccess(true);
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

    const ApiOk = () => {
        onErrorClear();
        setCardNumber("")
        setPhone("");
        setName("");
        setAmount("");
        setisApiSuccess(false);
    }



    return (<>




        {isApiSuccess ? (
            <>
                {/* message popup */}
                <div className="popup-container d-nones">
                    <div className="popup-1 card">
                        <div className="card-header">
                            <span className="text-success fw-bold" >Success</span>
                            <span style={{ float: "right" }} >
                                <img className="pop-icon" src={success} />
                            </span>
                        </div>
                        <div className="card-body">
                            <p>
                                Member Added Succesfully.
                            </p>
                        </div>
                        <div className="card-footer text-center d-flex justify-content-between">
                            <button autoFocus onClick={ApiOk} className="btn btn-sm btn-success ms-auto text-white">OK</button>
                        </div>
                    </div>
                </div>
            </>
        ) : (<></>)}


        {
            RApiError ? (
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
                                <button onClick={onErrorClear} className="btn btn-sm btn-danger text-white">Cancel</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                </>
            )
        }



        {
            LoadingApi ? (
                <>
                    Loading...
                </>
            ) : (
                <>
                    <div id="mem" className="bg-white p-4 border">
                        <form onSubmit={SubmitClicked}>
                            <div className="row mt-3">
                                <div className="col-6 mb-3">
                                    <label htmlFor="card_number" className="form-label">Card Number</label>
                                    <input onChange={changeCard} value={CardNumber} required placeholder="Enter / Scan Card Number" type="number" id="card_number" name="card_number" className="form-control" />
                                </div>
                                <div className="col-6 d-flex mb-3">
                                    <div className="w-50">
                                        <label htmlFor="card_type" className="form-label">Membership Type</label>
                                        {MemberhsipTypes ? (
                                            <>
                                                <select defaultValue={MemberhsipTypes[0]['id']} onChange={OnTypeChange} id="card_type" className="form-select">
                                                    {

                                                        Object.keys(MemberhsipTypes).map((error, index) => (
                                                            <option key={index} value={MemberhsipTypes[error]['id']} >{MemberhsipTypes[error]['type_name']}</option>
                                                        ))


                                                    }
                                                </select>
                                                cost: Rs {packageCost}
                                            </>
                                        ) : (<>please wait ...</>)}


                                    </div>
                                    <div className="w-50 ms-3">
                                        <label htmlFor="amount" className="form-label">Charge / Hr</label>
                                        <div className="d-flex align-items-center">
                                            <input onChange={changeAmount} value={Amount} required placeholder="Enter amount" type="text" id="amount" name="card_number" className="form-control" />
                                            <span className="fw-bold text-muted px-2 text-nowrap">/ hr</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input onChange={changeName} value={Name} required placeholder="Client's name" type="text" id="name" name="name" className="form-control" />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="start" className="form-label">Start Date</label>
                                    <span type="date" id="start" className="form-control" >
                                        {new NepaliDate(new Date(startDate)).format('DD, MMMM YYYY')}
                                    </span>
                                </div>
                                {/* <span className="col form-control border-0">
                                {new NepaliDate(new Date(startDate)).format('DD, MMMM YYYY')}
                            </span> */}
                            </div>
                            <div className="row mt-3">
                                <div className="col mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input onChange={changePhone} value={Phone} required placeholder="Client's phone number" type="number" id="phone" name="phone" className="form-control" />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="end" className="form-label">Expiry Date</label>
                                    <span type="date" id="start" className="form-control" >
                                        {new NepaliDate(new Date(endDate)).format('DD, MMMM YYYY')}
                                    </span>
                                </div>
                            </div>

                            <div className="text-end mt-3">
                                <span className="text-danger" >(please make full payment first)</span>
                                <button className="btn btn-success text-white px-3 ms-4">Submit</button>
                            </div>
                        </form>
                    </div>
                </>
            )
        }


    </>)

}
export default MembershipMember