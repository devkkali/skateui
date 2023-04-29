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
import MessagePopup2 from "../components/MessagePopup2";

function Home3() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Home 2 testing");

    const [activeSuggestion, setactiveSuggestion] = useState(0);
    const [filteredSuggestions, setfilteredSuggestions] = useState([]);
    const [showSuggestions, setshowSuggestions] = useState(false);
    const [userInput, setuserInput] = useState("");
    const [suggestions, setsuggestions] = useState([]);

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

    const onSuggestionClick = (e) => {
        setactiveSuggestion(0);
        setfilteredSuggestions([]);
        setshowSuggestions(false);
        setuserInput(filteredSuggestions[activeSuggestion].name);

        const phoneinput = document.querySelector(
            `input[name=phone_no]`
        );
        if (phoneinput !== null) {
            phoneinput.defaultValue = filteredSuggestions[activeSuggestion].phone_no;
        }

        // console.log("suggestion is clicked");


    }


    const nameOnBlur = () => {
        setshowSuggestions(false);
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

                    const nameinput = document.querySelector(
                        `input[name=name]`
                    );
                    if (nameinput !== null) {
                        nameinput.value = filteredSuggestions[activeSuggestion].name;
                    }

                    const phoneinput = document.querySelector(
                        `input[name=phone_no]`
                    );
                    if (phoneinput !== null) {
                        phoneinput.value = filteredSuggestions[activeSuggestion].phone_no;
                    }

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

                // changeFocusToNoOfClient(e);


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
        }
    }





    const SuggestionsListComponent = () => {
        console.log("arey");
        // return(<>hello</>);
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                return (
                    <ul class="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            console.log(suggestion.name);
                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = "suggestion-active";
                            }

                            return (
                                <li className={className} key={suggestion.id} onClick={onSuggestionClick}>
                                    {suggestion.name} | [{suggestion.phone_no}]
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {

                return (
                    <div class="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                )


            }
        } else {
            return null;
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

    }, []);







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


    const [HaveDetails, setHaveDetails] = useState(false);
    const [CardNumber, setCardNumber] = useState("");


    const OnChangeCardNumber = (e) => {
        setCardNumber(e.target.value);
    }


    const handleCardNoEntered = () => {
        setispop(true);
        console.log("card number is entered");
    }












    const [ispop, setispop] = useState(false);
    const [messagetype, setmessagetype] = useState("success");

    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}
            {<MessagePopup2 isPop={ispop} setisPop={setispop} messagetype={messagetype} />}

            {<Header />}
            {/*  start body content */}
            <div className="body-content p-4">
                <div className="wrapper">
                    <p className="page-title  mb-3">Parking In</p>
                    <div>
                        <div className="bg-white p-4 rounded">
                            <label htmlFor="card_number" className="form-label">Card Number</label>
                            <input autoComplete="off" autoFocus onChange={OnChangeCardNumber} value={CardNumber} onKeyPress={event => { if (event.key === 'Enter') { handleCardNoEntered(event) } }} placeholder="Enter / Scan Card Number" type="number" id="card_number" name="card_number" className="form-control" />
                        </div>

                        {HaveDetails ? (
                            <>
                                <div className="bg-white rounded p-3 my-2">
                                    <span className="client-type">
                                        {/* {CardType} */}
                                        {/* {CardType ? convertFirstCharacterAllWordsToUppercase(CardType) : null} */}
                                        Normal Client
                                    </span>
                                    <div className="row mt-3">

                                        <div className="col mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input name="name" autoComplete="off" onChange={onChange} onKeyDown={OnKeyDownSuggestion} onBlur={nameOnBlur} placeholder="Client's name" type="text" id="name" className="form-control" />
                                            {/* <input autoComplete="off" disabled={isNameDisable} onChange={onChange} onKeyDown={OnKeyDownSuggestion} value={userInput} placeholder="Client's name" type="text" id="name" className="form-control" /> */}
                                            <SuggestionsListComponent />
                                        </div>






                                        <div className="col mb-3">
                                            <label htmlFor="clients" className="form-label">Number of clients</label>
                                            <input name="no_of_client" placeholder="Total clients" type="number" id="clients" className="form-control" />
                                        </div>





                                    </div>

                                    <div className="row">
                                        <div className="col mb-3">
                                            <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                            <input name="phone_no" placeholder="Client's phone number" type="number" id="phone" className="form-control" />
                                        </div>
                                        <div className="col mb-3">
                                            <label htmlFor="deposit" className="form-label">Deposit</label>
                                            <input name="deposit" placeholder="Deposit amount" type="number" id="deposit" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="text-end mt-3">
                                        {/* <input type="submit" /> */}
                                        <button type="submit" name="entry" className="btn btn-success text-white px-3 ">Entry</button>
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
                            <div>
                                <div className="my-auto p-3 mat-4 text-center screen-centered-loading">

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
export default Home3