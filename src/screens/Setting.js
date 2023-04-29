import React, { useState } from "react";
import AddCardsPopup from "../components/AddCardsPopup";
import CardSetting from "../components/CardSetting";
import CostSetting from "../components/CostSetting";
import Header from "../components/Header";
import { useDocumentTitle } from "../helpers/setDocumentTitle";

function Setting() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Settings");

    const [IsAddCardPop, setIsAddCardPop] = useState(false);

    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}
            {/* {<MessagePopup />} */}
            {<Header />}

            {/*  start body content */}

            <div className="body-content p-4">
                <div className="wrapper">
                    <div className="d-flex h-100 align-items-stretch">
                        <AddCardsPopup Trigger={IsAddCardPop} setTrigger={setIsAddCardPop} />
                        <CardSetting TriggerAddCard={IsAddCardPop} setTriggerAddCard={setIsAddCardPop} />
                        {IsAddCardPop?(<></>):(<><CostSetting /></>)}
                        
                    </div>
                </div>
            </div>
            {/*  end body content */}
        </>
    )
}
export default Setting