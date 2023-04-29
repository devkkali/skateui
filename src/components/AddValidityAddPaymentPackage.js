import React, { useEffect, useState } from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";

import NepaliDate from "nepali-date-converter";


function AddValidityAddPaymentPackage(props) {
    const [Poptype, setPoptype] = useState(props.Type);
    const [Details, setDetails] = useState(props.Details);

    const [DefaultValueOfEditPayment, setDefaultValueOfEditPayment] = useState("");

    const [ApiError, setApiError] = useState(false);
    const [HaveApiErrorArray, setHaveApiErrorArray] = useState(false);
    const [ApiErrorArray, setApiErrorArray] = useState([]);
    const [ApiErrorMessage, setApiErrorMessage] = useState("");
    const [EditState, setEditState] = useState("nothing");
    const [ApiLoading, setApiLoading] = useState(false);

    const cancelClick = () => {
        // setDetails(null);
        setApiError(false);
        setHaveApiErrorArray(false);
        setApiErrorArray([]);
        setApiErrorMessage("");
        setEditState("");
        setApiLoading(false);



        props.setLoadingListDetails(false);
        props.setTrigger(false);


        setOptionSelected(props.PackageTypes[0]['id']);
        let expDate = new Date();
        let startDate = new Date();
        expDate.setDate(startDate.getDate() + parseInt(props.PackageTypes[0]['validity_in_day']))
        setvalidity_in_day(props.PackageTypes[0]['validity_in_day']);
        settype_cost(props.PackageTypes[0]['cost']);
        setEndDate(expDate);
        setstartDate(startDate);
        setEditPayment("");

    }

    useEffect(() => {
        // console.log("roshan is good boy", Details.length);

        if (Details) {
            console.log("roshan is good boy", Details.package_taken.length);
            console.log("go to hell");
            if (Details.package_taken.length != 0) {
                setDefaultValueOfEditPayment(Details.package_taken[Details.package_taken.length - 1]['paid'])
            } else {
                setDefaultValueOfEditPayment(0);

            }


        } else {
            console.log(" dont go to hell");

        }

        // if (Details) {
        //     setDefaultValueOfEditPayment(Details.package_taken[Details.package_taken.length - 1]['paid'])
        // }

        setDetails(props.Details);
        setPoptype(props.Type)
        if (props.Type === "validity") {
            // console.log("type is validity ajhsgd");
            const component = document.querySelector(
                `input[name=editinput]`
            );

            // If found, focus the next field
            if (component !== null) {
                component.defaultValue = 0;
            }

        }






    }, [props.Trigger][props.Details])

    const [EditPayment, setEditPayment] = useState("");
    const OnChangeEditPayment = (e) => {
        setEditPayment(e.target.value);
    }
    const OnEditSubmit = () => {

        var endpoint = '';
        switch (props.PageType) {
            case ('membership'):
                endpoint = requests.package_taken;
                break;
            case ('package'):
                endpoint = requests.package_taken;
                break;
            default:
                break;
        }

        setApiLoading(true);
        setEditState("please wait");
        axios.put(requests.baseurl + endpoint + "/" + props.EditItemId, { paid: EditPayment }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                // setLoadingListDetails(false);
                // CloseSelected()

                setApiLoading(false);
                setEditState("success");

                props.setTrigger(false);
                props.Reload();
                props.setLoadingListDetails(false);
                props.Reload(0)
                // setDetails(null);

                setOptionSelected(null);
                setvalidity_in_day(null)
                settype_cost(null)





                setOptionSelected(props.PackageTypes[0]['id']);
                let expDate = new Date();
                let startDate = new Date();
                expDate.setDate(startDate.getDate() + parseInt(props.PackageTypes[0]['validity_in_day']))
                setvalidity_in_day(props.PackageTypes[0]['validity_in_day']);
                settype_cost(props.PackageTypes[0]['cost']);
                setEndDate(expDate);
                setstartDate(startDate);
                setEditPayment("");

            })
            .catch(error => {
                setApiLoading(false);
                setEditState("Failed");

                setApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setHaveApiErrorArray(true);
                        setApiErrorArray(error.response.data.details);
                    } else {
                        setApiError(true);
                        setApiErrorMessage(error);
                    }
                }
                else {
                    setApiErrorMessage("Request Server Error");
                }
            })

    }







    const [OptionSelected, setOptionSelected] = useState(null);
    const [validity_in_day, setvalidity_in_day] = useState(null)
    const [type_cost, settype_cost] = useState(null)


    const defaultDate = new Date()

    const [startDate, setstartDate] = useState(defaultDate)
    const [EndDate, setEndDate] = useState(defaultDate)

    useEffect(() => {
        if (props.PackageTypes) {
            setOptionSelected(props.PackageTypes[0]['id']);
            let expDate = new Date();
            let startDate = new Date();
            expDate.setDate(startDate.getDate() + parseInt(props.PackageTypes[0]['validity_in_day']))
            setvalidity_in_day(props.PackageTypes[0]['validity_in_day']);
            settype_cost(props.PackageTypes[0]['cost']);
            setEndDate(expDate);
            setstartDate(startDate);
            setEditPayment("");
        }
    }, [props.PackageTypes]);

    const OnTypeChange = (e) => {
        setOptionSelected(e.target.value)
        // console.log("option selected:", e.target.value);
        let expDate = new Date();
        let startDate = new Date();
        const index = props.PackageTypes.findIndex(item => item.id == e.target.value);
        expDate.setDate(startDate.getDate() + parseInt(props.PackageTypes[index]['validity_in_day']))
        setEndDate(expDate);
        setstartDate(startDate);
        // console.log("start Date:", startDate);
        // console.log("end Date:", expDate);
        setvalidity_in_day(props.PackageTypes[index]['validity_in_day']);
        settype_cost(props.PackageTypes[index]['cost']);
    }






    const addValidityConfirm = () => {
        // console.log("selected type is :", OptionSelected);

        var endpoint = '';
        switch (props.PageType) {
            case ('membership'):
                endpoint = requests.package_taken;
                break;
            case ('package'):
                endpoint = requests.package_taken;
                break;
            default:
                break;
        }

        setApiLoading(true);
        setEditState("please wait");
        axios.post(requests.baseurl + endpoint + "/" + props.EditItemId, { package_type_id: OptionSelected, paid: EditPayment }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                // setLoadingListDetails(false);
                // CloseSelected()
                console.log("I am here 1", props.PackageTypes[0]['validity_in_day']);


                setApiLoading(false);
                setEditState("success");







                setOptionSelected(props.PackageTypes[0]['id']);
                let expDate = new Date();
                let startDate = new Date();
                expDate.setDate(startDate.getDate() + parseInt(props.PackageTypes[0]['validity_in_day']))
                setvalidity_in_day(props.PackageTypes[0]['validity_in_day']);
                settype_cost(props.PackageTypes[0]['cost']);
                setEndDate(expDate);
                setstartDate(startDate);
                setEditPayment("");



                props.setLoadingListDetails(false);
                props.Reload(0);
                console.log("I am here n", props.PackageTypes[0]['validity_in_day']);

                // setDetails(null);
                props.setTrigger(false);
                props.Reload();

            })
            .catch(error => {
                setApiLoading(false);
                setEditState("Failed");

                setApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setHaveApiErrorArray(true);
                        setApiErrorArray(error.response.data.details);
                    } else {
                        setApiError(true);
                        setApiErrorMessage(error);
                    }
                }
                else {
                    setApiErrorMessage("Request Server Error");
                }
            })

    }
















    return (props.Trigger) ? (
        <>
            <div className="popup-container d-nones">
                {(() => {
                    switch (Poptype) {
                        case "validity":
                            return (
                                <>
                                    <div className="popup-3 card">
                                        <div className="card-header">
                                            Choose type
                                        </div>
                                        <div className="card-body text-nowrap">
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Client Type</span>
                                                {/* <select className="form-select form-select-sm">
                                                    <option value="whatever">Value 1</option>
                                                    <option value="whatever">Value 1</option>
                                                    <option value="whatever">Value 1</option>
                                                </select> */}
                                                {props.PackageTypes ? (
                                                    <>
                                                        <select defaultValue={props.PackageTypes[0]['id']} onChange={OnTypeChange} id="card_type" className="form-select form-select-sm">
                                                            {

                                                                Object.keys(props.PackageTypes).map((error, index) => (
                                                                    <option key={index} value={props.PackageTypes[error]['id']} >{props.PackageTypes[error]['type_name']}</option>
                                                                ))

                                                            }
                                                        </select>
                                                    </>
                                                ) : (<>please wait ...</>)}
                                            </div>
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Validity In Days</span>
                                                <span className="mx-2"> {validity_in_day} days</span>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Cost</span>
                                                <span className="mx-2">Rs {type_cost}</span>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Starting Date</span>
                                                <span className="mx-2">
                                                    {new NepaliDate(new Date(startDate)).format('DD, MMMM YYYY')}
                                                </span>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Ending Date</span>
                                                <span className="mx-2">
                                                    {new NepaliDate(new Date(EndDate)).format('DD, MMMM YYYY')}
                                                </span>
                                            </div>
                                            <div className="mb-2 d-flex align-items-center">
                                                <span className="mx-2">Paid</span>
                                                <input onChange={OnChangeEditPayment} defaultValue={EditPayment} disabled={ApiLoading} autoFocus type="number" className="form-control form-control-sm" name="variable-name" />
                                            </div>
                                        </div>
                                        <div className="card-footer text-center d-flex justify-content-between">
                                            {/* add or remove buttons as your wish */}
                                            <button onClick={addValidityConfirm} className="btn btn-sm btn-success text-white">Add</button>
                                            <button onClick={cancelClick} className="btn btn-sm btn-danger text-white">Cancel</button>
                                        </div>
                                    </div>
                                </>
                            )
                            break;
                        case "payment":
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

                                                        <input onChange={OnChangeEditPayment} defaultValue={DefaultValueOfEditPayment} disabled={ApiLoading} autoFocus type="number" className="form-control form-control-sm" name="editinput" />

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
                                            {!ApiError ? (<><button onClick={OnEditSubmit} disabled={ApiLoading} className="btn btn-sm btn-success text-white" name="popSubmit" >Apply</button></>) : (<></>)}  {ApiLoading ? (<>{EditState}</>) : (<></>)}
                                            <button onClick={cancelClick} disabled={ApiLoading} className={`${ApiError ? 'ms-auto' : ''} btn btn-sm btn-danger text-white`}>Cancel</button>

                                        </div>
                                    </div>
                                </>
                            )
                            break;
                        default:
                            break;
                    }


                })()}
            </div>
        </>
    ) : (<></>);
}
export default AddValidityAddPaymentPackage