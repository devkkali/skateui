import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import requests from "../helpers/Requests";
import "./print.css";
export default function Qrhelp() {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    /* get list from api and put it
  setCardList(list_from_api);
   */
    // delete this block

    axios.get(requests.get_all_normal_cards, {
      headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + { token: localStorage.getItem('token') }.token,
          'Content-Type': 'application/json',
      }
  })
      .then((res) => {
          
        setCardList(res.data.details);

      })
      .catch(error => {
          // setCardListLoading()
          console.log(error)
      })
      console.log(cardList)

    // let temp = [];
    // for (let i = 1; i < 100; i++) {
    //   temp.push(i);
    // }
    // setCardList(temp);
    //
  }, []);

  return (
    <div className="qr-container">
      {cardList.map((e, i) => {
        return (
          <div key={"qr-code" + e.card_id} className="qr">
            <p>{e.card_id}</p>
            <QRCodeCanvas value={String(e.card_id)} />
          </div>
        );
      })}
    </div>
  );
}
