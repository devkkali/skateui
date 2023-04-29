import React, { useState } from "react";
import Header from "../components/Header";
import MembershipMember from "../components/MembershipMember";
import MembershipPackage from "../components/MembershipPackage";
import { useDocumentTitle } from "../helpers/setDocumentTitle";

function Membership() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Add Members");


    const [Tab, setTab] = useState("mem")
    const ChangeTab = (e) => {
        if (e.target.id === 'paktab') {
            setDoucmentTitle("Add Package User");
            setTab("pak");
        } else {
            setDoucmentTitle("Add Members User");
            setTab("mem");
        }
    }






    return (
        <>
            {/*    put popup exactly below mathi ko div, kina ki z index le kam nagarna sakxa sometimes*/}


            {<Header />}



            {/*  start body content */}
            <div className="body-content p-4">
                <div className="wrapper">
                    <div className="d-flex tabs">
                        <span id="memtab" onClick={ChangeTab} className={`tab-item ${Tab === 'mem' ? "active" : null} `}>Membership</span>
                        <span id="paktab" onClick={ChangeTab} className={`tab-item ${Tab === 'pak' ? "active" : null} `}>Packages</span>
                    </div>

                    {(() => {
                        switch (Tab) {
                            case "mem":
                                return (<MembershipMember />);
                                break;
                            case "pak":
                                return (<MembershipPackage />);
                                break;
                            default:
                                break;
                        }
                    })()}
                </div>
            </div>





        </>
    )
}
export default Membership