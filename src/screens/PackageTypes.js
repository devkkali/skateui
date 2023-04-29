import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import requests from "../helpers/Requests";
import axios from "../helpers/axios";
import success from '../images/success.png'
import AddValidityAddPayment from "../components/AddValidityAddPayment";
import { useDocumentTitle } from "../helpers/setDocumentTitle";

function PackageTypes() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Package Type Setting");


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
        setSelectedItem(id);

        const index = FilteredListDetails.findIndex(item => item.id == id);
        setSelectedItemDetails(FilteredListDetails[index])
        console.log(FilteredListDetails[index]);
        if (id != null) {
            setNameInput(FilteredListDetails[index]['type_name']);
            setValidityInput(FilteredListDetails[index]['validity_in_day']);
            setCostInput(FilteredListDetails[index]['cost']);

            // setPhoneInput(FilteredListDetails[index]['phone_no']);
        }
    }


    useEffect(() => {
        if (SelectedItemDetails) {

            setNameInput(SelectedItemDetails['type_name']);
            setValidityInput(SelectedItemDetails['validity_in_day']);
            setCostInput(SelectedItemDetails['cost']);
            // setPhoneInput(SelectedItemDetails['phone_no']);

            // if (SelectedItemDetails['membership_taken'].length > 0) {

            //     let last_cost = SelectedItemDetails['membership_taken'][SelectedItemDetails['membership_taken'].length - 1]['cost'];
            //     let last_paid = SelectedItemDetails['membership_taken'][SelectedItemDetails['membership_taken'].length - 1]['paid'];
            //     let last_rem = last_cost - last_paid;
            //     setLengthOfItem(SelectedItemDetails['membership_taken'].length);

            //         setCanAddValidity(true);


            // } else {
            //     setCanAddValidity(true);
            // }




        }

    }, [SelectedItemDetails]);



    const PersonDetails = (props) => {
        const { id, type_name, validity_in_day, cost } = props;
        return (
            <>
                <div onClick={() => { OnClickItem(id) }} key={id} className="mem-list">
                    <p className="text-primary h5 fw-normal">{type_name}</p>
                    <div className="d-flex justify-content-between">
                        <small className="fw-semibold">validity in day:{validity_in_day}</small>
                        <small className="text-muted">cost:{cost}</small>
                    </div>
                </div>
            </>
        );
    };


    useEffect(() => {
        const index = FilteredListDetails.findIndex(item => item.id == SelectedItem);
        if (SelectedItem != null) {
            setNameInput(FilteredListDetails[index]['type_name']);
            setValidityInput(FilteredListDetails[index]['validity_in_day']);
            setCostInput(FilteredListDetails[index]['cost']);
        }
        setSelectedItemDetails(FilteredListDetails[index])
    }, [FilteredListDetails]);

    const Reload = (selectedItem) => {


        // setLoadingListDetails(true);
        // let selecteditem = SelectedItem;
        // // OnClickItem(null);

        axios.get(requests.package_type, {
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

    //get list at first
    useEffect(() => {

        setLoadingListDetails(true);

        axios.get(requests.package_type, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {

                setListDetailsFromApi(res.data.details);
                setFilteredListDetails(res.data.details);
                console.log("********************************************i am testing******************************");
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
                detailList.type_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, ListDetailsFromApi]);

    const cardinputOnchange = (e) => {
        setSearchInput(e.target.value);
        setSearch(e.target.value);
    }





    const [NameInput, setNameInput] = useState("");
    const [ValidityInput, setValidityInput] = useState("");
    const [CostInput, setCostInput] = useState("");
    const [PhoneInput, setPhoneInput] = useState("");

    const OnNameChange = (e) => {
        setNameInput(e.target.value);
    }
    const OnValidityChange = (e) => {
        setValidityInput(e.target.value);
    }
    const OnCostChange = (e) => {
        setCostInput(e.target.value);
    }



    const OnPhoneChange = (e) => {
        setPhoneInput(e.target.value);
    }

    const CloseSelected = () => {
        setNameInput("");
        setValidityInput("");
        setCostInput("");


        setPhoneInput(null);
        setSelectedItem(null);
        setSelectedItemDetails(null);
    }
















    const OnUpdateDetailsClick = () => {

        setLoadingListDetails(true);

        axios.put(requests.package_type + "/" + SelectedItem, { type_name: NameInput, validity_in_day: ValidityInput, cost: CostInput }, {
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

    const OnAddNewClick = () => {

        setLoadingListDetails(true);

        axios.post(requests.package_type , { type_name: NameInput, validity_in_day: ValidityInput, cost: CostInput }, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                Reload(SelectedItem);
                CloseSelected();

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
        axios.delete(requests.package_type + "/" + SelectedItem, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                // setLoadingListDetails(false);
                Reload();
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



    // const OnAddValidityClick = () => {
    //     // console.log("hello hello hello",SelectedItemDetails);
    //     setLoadingListDetails(true);
    //     setIsParkingOutPop(true);
    //     setPopTitle("Validity");
    //     setPopType("validity");
    //     setEditItemId(SelectedItem);
    // }




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
                                    Member Added Succesfully.
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

            {/* <AddValidityAddPayment Trigger={IsParkingOutPop} setTrigger={setIsParkingOutPop} PageType={"membership"} Type={PopType} Title={PopTitle} Details={SelectedItemDetails} EditItemId={EditItemId} Reload={Reload} setLoadingListDetails={setLoadingListDetails} MemberhsipTypes={MemberhsipTypes} option={option} /> */}







            {<Header />}

            <div className="body-content p-4">
                <div className="wrapper p-0">
                    <div className="d-flex h-100 align-items-stretch">
                        <div className="col d-flex flex-column">
                            <div className="p-3 bg-white rounded">
                                <p className="page-title  mb-3">Package Types</p>
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
                        <div className={`col px-2`}>

                            <>
                                {SelectedItemDetails ? (
                                    <>
                                        <div className=" p-3 rounded h-inherit overflow-auto">
                                            <p className="page-title">Edit Package Type</p>
                                            <div className="bg-white border p-4 position-relative rounded">
                                                <button onClick={CloseSelected} className="position-absolute btn btn-close rounded-circle quit" />
                                                <div className="row mb-3 mt-2">
                                                    <label className="col-sm-2 col-form-label">Type Name</label>
                                                    <div className="col-sm-10">
                                                        <input disabled={LoadingListDetails} onChange={OnNameChange} value={NameInput} type="email" className="form-control form-control-sm" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label">Validity in day</label>
                                                    <div className="col-sm-10">
                                                        <input disabled={LoadingListDetails} onChange={OnValidityChange} value={ValidityInput} type="email" className="form-control form-control-sm" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label className="col-sm-2 col-form-label">Cost</label>
                                                    <div className="col-sm-10">
                                                        <input disabled={LoadingListDetails} onChange={OnCostChange} value={CostInput} type="numbr" className="form-control form-control-sm" />
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
                                                                <button onClick={OnDeleteDetailClick} className="btn btn-sm btn-danger text-white">Delete</button>
                                                            </div>
                                                        </>
                                                    )}


                                                </div>
                                            </div>

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="">
                                            <div className=" p-3 rounded h-inherit overflow-auto">
                                                <p className="page-title">Add New Package Type</p>
                                                <div className="bg-white border p-4 position-relative rounded">
                                                    <div className="row mb-3 mt-2">
                                                        <label className="col-sm-2 col-form-label">Type Name</label>
                                                        <div className="col-sm-10">
                                                            <input disabled={LoadingListDetails} onChange={OnNameChange} value={NameInput} type="email" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Validity in day</label>
                                                        <div className="col-sm-10">
                                                            <input disabled={LoadingListDetails} onChange={OnValidityChange} value={ValidityInput} type="email" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label className="col-sm-2 col-form-label">Cost</label>
                                                        <div className="col-sm-10">
                                                            <input disabled={LoadingListDetails} onChange={OnCostChange} value={CostInput} type="numbr" className="form-control form-control-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end">


                                                        {LoadingListDetails ? (
                                                            <>
                                                                <div className="div">
                                                                    <button disabled className="btn btn-sm btn-success text-white">Add</button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="div">
                                                                    <button onClick={OnAddNewClick} className="btn btn-sm btn-success text-white">Add</button>
                                                                </div>
                                                            </>
                                                        )}


                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                )}
                            </>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PackageTypes