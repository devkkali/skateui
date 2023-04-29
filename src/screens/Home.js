import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthState, fetchUserBytoken, userAuth } from "../feature/authSlice";
import loading from '../images/loading3.gif'
import loading2 from '../images/loading2.gif'
import Header from "../components/Header";
import axios from "../helpers/axios";
import requests from "../helpers/Requests";
import MessagePopup from "../components/MessagePopup";
import { clearPopState, messagePop, setcontent, setheading, setisPop, setmessagetype, setdataArray } from "../feature/messagePopSlice";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDocumentTitle } from "../helpers/setDocumentTitle";

function Home() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Home | Parking In");

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const card_number = useRef(null);
    const { isPop, messagetype, heading, content, dataArray } = useSelector(messagePop);
    let loggedIn = false;
    if (localStorage.getItem('token')) {
        loggedIn = true;
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name, email, isFetching, isSuccess, isError, errorMessage } = useSelector(userAuth)
    useEffect(() => {
        if (loggedIn) {
            dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
        }
    }, []);

    useEffect(() => {
        if (isError && loggedIn) {
            localStorage.removeItem('token');
            dispatch(clearAuthState());
            navigate('/login');
        }
    }, [isError]);



    const [isNameDisable, setisNameDisable] = useState(false);
    const [isClientsDisable, setisClientsDisable] = useState(false);
    const [isPhoneDisable, setisPhoneDisable] = useState(false);
    const [isDepositDisable, setisDepositDisable] = useState(false);

    const [HaveDetails, setHaveDetails] = useState(false);
    const [LoadingCard, setLoadingCard] = useState(false);
    const [CardType, setCardType] = useState(null);
    const [IsWarning, setIsWarning] = useState(0);
    const [IsAutofFocus, setIsAutoFocus] = useState("autoFocus");

    const [CardNumber, setCardNumber] = useState("");


    useEffect(() => {
        // console.log(isPop);
        setLoadingCard(isPop);
        setisDisable(false);
        if (IsWarning === 1 && isPop === false) {
            console.log('hi')

            if (CardType === "membership client") {
                const nextSibling = document.querySelector(
                    `input[name=deposit]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            } else if (CardType === "package client") {
                const nextSibling = document.querySelector(
                    `button[name=entry]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }


        }
    }, [isPop]);

    // useEffect(() => {



    // }, [IsWarning]);


    const handleCardNoEntered = (e) => {

        if (CardNumber === "") {
            dispatch(setisPop('true'));
            dispatch(setmessagetype('error'));
            dispatch(setheading('Error'));
            dispatch(setcontent('please enter a card !!'));
        } else {





            setLoadingCard(true);
            setHaveDetails(false);
            setCardType(null);
            setisDisable(true);

            setisNameDisable(false);
            setisClientsDisable(false);
            setisPhoneDisable(false);
            setisDepositDisable(false);

            axios.get(requests.parkInCheck + '/' + e.target.value, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    // console.log(res.data.details.type);
                    // setCardType(res.data.details.type+' Client')
                    setLoadingCard(false);

                    if (res.data.details.type === 'no') {
                        dispatch(setisPop('true'));
                        setCardNumber("");
                        dispatch(setmessagetype('error'));
                        dispatch(setheading('Error'));
                        dispatch(setcontent('Card does not exist !!'));
                    } else {
                        if (res.data.details.expired === 1) {
                            dispatch(setisPop('true'));
                            setCardNumber("");
                            dispatch(setmessagetype('error'));
                            dispatch(setheading('Error'));
                            dispatch(setcontent('Card is expired !!'));
                        } else {
                            if (res.data.details.isin === 1) {
                                dispatch(setisPop('true'));
                                setCardNumber("");
                                dispatch(setmessagetype('error'));
                                dispatch(setheading('Error'));
                                dispatch(setcontent('Card is already in !!'));
                            } else {
                                setHaveDetails(true);

                                if (res.data.details.remaining_days < 48 && (res.data.details.type === 'membership' || res.data.details.type === 'package')) {
                                    const nameElement = document.querySelector(
                                        `input[name=name]`
                                    );
                                    const clientsElement = document.querySelector(
                                        `input[name=no_of_client]`
                                    );
                                    const phoneElement = document.querySelector(
                                        `input[name=phone_no]`
                                    );
                                    nameElement.value = res.data.details.name;
                                    clientsElement.value = 1;
                                    phoneElement.value = res.data.details.phone;

                                    setisClientsDisable(true);
                                    if (res.data.details.type === 'package') {
                                        setisNameDisable(true);
                                        setisPhoneDisable(true);
                                        setisDepositDisable(true);

                                    } else if (res.data.details.type === 'membership') {
                                        setisNameDisable(true);
                                        setisPhoneDisable(true);
                                    }

                                    dispatch(setisPop('true'));
                                    dispatch(setmessagetype('warningdata'));
                                    dispatch(setheading('Warning'));
                                    var warning = {
                                        "Remaining Hour": res.data.details.remaining_days + ' Hours',
                                        "Remaining Payment": 'Rs ' + res.data.details.remaining_payment,
                                    };


                                    dispatch(setdataArray(warning));

                                    dispatch(setcontent('Card is expiring soon !!'));
                                    setIsWarning(1);
                                } else {

                                    if (res.data.details.type === 'membership' || res.data.details.type === 'package') {


                                        const nameElement = document.querySelector(
                                            `input[name=name]`
                                        );
                                        const clientsElement = document.querySelector(
                                            `input[name=no_of_client]`
                                        );
                                        const phoneElement = document.querySelector(
                                            `input[name=phone_no]`
                                        );


                                        // If found, focus the next field
                                        if (nameElement !== null) {

                                            console.log("i am here");
                                            nameElement.value = res.data.details.name;
                                            clientsElement.value = 1;
                                            phoneElement.value = res.data.details.phone;

                                            setisClientsDisable(true);



                                            if (res.data.details.type === 'package') {
                                                setisNameDisable(true);
                                                setisPhoneDisable(true);
                                                setisDepositDisable(true);

                                            } else if (res.data.details.type === 'membership') {
                                                setisNameDisable(true);
                                                setisPhoneDisable(true);
                                                const nextSibling = document.querySelector(
                                                    `input[name=deposit]`
                                                );

                                                // If found, focus the next field
                                                if (nextSibling !== null) {
                                                    nextSibling.focus();
                                                }
                                            }

                                        }







                                    } else {
                                        const nextSibling = document.querySelector(
                                            `input[name=name]`
                                        );


                                        if (nextSibling !== null) {
                                            nextSibling.focus();
                                        }

                                    }



                                }

                                setCardType(res.data.details.type + ' client');
                            }
                        }
                    }
                })

                .catch(error => {
                    setLoadingCard(false);
                    setHaveDetails(false);
                    setCardNumber(0);

                    dispatch(clearPopState());
                    dispatch(setisPop('true'));
                    dispatch(setheading('Error'));
                    dispatch(setcontent('some thing went wrong'));


                    // console.log(error.response.data.message)
                })

            // setOnAddSubjectState(true);


        }

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

    const cardinputOnchange = (e) => {
        var change = {};
        change = e.target.value;
        // console.log(change);
        setCardNumber(change);
        setIsWarning(0);

    }

    const changeFocusToNoOfClient = (e) => {

        if (e.target.value != "") {
            if (CardType === 'membership client' || CardType === 'package client') {
                console.log('member or package');
                const nextSibling = document.querySelector(
                    `input[name=phone_no]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            } else {
                const nextSibling = document.querySelector(
                    `input[name=no_of_client]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }

            }

        }









    }
    const changeFocusToPhone = (e) => {
        const nextSibling = document.querySelector(
            `input[name=phone_no]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
            nextSibling.focus();
        }
    }
    const changeFocusToDeposit = (e) => {


        if (CardType === 'membership client') {
            console.log('member or package');
            const nextSibling = document.querySelector(
                `input[name=deposit]`
            );
            if (nextSibling !== null) {
                nextSibling.focus();
            }
        } else if (CardType === 'package client') {

        } else {
            const nextSibling = document.querySelector(
                `input[name=no_of_client]`
            );
            if (nextSibling !== null) {
                nextSibling.focus();
            }

        }




        const nextSibling = document.querySelector(
            `input[name=deposit]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
            nextSibling.focus();
        }
    }


    const [isDisable, setisDisable] = useState(true);
    const depositeChange = () => {
        setisDisable(false);

    }


    const changeFocusToEntry = (e) => {

        const nextSibling = document.querySelector(
            `button[name=entry]`
        );

        // If found, focus the next field
        setisDisable(false);
        if (nextSibling !== null) {
            nextSibling.focus();
        }
    }


    const onSubmitEntry = (data) => {

        if (CardNumber === "") {
            dispatch(setisPop('true'));
            dispatch(setmessagetype('error'));
            dispatch(setheading('Error'));
            dispatch(setcontent('please enter a card !!'));
        } else {

            axios.post(requests.parkIn + "/" + CardNumber, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    // console.log(res);
                    if (res.data.error == 'false') {
                        dispatch(setisPop('true'));
                        setCardNumber("");
                        dispatch(setmessagetype('success'));
                        dispatch(setheading('Success'));
                        dispatch(setcontent('Parked Successfully !!'));
                    }

                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status == 422) {

                        dispatch(setisPop('true'));
                        setCardNumber("");
                        dispatch(setmessagetype('data'));
                        dispatch(setheading('Error'));
                        dispatch(setcontent('error'));
                        dispatch(setdataArray(err.response.data.details));

                    } else {
                        alert(err);
                    }
                    // setIsWarning(0);
                });
            setIsWarning(0);

            setisDisable(true);
            setHaveDetails(false);
            setCardNumber('');
            reset();
        }
    };

    // useEffect(() => {
    //     console.log(errors);
    // }, [errors]);


    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}
            {<MessagePopup />}

            {<Header />}
            {/*  start body content */}
            <div className="body-content p-4">
                <div className="wrapper">
                    <p className="page-title  mb-3">Parking In</p>


                    <form onSubmit={handleSubmit(onSubmitEntry)} method="POST">
                        <div>

                            {LoadingCard ? (
                                <>
                                </>
                            ) : (
                                <>

                                    {IsWarning === 1 ? (
                                        <>
                                            <div className="bg-white p-4 rounded">
                                                <label htmlFor="card_num" className="form-label">Card Number</label>
                                                <input onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_num" className="form-control" />
                                                {/* <input {...register("card_id", { required: true })} onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} autoFocus placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" /> */}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-white p-4 rounded">
                                                <label htmlFor="card_number" className="form-label">Card Number</label>
                                                <input onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} autoFocus onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" />
                                                {/* <input {...register("card_id", { required: true })} onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} autoFocus placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" /> */}
                                            </div>
                                        </>
                                    )}




                                </>
                            )}



                            {HaveDetails ? (
                                <>
                                    <div className="bg-white rounded p-3 my-2">
                                        <span className="client-type">
                                            {/* {CardType} */}
                                            {CardType ? convertFirstCharacterAllWordsToUppercase(CardType) : null}
                                            {/* Normal Client */}
                                        </span>
                                        <div className="row mt-3">
                                            {isNameDisable ? (<>
                                                <div className="col mb-3">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input disabled={isNameDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToNoOfClient(event) } }} placeholder="Client's name" type="text" id="name" className="form-control" />
                                                </div>

                                            </>
                                            ) : (
                                                <>
                                                    <div className="col mb-3">
                                                        <label htmlFor="name" className="form-label">Name</label>
                                                        <input {...register("name", { required: true })} disabled={isNameDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToNoOfClient(event) } }} placeholder="Client's name" type="text" id="name" className="form-control" />
                                                    </div>
                                                </>
                                            )}




                                            {isClientsDisable ? (
                                                <>
                                                    <div className="col mb-3">
                                                        <label htmlFor="clients" className="form-label">Number of clients</label>
                                                        <input disabled={isClientsDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToPhone(event) } }} placeholder="Total clients" type="number" id="clients" className="form-control" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="col mb-3">
                                                        <label htmlFor="clients" className="form-label">Number of clients</label>
                                                        <input {...register("no_of_client", { required: true })} disabled={isClientsDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToPhone(event) } }} placeholder="Total clients" type="number" id="clients" className="form-control" />
                                                    </div>
                                                </>
                                            )}




                                        </div>

                                        <div className="row">
                                            <div className="col mb-3">
                                                <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                                <input {...register("phone_no")} disabled={isPhoneDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToDeposit(event) } }} placeholder="Client's phone number" type="number" id="phone" className="form-control" />
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="deposit" className="form-label">Deposit</label>
                                                <input {...register("deposit")} disabled={isDepositDisable} onChange={depositeChange} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToEntry(event) } }} placeholder="Deposit amount" type="number" id="deposit" className="form-control" />
                                            </div>
                                        </div>

                                        <ErrorMessage errors={errors} name="singleErrorInput" />
                                        <ErrorMessage
                                            errors={errors}
                                            name="singleErrorInput"
                                            render={({ message }) => <p>{message}</p>}
                                        />
                                        <div className="text-end mt-3">
                                            {/* <input type="submit" /> */}
                                            <button onSubmit={handleSubmit(onSubmitEntry)} disabled={isDisable} type="submit" name="entry" className="btn btn-success text-white px-3 ">Entry</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}

                        </div>
                    </form>

                    {HaveDetails ? (
                        <>
                        </>
                    ) : (
                        <>
                            {/* for animation */}
                            {/* add d-none to previous div and remove d-none from below to view */}
                            <div>
                                {/* <div id="pot" >
                                    <img className="loading-animation-1" src={loading2} alt="loading..." />

                                </div> */}

                                <div className="my-auto p-3 mat-4 text-center screen-centered-loading">
                                    {/* <p className="display-1">⛷</p> */}
                                    {/* <img className="loading-animation-1" src={loading} alt="loading..." /> */}

                                    <p className="opacity-50">Loading ...</p>
                                </div>
                            </div>
                        </>
                    )
                    }
                </div>
            </div>
            {/* end body content  */}
        </>

    )
}
export default Home