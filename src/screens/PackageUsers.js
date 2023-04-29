import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";
import success from '../images/success.png'
import AddValidityAddPayment from "../components/AddValidityAddPayment";
import AddValidityAddPaymentPackage from "../components/AddValidityAddPaymentPackage";
import { useDocumentTitle } from "../helpers/setDocumentTitle";

function PackageUser() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("View Package Users");


    const [RApiError, setRApiError] = useState(false);
    const [RHaveApiErrorArray, setRHaveApiErrorArray] = useState(false);
    const [RApiErrorMessage, setRApiErrorMessage] = useState("");
    const [RApiErrorArray, setRApiErrorArray] = useState([]);
    const [isApiSuccess, setisApiSuccess] = useState(false);

    const onErrorClear = () => {
        setRApiError(false);
        setRHaveApiErrorArray(false);
        setRApiErrorMessage("");
        setRApiErrorArray([]);
    }
    const ApiOk = () => {
        onErrorClear();
        setisApiSuccess(false);
    }


    const [SelectedItem, setSelectedItem] = useState(null);
    const [SelectedItemDetails, setSelectedItemDetails] = useState(null);
    const [LengthOfItem, setLengthOfItem] = useState(null);

    const [ReloadCards, setReloadCards] = useState(0);





    const [LoadingListDetails, setLoadingListDetails] = useState(false);
    const [ListDetailsFromApi, setListDetailsFromApi] = useState([]);
    const [FilteredListDetails, setFilteredListDetails] = useState([]);
    const [SearchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");


    const [option, setoption] = useState(null);
    const [MemberhsipTypes, setMemberhsipTypes] = useState();




    const OnClickItem = (id) => {
        console.log(id);
        setSelectedItem(id);

        const index = FilteredListDetails.findIndex(item => item.id == id);
        setSelectedItemDetails(FilteredListDetails[index])
        if (id != null) {
            setNameInput(FilteredListDetails[index]['name']);
            setPhoneInput(FilteredListDetails[index]['phone_no']);
        }
    }


    useEffect(() => {
        if (SelectedItemDetails) {

            setNameInput(SelectedItemDetails['name']);
            setPhoneInput(SelectedItemDetails['phone_no']);

            if (SelectedItemDetails['package_taken'].length > 0) {

                let last_cost = SelectedItemDetails['package_taken'][SelectedItemDetails['package_taken'].length - 1]['cost'];
                let last_paid = SelectedItemDetails['package_taken'][SelectedItemDetails['package_taken'].length - 1]['paid'];
                let last_rem = last_cost - last_paid;
                setLengthOfItem(SelectedItemDetails['package_taken'].length);
                if (last_rem <= 0) {
                    setCanAddValidity(true);
                } else {
                    setCanAddValidity(false);
                }

            } else {
                setCanAddValidity(true);
            }




        }

    }, [SelectedItemDetails]);



    const PersonDetails = (props) => {
        const { id, name, phone_no, card_id } = props;
        return (
            <>
                <div onClick={() => { OnClickItem(id) }} key={id} className="mem-list">
                    <p className="text-primary h5 fw-normal">{card_id}</p>
                    <div className="d-flex justify-content-between">
                        <small className="fw-semibold">{name}</small>
                        <small className="text-muted">{phone_no}</small>
                    </div>
                </div>
            </>
        );
    };


    useEffect(() => {
        const index = ListDetailsFromApi.findIndex(item => item.id == SelectedItem);
        if (SelectedItem != null) {
            setNameInput(ListDetailsFromApi[index]['name']);
            setPhoneInput(ListDetailsFromApi[index]['phone_no']);
        }
        setSelectedItemDetails(ListDetailsFromApi[index])
    }, [FilteredListDetails]);

    const Reload = (selectedItem) => {


        // setLoadingListDetails(true);
        let selecteditem = SelectedItem;
        // // OnClickItem(null);

        axios.get(requests.package_user, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingListDetails(false);
                setListDetailsFromApi(res.data.details);
                setFilteredListDetails(res.data.details);
                // setSelectedItemDetails(null)


            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })
    }


    useEffect(() => {

        setLoadingListDetails(true);

        axios.get(requests.package_user, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {

                setListDetailsFromApi(res.data.details);
                setFilteredListDetails(res.data.details);
            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })


        axios.get(requests.package_type, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setLoadingListDetails(false);
                setMemberhsipTypes(res.data.details)

            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })
    }, []);



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






    useEffect(() => {
        setFilteredListDetails(
            ListDetailsFromApi.filter((detailList) =>
                detailList.name.toLowerCase().includes(search.toLowerCase()) ||  detailList.card_id.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, ListDetailsFromApi]);

    const cardinputOnchange = (e) => {
        setSearchInput(e.target.value);
        setSearch(e.target.value);
    }





    const [NameInput, setNameInput] = useState("");
    const [PhoneInput, setPhoneInput] = useState("");

    const OnNameChange = (e) => {
        setNameInput(e.target.value);
    }
    const OnPhoneChange = (e) => {
        setPhoneInput(e.target.value);
    }

    const CloseSelected = () => {
        setNameInput(null);
        setPhoneInput(null);
        setSelectedItem(null);
        setSelectedItemDetails(null);
    }












    const TakenItems = (props) => {
        const { sn, id, cost, package_type, starting_date, end_date, paid } = props;

        return (
            <>
                <div className="card shadow-sm bg-light-100s mb-4">
                    <div className="card-header bg-white d-flex justify-content-between">
                        <div>
                            <span className="fw-light me-1">Package Type:</span>
                            <b>{package_type? package_type.type_name : null}</b>
                        </div>
                        <div>
                            <span className="fw-light me-1">Cost:</span>
                            <b>Rs. {cost}</b>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <div className="col fw-light text-muted pe-2">Start Date :</div>
                                    <div className="col">{starting_date}</div>
                                </div>
                                <div className="row">
                                    <div className="col fw-light text-muted pe-2">Expiry Date :</div>
                                    <div className="col">{end_date}</div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="row text-end">
                                    <div className="col fw-light text-muted pe-2">Paid :</div>
                                    <div className="col">Rs. {paid}</div>
                                </div>
                                <div className="row text-end">
                                    <div className="col fw-light text-muted pe-2">Remaining :</div>
                                    <div className="col">Rs. {cost - paid}</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-3 justify-content-between">
                            <button onClick={() => { OnTakenPackageDelete(id) }} className="btn btn-sm btn-danger text-white">Delete</button>
                            {(LengthOfItem - 1) === sn ? (
                                <>
                                    <button onClick={() => { OnAddPaymentClick(id, paid) }} className="btn btn-sm btn-success text-white">Edit Payment</button>
                                </>
                            ) : (
                                <>
                                </>
                            )}





                        </div>
                    </div>
                </div>
            </>
        );
    };



    const OnUpdateDetailsClick = () => {

        setLoadingListDetails(true);

        axios.put(requests.package_user + "/" + SelectedItem, { name: NameInput, phone_no: PhoneInput }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                Reload(SelectedItem);

            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })

    }


    const OnDeleteDetailClick = () => {

        setLoadingListDetails(true);
        axios.delete(requests.package_user + "/" + SelectedItem, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                // setLoadingListDetails(false);
                CloseSelected()
                // setReloadCards(ReloadCards + 1);
                // setListDetailsFromApi(res.data.details);
                // setFilteredListDetails(res.data.details);
            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })
    }
    const OnAddPaymentClick = (id, paid) => {
        setLoadingListDetails(true);
        setIsParkingOutPop(true);
        setPopTitle("Payment");
        setPopType("payment");
        setEditItemId(id);
    }
    const OnTakenPackageDelete = (id) => {
        setLoadingListDetails(true);
        console.log(id);

        axios.delete(requests.package_taken + "/" + id,{
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                Reload(SelectedItem);

            })
            .catch(error => {
                setLoadingListDetails(false);
                setRApiError(true);
                if (error.response) {
                    if (error.response.status == 422) {
                        setRHaveApiErrorArray(true);
                        setRApiErrorArray(error.response.data.details);
                    } else {
                        setRApiError(true);
                        setRApiErrorMessage(error);
                    }
                }
                else {
                    setRApiErrorMessage("Request Server Error");
                }
            })

    }


    const OnAddValidityClick = () => {
        // console.log("hello hello hello",SelectedItemDetails);
        setLoadingListDetails(true);
        setIsParkingOutPop(true);
        setPopTitle("Validity");
        setPopType("validity");
        setEditItemId(SelectedItem);
    }




    const [CanAddValidity, setCanAddValidity] = useState(false);




    const [IsParkingOutPop, setIsParkingOutPop] = useState(false);
    const [PopType, setPopType] = useState(null);
    const [PopTitle, setPopTitle] = useState(null);
    const [EditItemId, setEditItemId] = useState(null);
    const [DetailsToSendInPop, setDetailsToSendInPop] = useState([]);

















    return (
        <>


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
                                    Package User Added Succesfully.
                                </p>
                            </div>
                            <div className="card-footer text-center d-flex justify-content-between">
                                <button autoFocus onClick={ApiOk} className="btn btn-sm btn-success ms-auto text-white">OK</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (<></>)
            }

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
                ) : (<></>)
            }

            <AddValidityAddPaymentPackage Trigger={IsParkingOutPop} setTrigger={setIsParkingOutPop} PageType={"package"} Type={PopType} Title={PopTitle} Details={SelectedItemDetails} EditItemId={EditItemId} Reload={Reload} setLoadingListDetails={setLoadingListDetails} PackageTypes={MemberhsipTypes} option={option} />







            {<Header />}

            <div className="body-content p-4">
                <div className="wrapper p-0">
                    <div className="d-flex h-100 align-items-stretch">
                        <div className="col d-flex flex-column">
                            <div className="p-3 bg-white rounded">
                                <p className="page-title  mb-3">Package User List</p>
                                <input onChange={cardinputOnchange} value={SearchInput} aria-label="filter" type="text" className="form-control bg-white rounded-pill py-2 px-4" placeholder="Type to search . . ." />
                            </div>
                            <div className="overflow-auto h-inherit p-2 mt-2">
                                {LoadingListDetails ? (<>Loading...</>) : (
                                    <>
                                        {FilteredListDetails.map((filteredList, i) => (
                                            <PersonDetails key={i} {...filteredList} sn={i} />
                                        ))}
                                    </>
                                )}


                            </div>
                        </div>
                        <div className={`${!SelectedItem ? 'position-relative' : ''} col h-100 px-2`}>
                            {SelectedItem ? (
                                <>
                                    {SelectedItemDetails ? (
                                        <>
                                            <div className=" p-3 rounded h-inherit overflow-auto">
                                                <div className="bg-white border p-4 position-relative rounded">
                                                    <button onClick={CloseSelected} className="position-absolute btn btn-close rounded-circle quit" />
                                                    <div className="row mb-3 mt-2">
                                                        <label className="col-sm-2 col-form-label">Name</label>
                                                        <div className="col-sm-10">
                                                            <input disabled={LoadingListDetails} onChange={OnNameChange} value={NameInput} type="email" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Phone</label>
                                                        <div className="col-sm-10">
                                                            <input disabled={LoadingListDetails} onChange={OnPhoneChange} value={PhoneInput} type="email" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Card No.</label>
                                                        <div className="col-sm-10">
                                                            <input disabled value={SelectedItemDetails['card_id']} type="email" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">


                                                        {LoadingListDetails ? (
                                                            <>
                                                                <button disabled className="btn btn-sm btn-secondary">Update</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={OnUpdateDetailsClick} className="btn btn-sm btn-warning text-white">Update</button>

                                                                <div className="div">


                                                                    {CanAddValidity ? (
                                                                        <>
                                                                            <button onClick={OnAddValidityClick} className="btn btn-sm btn-success text-white me-3">Add Validity</button>

                                                                        </>
                                                                    ) : (<></>)}







                                                                    <button onClick={OnDeleteDetailClick} className="btn btn-sm btn-danger text-white">Delete</button>
                                                                </div>
                                                            </>
                                                        )}


                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="page-title my-3">Packages</p>


                                                    {LoadingListDetails ? (<>Loading...</>) : (
                                                        <>
                                                            {SelectedItemDetails['package_taken'].map((filteredList, i) => (
                                                                <TakenItems key={i} {...filteredList} sn={i} />
                                                            ))}
                                                        </>
                                                    )}


                                                </div>
                                            </div>
                                        </>
                                    ) : (<></>)}


                                </>
                            ) : (
                                <><div style={{ backgroundColor: "unset" }} className={`p-3 rounded h-inherit overflow-auto position-absolute ${IsParkingOutPop || RApiError ? "" : "popup-container"}  d-nones`}></div>
                                    <div className=" p-3 rounded h-inherit overflow-auto">
                                        <div className="bg-white border p-4 position-relative rounded">
                                            <button className="position-absolute btn btn-close rounded-circle quit" />
                                            <div className="row mb-3 mt-2">
                                                <label className="col-sm-2 col-form-label">Name</label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">Phone</label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-2 col-form-label">Card No.</label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control form-control-sm" />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button className="btn btn-sm btn-warning text-white">Update</button>
                                                <div className="div">
                                                    <button className="btn btn-sm btn-success text-white me-3">Add Validity</button>
                                                    <button className="btn btn-sm btn-danger text-white">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="page-title my-3">Packages</p>
                                            <div className="card shadow-sm bg-light-100s mb-4">
                                                <div className="card-header bg-white d-flex justify-content-between">
                                                    <div>
                                                        <span className="fw-light me-1">Package Type:</span>
                                                        <b>Normal</b>
                                                    </div>
                                                    <div>
                                                        <span className="fw-light me-1">Cost:</span>
                                                        <b>Rs. 2000</b>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="row">
                                                                <div className="col fw-light text-muted pe-2">Start Date :</div>
                                                                <div className="col">2022-01-23</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col fw-light text-muted pe-2">Expiry Date :</div>
                                                                <div className="col">2022-01-23</div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="row text-end">
                                                                <div className="col fw-light text-muted pe-2">Paid :</div>
                                                                <div className="col">Rs. 100</div>
                                                            </div>
                                                            <div className="row text-end">
                                                                <div className="col fw-light text-muted pe-2">Remaining :</div>
                                                                <div className="col">Rs. 100</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex mt-3 justify-content-between">
                                                        <button className="btn btn-sm btn-danger text-white">Delete</button>
                                                        <button className="btn btn-sm btn-success text-white">Add Payment</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PackageUser