import NepaliDate from "nepali-date-converter";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPopState, messagePop } from "../feature/messagePopSlice";
import error from '../images/error.png'
import success from '../images/success.png'
import warning from '../images/warning.png'

function MessagePopup() {
    const { isPop, messagetype, heading, content, dataArray } = useSelector(messagePop);
    const dispatch = useDispatch();
    // console.log("isPop is:",isPop)
    // console.log("messagetype is:",messagetype)
    // console.log("heading is:",heading)
    // console.log("content is:",content)
    // console.log("dataArray is:",dataArray)
    const messageOk = () => {
        dispatch(clearPopState());
    }

    return (
        <>

            {isPop ? (
                <>
                    <div className="popup-container d-nones">

                        {(() => {
                            switch (messagetype) {
                                case 'data':
                                    return (<>
                                        {/* data popup */}
                                        <div className="popup-2 card">
                                            <div className="card-header">
                                                {heading}
                                            </div>
                                            <div className="card-body">


                                                <ul>

                                                    {Object.keys(dataArray).map((error, index) => (
                                                        <p key={error} className="mb-1">
                                                            <span className="fw-bold">{error}:</span>
                                                            <span className="ms-2 text-secondary">{dataArray[error][0]} </span>
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
                                                <span className="text-warning fw-bold" >{heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={warning} />
                                                </span>
                                            </div>
                                            <div className="card-body">


                                                <ul className="nopadding">
                                                    {Object.entries(dataArray).map(([data, value]) => (
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
                                                {heading}
                                            </div>
                                            <div className="card-body">


                                                <ul>

                                                    {Object.keys(dataArray).map((error, index) => (
                                                        <p key={error} className="mb-1">
                                                            <span className="fw-bold text-danger">{error}:</span>
                                                            <span className="ms-2 text-secondary">{dataArray[error][0]} </span>
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
                                                <span className="text-success fw-bold" >{heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={success} />
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    {content}
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
                                                <span className="fw-bold text-danger">{heading}</span>
                                                <span style={{ float: "right" }} >
                                                    <img className="pop-icon" src={error} />
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <p className="text-danger" >
                                                    {content}
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
                                                {heading}
                                            </div>
                                            <div className="card-body">
                                                <p>
                                                    {content}
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




















                        {messagetype === "data" ? (
                            <>


                            </>
                        ) : (
                            <>




                            </>
                        )}







                    </div>
                </>
            ) : (
                <>
                </>
            )}

        </>
    );
}
export default MessagePopup