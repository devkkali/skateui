import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router';
import { clearAuthState, loginUser, userAuth } from '../../src/feature/authSlice';
import { useDocumentTitle } from "../helpers/setDocumentTitle";



function Login() {
    const [document_title, setDoucmentTitle] = useDocumentTitle("Home | Login");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, errors, handleSubmit } = useForm();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userAuth
    );


    const onSubmit = (data) => {
        // console.log(data);
        dispatch(loginUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearAuthState());
        };
    }, []);

    useEffect(() => {
        if (isError) {
            // toast.error(errorMessage);
            alert(errorMessage);
            dispatch(clearAuthState());
        }

        if (isSuccess) {
            dispatch(clearAuthState());
            navigate('/');
        }
    }, [isError, isSuccess]);





    return (
        <>
            <div className="d-flex h-100 align-items-center justify-content-center">
                <div className="bg-white shadow-sm rounded-3 p-4">
                    <img src="../loginlogo.jpg" className="login-logo" alt="" />
                    <form onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="mb-4 mt-1">
                            <input {...register("email", { required: true })} aria-label="email" placeholder="Email" type="text" id="email" name="email" className="form-control rounded-pill" />
                        </div>
                        <div className="mb-4">
                            <input {...register("password", { required: true })} aria-label="password" placeholder="Password" type="password" id="password" name="password" className="form-control rounded-pill" />
                        </div>
                        <div className="position-relative">
                            <button className="btn w-100 fw-bold px-3 text-white rounded-pill btn-success">
                                {/*loading*/}
                                {isFetching ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm">
                                        </span>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                                }

                                {/*end loading*/}
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login