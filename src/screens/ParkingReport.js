import React, { Fragment, useEffect, useState } from 'react';
import NepaliDate from "nepali-date-converter";
import Header from "../components/Header";
import requests from '../helpers/Requests';
import axios from "../helpers/axios";
import { useDocumentTitle } from '../helpers/setDocumentTitle';


function calculateInterval(in_time) {

    let now = new Date();
    let i = new Date(in_time);
    let milliseconds = now.getTime() - i.getTime();

    let days = milliseconds / (1000 * 60 * 60 * 24);
    let absoluteDays = Math.floor(days);
    let d = absoluteDays;

    let hours = (days - absoluteDays) * 24
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours;

    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return d + 'd : ' + h + 'h : ' + m + 'm : ' + s + 's';

}

function ParkingReport(props) {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Parking Report");

    NepaliDate.language = "en"

    document.title = 'Parking Report'

    const defaultDate = new Date().toISOString().split("T")[0]



    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);

    const [parkingList, setParkingList] = useState({});



    const fetchList = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        let formProps = Object.fromEntries(formData);
        let eDate = new Date(formProps.to_date);
        eDate.setDate(eDate.getDate() + parseInt(1));
        formProps = { ...formProps, to_date: eDate.toISOString().split("T")[0] }


        axios.post(requests.get_parking_records, { ...formProps }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {

                setParkingList(res.data.details)

            })
            .catch(error => {


            })



        // api yeha halnu
        //form data to submit => formProps
        // console.log(formProps)

        // on success "listData means => response.data.details" must be array
        // setParkingList(listData)

    }


    return (
        <>
            {<Header />}
            

            <div className="body-content d-flex flex-column p-2 border-top border-2">

                <div className=" d-flex flex-column bg-white h-100 rounded p-2">
                    <form onSubmit={fetchList}>
                        <div className="row m-0">
                            <div className="col border bg-light rounded py-2 me-2">
                                <div className="row g-2 mb-2">
                                    <label className="col-form-label col form-label">From Date</label>
                                    <input name='from_date' required defaultValue={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        type="date"
                                        className="col form-control" />
                                </div>
                                <div className="row g-2">
                                    <label className="col-form-label col form-label">To Date</label>
                                    <input name='to_date' required defaultValue={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        type="date"
                                        className="col form-control" />
                                </div>
                            </div>
                            <div className="col border rounded py-2">
                                <div className="row g-2 mb-2">
                                    <label className="col-form-label col form-label">From Miti</label>
                                    <span className="col form-control border-0">
                                        {/*{new NepaliDate(new Date(startDate))}*/}
                                        {new NepaliDate(new Date(startDate)).format('DD, MMMM YYYY')}
                                    </span>
                                </div>
                                <div className="row g-2">
                                    <label className="col-form-label col form-label">To Miti</label>
                                    <span className="col form-control border-0">
                                        {/*{new NepaliDate(endDate).format('DD MMMM YYYY')}*/}
                                        {new NepaliDate(new Date(endDate)).format(' DD, MMMM YYYY')}
                                    </span>
                                </div>
                            </div>
                            <div className="col d-flex align-items-center">
                                <select name='record_type' className="form-select">
                                    <option value="all">All Records</option>
                                    <option value="out">Out Records</option>
                                    <option value="in">In Records</option>
                                </select>
                                <button className="btn flex-shrink-0 ms-2 btn-success text-white">Load</button>
                            </div>
                        </div>
                    </form>

                    {Object.keys(parkingList).length > 0 ? (
                        <div className="card-list-table mt-3 pe-2">
                            <table style={{ fontSize: "14px" }}
                                className="table table-bordered border-secondary table-striped">
                                <thead>
                                    <tr className="sticky-top bg-white shadow-sm">
                                        <th>SN</th>
                                        <th>Card Number</th>
                                        <th>Name</th>
                                        <th>Phone No.</th>
                                        <th>Clients Count</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Interval</th>
                                        <th>Paid Amount</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        Object.values(parkingList).map((data, index) => (
                                            <tr key={index + data.card_id + data.in_time}>
                                                <td>{index + 1}</td>
                                                <td>{data.card_id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.phone_no}</td>
                                                <td>{data.no_of_client}</td>
                                                <td>{data.in_time}</td>
                                                <td>{data.out_time}</td>
                                                <td>{data.interval || calculateInterval(data.in_time)}</td>
                                                <td>{data.paid_amount}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className='text-center bg-light-200 mt-4 p-3 h6'>List empty!</p>
                    )}
                </div>

            </div>

        </>
    );
}

export default ParkingReport;