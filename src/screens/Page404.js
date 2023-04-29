import React from "react";
import { Link } from "react-router-dom";

function Page404() {

    return (
        <div className="screen-centered">
            <div>
                <h1>404</h1>
                <h3>Page not found</h3>
                <Link to={'/'}>Home</Link>
            </div>

        </div>
    )
}
export default Page404