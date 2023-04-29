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

function Home2() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Parking In");

    const [activeSuggestion, setactiveSuggestion] = useState(0);
    const [filteredSuggestions, setfilteredSuggestions] = useState([]);
    const [showSuggestions, setshowSuggestions] = useState(false);
    const [userInput, setuserInput] = useState("");
    const [suggestions, setsuggestions] = useState([]);
    const [SuggestionRefresh, setSuggestionRefresh] = useState(0);

    const onChange = (e) => {

        setuserInput(e.target.value);

        setfilteredSuggestions(
            suggestions.filter((suggestion) =>
                suggestion.name.toLowerCase().includes(userInput.toLowerCase()))
            // suggestion.toLowerCase().indexOf(userInput.toLocaleLowerCase()) > 1)
        );
        setactiveSuggestion(-1);
        // setfilteredSuggestions(true)
        setshowSuggestions(true);
        setuserInput(e.target.value);
        // console.log(filteredSuggestions);
    }

    const onSuggestionClick = (index) => {
        console.log("suggestion is clicked:"+index);
        console.log(filteredSuggestions);
        let selected =0;
        setactiveSuggestion(0);
        console.log("active suggestion is", activeSuggestion);

        setuserInput(filteredSuggestions[index].name);

        setphoneNumber(filteredSuggestions[index].phone_no)


        console.log("suggestion is clicked");

        

        setfilteredSuggestions([]);
        setshowSuggestions(false);
    }


    const nameOnBlur = () => {
        // setshowSuggestions(false);
    }



    const OnKeyDownSuggestion = (e) => {
        console.log("active suggestion is", activeSuggestion);
        console.log("name in activeSuggestion", filteredSuggestions[activeSuggestion]?.name)
        console.log("value in e", e.target.value);
        if (e.keyCode === 13) {

            if (e.target.value != "") {
                setshowSuggestions(false);
                if (activeSuggestion != -1) {
                    console.log("i am here 13")
                    // setactiveSuggestion(0);


                    setuserInput(filteredSuggestions[activeSuggestion].name)
                    console.log("value to set in input", filteredSuggestions[activeSuggestion].name);

                    // const nameinput = document.querySelector(
                    //     `input[name=name]`
                    // );
                    // if (nameinput !== null) {
                    //     nameinput.value = filteredSuggestions[activeSuggestion].name;
                    // }


                    // const phoneinput = document.querySelector(
                    //     `input[name=phone_no]`
                    // );
                    // if (phoneinput !== null) {
                    //     phoneinput.value = filteredSuggestions[activeSuggestion].phone_no;
                    // }
                    setphoneNumber(filteredSuggestions[activeSuggestion].phone_no)

                } else {
                    console.log("kkkkk")
                    setuserInput(e.target.value)
                    const nameinput = document.querySelector(
                        `input[name=name]`
                    );
                    if (nameinput !== null) {
                        nameinput.value = e.target.value;
                    }
                }

                console.log("value in input", userInput);

                changeFocusToNoOfClient(e);


            }



        } else if (e.keyCode === 38) {
            console.log("i am here 38")
            if (activeSuggestion === 0) {
                return;
            }
            setactiveSuggestion(activeSuggestion - 1);
        } else if (e.keyCode === 40) {
            console.log("i am here 40")
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setactiveSuggestion(activeSuggestion + 1);
        }else if(e.keyCode === 9 ){
            setshowSuggestions(false);
            console.log("hi");
        }
    }






























    useEffect(() => {
        axios.get(requests.get_suggestion_list, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res.data.details);
                setsuggestions(res.data.details)

            })

            .catch(error => {
                console.log(error.response.data.message)
            })

    }, [SuggestionRefresh]);




























    const SuggestionsListComponent = () => {
        // console.log("arey");
        // return(<>hello</>);
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                return (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            // console.log(suggestion.id);
                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion.id} onClick={onSuggestionClick.bind(this,index)} >
                                    {suggestion.name} | [{suggestion.phone_no}]
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {

                return (
                    <div className="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                )


            }
        } else {
            return null;
        }
    }






































































































































    // const { register, formState: { errors }, handleSubmit, reset } = useForm();

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
        e.preventDefault();

        if (CardNumber === "") {
            dispatch(setisPop('true'));
            dispatch(setmessagetype('error'));
            dispatch(setheading('Error'));
            dispatch(setcontent('please enter a card !!'));
        } else {


            setSuggestionRefresh(SuggestionRefresh + 1);



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
                    setactiveSuggestion(0);
                    setuserInput("");
                    // reset();

                    setnoOfClients("");
                    setphoneNumber("");
                    setdeposit("");

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

                                    setuserInput(res.data.details.name);
                                    setnoOfClients(1);
                                    setphoneNumber(res.data.details.phone)


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
                                    if (res.data.details.type === "package") {
                                        var warning = {
                                            "Remaining Hour": res.data.details.remaining_days + ' Hours',
                                            "Remaining Payment": 'Rs ' + res.data.details.remaining_payment,
                                        };

                                    } else {
                                        var warning = {
                                            "Remaining Hour": res.data.details.remaining_days + ' Hours',
                                        };

                                    }



                                    dispatch(setdataArray(warning));

                                    dispatch(setcontent('Card is expiring soon !!'));
                                    setIsWarning(1);
                                } else {

                                    if (res.data.details.type === 'membership' || res.data.details.type === 'package') {

                                        // If found, focus the next field

                                        console.log("i am here");
                                        // nameElement.value = res.data.details.name;
                                        setuserInput(res.data.details.name);
                                        setnoOfClients(1);
                                        setphoneNumber(res.data.details.phone)


                                        setisClientsDisable(true);



                                        if (res.data.details.type === 'package') {
                                            setisNameDisable(true);
                                            setisPhoneDisable(true);
                                            setisDepositDisable(true);
                                            setisDisable(false);

                                            const nextSibling = document.querySelector(
                                                `button[name=entry]`
                                            );

                                            // If found, focus the next field
                                            if (nextSibling !== null) {
                                                nextSibling.focus();
                                            }
                                            

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


                                    } else {
                                        const nextSibling = document.querySelector(
                                            `input[name=name]`
                                        );


                                        if (nextSibling !== null) {
                                            nextSibling.focus();
                                        }

                                    }


                                }



                            }

                            setCardType(res.data.details.type + ' client');
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

            console.log('type', CardType);
            console.log('change focus to No of Client', CardType);

            if (CardType === 'membership client' || CardType === 'package client') {
                console.log('member or package');
                const nextSibling = document.querySelector(
                    `input[name=phone_no]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            } else {
                console.log('normal');
                const nextSibling = document.querySelector(
                    `input[name=no_of_client]`
                );
                if (nextSibling !== null) {
                    console.log(nextSibling);
                    nextSibling.focus();
                }


            }


        }







    }
    const changeFocusToPhone = (e) => {
        if (e.target.value != "") {
            console.log("change focus to phone is called");
            const nextSibling = document.querySelector(
                `input[name=phone_no]`
            );

            // If found, focus the next field
            if (nextSibling !== null) {
                nextSibling.focus();
            }

        }

    }
    const changeFocusToDeposit = (e) => {
        if (e.target.value != "") {
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


    const onSubmitEntry = (e) => {


        console.log("userInput", userInput);

        if (CardNumber === "") {
            dispatch(setisPop('true'));
            dispatch(setmessagetype('error'));
            dispatch(setheading('Error'));
            dispatch(setcontent('please enter a card !!'));
        } else {

            axios.post(requests.parkIn + "/" + CardNumber, { name: userInput, no_of_client: noOfClients, phone_no: phoneNumber, deposit: deposit }, {
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

            setuserInput("");
            setnoOfClients("");
            setphoneNumber("");
            setdeposit("");
        }
    };

    const OnChnageNoOfClients = (e) => {
        setnoOfClients(e.target.value);
    }
    const OnChangePhoneNumber = (e) => {
        setphoneNumber(e.target.value);
    }
    const [isDisable, setisDisable] = useState(true);
    const OnChangeDeposit = (e) => {
        setdeposit(e.target.value);
        setisDisable(false);
    }
    const [noOfClients, setnoOfClients] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [deposit, setdeposit] = useState("");

    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}
            {<MessagePopup />}

            {<Header />}
            {/*  start body content */}
            <div className="body-content p-4">
                <div className="wrapper">
                    <p className="page-title  mb-3">Parking In</p>



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
                                            {/* <input onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_num" className="form-control" /> */}
                                            <input autoComplete="off" onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_num" className="form-control" />
                                            {/* <input {...register("card_id", { required: true })} onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} autoFocus placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" /> */}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-white p-4 rounded">
                                            <label htmlFor="card_number" className="form-label">Card Number</label>
                                            <input autoComplete="off" onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} ref={card_number} autoFocus onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" />
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

                                        <div className="col mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input name="name" value={userInput} autoComplete="off" disabled={isNameDisable} onChange={onChange} onKeyDown={OnKeyDownSuggestion} onBlur={nameOnBlur} placeholder="Client's name" type="text" id="name" className="form-control" />
                                            {/* <input name="name" value={userInput} autoComplete="off" disabled={isNameDisable} onChange={onChange} onBlur={nameOnBlur} placeholder="Client's name" type="text" id="name" className="form-control" /> */}
                                            {/* <input autoComplete="off" disabled={isNameDisable} onChange={onChange} onKeyDown={OnKeyDownSuggestion} value={userInput} placeholder="Client's name" type="text" id="name" className="form-control" /> */}
                                            <SuggestionsListComponent />
                                        </div>


                                        <>
                                            <div className="col mb-3">
                                                <label htmlFor="no_of_client" className="form-label">Number of clients</label>
                                                <input name="no_of_client" value={noOfClients} onChange={OnChnageNoOfClients} disabled={isClientsDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToPhone(event) } }} placeholder="Total clients" type="number" id="clients" className="form-control" />
                                            </div>
                                        </>

                                    </div>

                                    <div className="row">
                                        <div className="col mb-3">
                                            <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                            <input name="phone_no" value={phoneNumber} onChange={OnChangePhoneNumber} disabled={isPhoneDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToDeposit(event) } }} placeholder="Client's phone number" type="number" id="phone" className="form-control" />
                                        </div>
                                        <div className="col mb-3">
                                            <label htmlFor="deposit" className="form-label">Deposit</label>
                                            <input name="deposit" value={deposit} onChange={OnChangeDeposit} disabled={isDepositDisable} onKeyPress={event => { if (event.key === 'Enter') { changeFocusToEntry(event) } }} placeholder="Deposit amount" type="number" id="deposit" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="text-end mt-3">
                                        {/* <input type="submit" /> */}
                                        <button onClick={onSubmitEntry} disabled={isDisable} name="entry" className="btn btn-success text-white px-3 ">Entry</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}

                    </div>


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
export default Home2