import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import requests from "../helpers/Requests";


function CardSetting(props) {

    const [CardNumber, setCardNumber] = useState("");
    const [OriginalCardList, setOriginalCardList] = useState([]);
    const [CardList, setCardList] = useState([]);
    const [FilteredCardList, setFilteredCardList] = useState([]);
    const [search, setSearch] = useState("");
    const [CardListLoading, setCardListLoading] = useState(false);
    const [ReloadCards, setReloadCards] = useState(0);



    useEffect(() => {
        console.log('reload card value', ReloadCards);
        setCardListLoading(true);
        axios.get(requests.get_all_normal_cards, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setOriginalCardList(res.data.details);
                setCardList(res.data.details);
                setFilteredCardList(res.data.details);
                setCardListLoading(false);
            })
            .catch(error => {
                // setCardListLoading()
                console.log(error)
            })
    }, [ReloadCards]);

    const OnReloadCard = () => {
        setReloadCards(ReloadCards + 1);
    }

    useEffect(() => {
        console.log("changed");
        setFilteredCardList(
            CardList.filter((cardList) =>
                cardList.card_id.includes(search)
            )
        );
    }, [search, CardList]);


    const StatusChangeHandle = (e, card_id) => {
        if (e.target.checked === false) {

            axios.delete(requests.change_card_park_off + '/' + card_id, {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    e.target.checked = false;
                    // setCardList(res.data.details);
                    // setFilteredCardList(res.data.details);
                })
                .catch(error => {
                    alert(error);
                    e.target.checked = true;
                    // console.log(error)
                })

        } else {
            e.target.checked = false;
        }

        // console.log(e.target);   
        // console.log(card_id);
        // console.log(e.target.checked);


    }

    const DeleteCardHandle = (e, card_id) => {





        axios.delete(requests.delete_normal_card + '/' + card_id, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                e.target.checked = false;
                setCardList(CardList.filter((item) => item.card_id !== card_id));

            })
            .catch(error => {
                alert(error);
                e.target.checked = true;
                // console.log(error)
            })

    }

    const CardDetails = (props) => {
        const { sn, id, card_id, status } = props;

        return (
            <>

                {/* <li className="align-items-center d-flex justify-content-between student-box-shadow mt-2 sub-list-link list-group-item list-group-item-action" key={id}  >{card_id}<div className="d-flex align-items-center justify-contentend"><div className="badge badge-pill badge-primary"></div><button onClick={subjectremovehandle.bind(this, id)} className="btn btn-danger float-right ml-2">Remove Subject</button></div></li> */}

                <tr key={card_id}>
                    <td>{sn + 1}</td>
                    <td>{card_id}</td>
                    <td>
                        <div className="form-check form-switch">
                            <input onClick={(e) => { StatusChangeHandle(e, card_id) }} defaultChecked={status} className="form-check-input" type="checkbox" />
                        </div>
                    </td>
                    <td>
                        <button onClick={(e) => { DeleteCardHandle(e, card_id) }} className="btn btn-sm btn-danger text-white">Delete</button>
                    </td>
                </tr>
            </>
        );

    };


    const cardinputOnchange = (e) => {
        setCardNumber(e.target.value);
        setSearch(e.target.value);
        // setCardNumber(e.target.value);
        // console.log("changed");
        // setFilteredCardList(
        //     CardList.filter((cardList) =>
        //         cardList.card_id.includes(e.target.value)
        //     )
        // );
    }

    const EnableAddCardsPop=()=>{
        props.setTriggerAddCard(true);
    }


    return (
        <>
            {/* <AddCardsPopup trigger={IsSettingPop} setIsSettingPop={setIsSettingPop} > */}
            {/* <h3>My popup</h3> */}
            {/* </AddCardsPopup> */}
            <div className="col d-flex flex-column me-1 bg-white rounded p-3">
                <div className="d-flex h-auto">
                    <input autoComplete="off" onChange={cardinputOnchange.bind(CardNumber)} value={CardNumber} autoFocus placeholder="Enter / Scan Card Number" type="text" id="card_number" name="card_number" className="form-control" />
                    {props.TriggerAddCard ? (
                        <>
                        </>
                    ) : (
                        <>
                            <button onClick={EnableAddCardsPop} className="btn flex-shrink-0 ms-2 text-white btn-success">Add Card</button>
                        </>
                    )}

                    <button onClick={OnReloadCard} className="btn flex-shrink-0 ms-2 btn-warning">Reload</button>
                </div>
                <div className="card-list-table flex-grow-1 overflow-auto mt-3 pe-2">
                    {CardListLoading ? (<>Loading...</>) : (<>
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr className="sticky-top bg-white shadow-sm">
                                    <th>SN</th>
                                    <th>Card Number</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>


                                {FilteredCardList.map((filteredCardList, i) => (
                                    <CardDetails key={i} {...filteredCardList} sn={i} />
                                ))}
                            </tbody>
                        </table>
                    </>)}

                </div>
            </div>
        </>
    )
}
export default CardSetting