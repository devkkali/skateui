import Header from "../components/Header";
import NepaliDate from "nepali-date-converter";
import {Fragment, useEffect, useState} from "react";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";
import { useDocumentTitle } from "../helpers/setDocumentTitle";



function SalesReport(props) {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Sales Report");

    NepaliDate.language = "en"

    document.title = 'Sales Report'

    const defaultDate = new Date().toISOString().split("T")[0]


    const [listType, setListType] = useState('details');
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);


    const [salesList, setSalesList] = useState({});

    function pushList(list) {
        setSalesList(list.reduce(function (r, a) {
            r[a.recorded_time] = r[a.recorded_time] || [];
            r[a.recorded_time].push(a);
            return r;
        }, Object.create(null)))
    }

    function hide(e) {
        e.target.classList.toggle('collapsed')
        e.target.closest('.summary').nextElementSibling.classList.toggle('d-none')
    }

    const fetchList = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        let formProps = Object.fromEntries(formData);
        delete formProps.type
        let eDate = new Date(formProps.to_date);
        eDate.setDate(eDate.getDate());
        formProps = {...formProps, to_date: eDate.toISOString().split("T")[0]}




        
        axios.post(requests.get_sales_report, { ...formProps }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {

                pushList(res.data.details)

            })
            .catch(error => {


            })



        // api yeha halnu
        //form data to submit => formProps
        console.log(formProps)

        // on success "listData means => response.data.details" must be array
        // pushList(listData)

    }

    useEffect(() => {
        let head = document.getElementById('salesHeader')
        let tb = document.querySelectorAll("tbody.data")
        let bt = document.querySelectorAll("button.btn-down")

        if (listType === 'summary') {
            head?.classList.toggle('d-none', true)
            tb?.forEach(e => (e.classList.toggle('d-none', true)))
            bt?.forEach(e => (e.classList.toggle('d-none', true)))
        }
        if (listType === 'details') {
            head?.classList.remove('d-none')
            tb?.forEach(e => (e.classList.remove('d-none')))
            bt?.forEach(e => (e.className = 'btn btn-down'))
        }

    }, [listType, salesList]);

    return (
        <>
            {<Header/>}

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
                                           className="col form-control"/>
                                </div>
                                <div className="row g-2">
                                    <label className="col-form-label col form-label">To Date</label>
                                    <input name='to_date' required defaultValue={endDate}
                                           onChange={(e) => setEndDate(e.target.value)}
                                           type="date"
                                           className="col form-control"/>
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
                                        {new NepaliDate(new Date(endDate)).format('DD, MMMM YYYY')}
                                </span>
                                </div>
                            </div>
                            <div className="col d-flex align-items-center ">
                                <div className="form-check me-3">
                                    <input onChange={e => {
                                        e.target.checked ? setListType('details') : setListType('')
                                    }} defaultChecked={true} id="details" type="radio"
                                           name='type' value='details'
                                           className="form-check-input"/>
                                    <label className="form-check-label" htmlFor="details">Details</label>
                                </div>
                                <div className="form-check">
                                    <input onChange={e => {
                                        e.target.checked ? setListType('summary') : setListType('')
                                    }} id="summary" type="radio" name='type' value='summary'
                                           className="form-check-input"/>
                                    <label className="form-check-label" htmlFor="summary">Summary</label>
                                </div>
                                <button className="btn flex-shrink-0 ms-auto btn-success text-white">Load</button>
                            </div>
                        </div>
                    </form>

                    {Object.keys(salesList).length > 0 ? (
                        <div className="card-list-table mt-3 pe-2">
                            <table style={{fontSize: "14px"}}
                                   className="table table-bordered border-secondary table-striped">
                                <thead id='salesHeader'>
                                <tr className="sticky-top bg-white shadow-sm">
                                    <th>Card Number</th>
                                    <th>Name</th>
                                    <th>Clients Count</th>
                                    <th>Phone No.</th>
                                    <th>Socks</th>
                                    <th>Sock Price</th>
                                    <th>Water</th>
                                    <th>Water Price</th>
                                    <th>In Time</th>
                                    <th>Out Time</th>
                                    <th>Interval</th>
                                    <th>Paid Amount</th>
                                </tr>
                                </thead>

                                {
                                    Object.entries(salesList).map((entry, index) => (
                                        <Fragment key={entry[0]}>
                                            <tbody className="summary">
                                            <tr className="table-details" style={{backgroundColor: "#efdfff"}}>
                                                <td colSpan="2" className="p-0">
                                                    <div
                                                        className="table-details d-flex px-2 py-1">
                                                        <button onClick={(e) => hide(e)}
                                                                className="btn btn-down"></button>
                                                        <span><b>Date:</b> {entry[0]}</span>
                                                    </div>
                                                </td>
                                                <td colSpan="2">
                                                    <span><b>Total Clients: </b>
                                                        {entry[1].reduce(function (acc, b) {
                                                            return acc + parseInt(b.no_of_client)
                                                        }, 0)}
                                                        </span>
                                                </td>
                                                <td colSpan="2">
                                                     <span><b>Total cost of socks: </b>
                                                         {entry[1].reduce(function (acc, b) {
                                                             return acc + parseInt(b.sock_cost_total)
                                                         }, 0)}
                                                        </span>
                                                </td>
                                                <td colSpan="2">
                                                    <span><b>Total cost of water: </b>
                                                        {entry[1].reduce(function (acc, b) {
                                                            return acc + parseInt(b.water_cost_total)
                                                        }, 0)}
                                                        </span>
                                                </td>
                                                <td colSpan="4">
                                                     <span><b>Total charge: </b>
                                                         {entry[1].reduce(function (acc, b) {
                                                             return acc + parseInt(b.paid_amount)
                                                         }, 0)}
                                                        </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                            <tbody className="data">
                                            {entry[1].map((data) => (
                                                <tr key={data.id}>
                                                    <td>{data.card_id}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.no_of_client}</td>
                                                    <td>{data.phone_no}</td>
                                                    <td>{data.socks}</td>
                                                    <td>{data.sock_cost_total}</td>
                                                    <td>{data.water}</td>
                                                    <td>{data.water_cost_total}</td>
                                                    <td>{data.in_time}</td>
                                                    <td>{data.out_time}</td>
                                                    <td>{data.interval}</td>
                                                    <td>{data.paid_amount}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Fragment>
                                    ))}
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

export default SalesReport;