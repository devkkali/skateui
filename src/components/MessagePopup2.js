import NepaliDate from "nepali-date-converter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPopState, messagePop } from "../feature/messagePopSlice";
import error from '../images/error.png'
import success from '../images/success.png'
import warning from '../images/warning.png'

function MessagePopup2(props) {
    // const { isPop, messagetype, heading, content, dataArray } = useSelector(messagePop);
    // const dispatch = useDispatch();
    console.log("isPop is:", props.isPop)
    console.log("messagetype is:", props.messagetype)
    console.log("heading is:", props.heading)
    console.log("content is:", props.content)
    console.log("dataArray is:", props.dataArray)
    const messageOk = () => {
        props.setisPop(false);
        // dispatch(clearPopState());
    }

    return (
        <>

            {props.isPop ? (
                <>
                    <div className="popup-container d-nones">

                        {(() => {
                            switch (props.messagetype) {
                                case 'data':
                                    return (<>
                                        {/* data popup */}
                                        <div className="popup-2 card">
                                            <div className="card-header">
                                                {props.heading}
                                            </div>
                                            <div className="card-body">


                                                <ul>

                                                    {Object.keys(props.dataArray).map((error, index) => (
                                                        <p key={error} className="mb-1">
                                                            <span className="fw-bold">{error}:</span>
                                                            <span className="ms-2 text-secondary">{props.dataArray[error][0]} </span>
                                                        </p>
                                                    ))}

                                                </ul>

                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}

                                                <button autoFocus onClick={messageOk} className="btn ms-auto btn-sm btn-success text-white">Ok</button>

                                            </div>
                                        </div>

                                    </>);
                                case 'warningdata':
                                    return (<>
                                        {/* data popup */}
                                        <div className="popup-2 card">
                                            <div className="card-header">
                                                <span className="text-warning fw-bold" >{props.heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={warning} />
                                                </span>
                                            </div>
                                            <div className="card-body">


                                                <ul className="nopadding">
                                                    {Object.entries(props.dataArray).map(([data, value]) => (
                                                        <p key={data} className="mb-1">
                                                            <span className="fw-bold ">{data}:</span>
                                                            <span className="ms-2 text-secondary text-danger">{value}</span>
                                                        </p>
                                                    ))}

                                                </ul>

                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}

                                                <button autoFocus onClick={messageOk} className="btn ms-auto btn-sm btn-warning text-white">Ok</button>

                                            </div>
                                        </div>

                                    </>);


                                case 'errordata':
                                    return (<>
                                        {/* data popup */}
                                        <div className="popup-2 card">
                                            <div className="card-header">
                                                {props.heading}
                                            </div>
                                            <div className="card-body">


                                                <ul>

                                                    {Object.keys(props.dataArray).map((error, index) => (
                                                        <p key={error} className="mb-1">
                                                            <span className="fw-bold text-danger">{error}:</span>
                                                            <span className="ms-2 text-secondary">{props.dataArray[error][0]} </span>
                                                        </p>
                                                    ))}

                                                </ul>

                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}

                                                <button autoFocus onClick={messageOk} className="btn ms-auto btn-sm btn-danger text-white">Ok</button>

                                            </div>
                                        </div>

                                    </>);

                                case 'success':
                                    return (<>
                                        {/* jun chainxa tesbata d-none remove garnu */}
                                        {/* message popup */}
                                        <div className="popup-1 card">
                                            <div className="card-header">
                                                <span className="text-success fw-bold" >{props.heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={success} />
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    {props.content}
                                                </p>
                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}
                                                {/* <button className="btn btn-sm btn-secondary">Neutral</button> */}
                                                {/* <button autoFocus onClick={messageOk} className={`btn btn-sm ${messagetype === 'success'?'btn-success':'btn-danger'}  ms-auto text-white`}>OK</button> */}
                                                <button autoFocus onClick={messageOk} className="btn btn-sm btn-success ms-auto text-white">OK</button>
                                            </div>
                                        </div>
                                    </>);
                                case 'error':
                                    return (<>
                                        {/* jun chainxa tesbata d-none remove garnu */}
                                        {/* message popup */}
                                        <div className="popup-1 card">
                                            <div className="card-header">
                                                <span className="fw-bold text-danger">{props.heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={error} />
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <p className="text-danger" >
                                                    {props.content}
                                                </p>
                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}
                                                {/* <button className="btn btn-sm btn-secondary">Neutral</button> */}
                                                {/* <button autoFocus onClick={messageOk} className={`btn btn-sm ${messagetype === 'success'?'btn-success':'btn-danger'}  ms-auto text-white`}>OK</button> */}
                                                <button autoFocus onClick={messageOk} className="btn btn-sm btn-danger ms-auto text-white">OK</button>
                                            </div>
                                        </div>
                                    </>);
                                case 'warning':
                                    return (<>
                                        {/* jun chainxa tesbata d-none remove garnu */}
                                        {/* message popup */}
                                        <div className="popup-1 card">
                                            <div className="card-header">
                                                {props.heading}
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    {props.content}
                                                </p>
                                            </div>
                                            <div className="card-footer text-center d-flex justify-content-between">
                                                {/* add or remove buttons as your wish */}
                                                {/* <button className="btn btn-sm btn-secondary">Neutral</button> */}
                                                {/* <button autoFocus onClick={messageOk} className={`btn btn-sm ${messagetype === 'success'?'btn-success':'btn-danger'}  ms-auto text-white`}>OK</button> */}
                                                <button autoFocus onClick={messageOk} className="btn btn-sm btn-warning ms-auto text-white">OK</button>
                                            </div>
                                        </div>
                                    </>);
                                default:
                                    return null;
                            }
                        })()}



                    </div>
                </>
            ) : (
                <>
                </>
            )}

        </>
    );
}
export default MessagePopup2