import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import indexImg from "./index_img.svg";


export default function Main(){
    const actBtnRef = useRef(null);

    useEffect(()=>{
        actBtnRef.current.classList.add('HeOhEffect');
    }, []);

    return(
        <div className="">
            <div className="container row mx-auto 
            d-flex justify-content-around align-items-center mt-5">
                <div className="col-md-6 my-auto">
                    <div>
                        <h1 className="fw-bolder dm-bold">
                            <b>Discover, </b>  
                            <b>Play, </b> 
                            <b>Learn: </b> 
                            <span className="text-warning">
                                Your Quiz Destination
                            </span>
                        </h1>
                        <p className="fs-6 mt-4">
                            Whether you're 
                            here for fun or seeking to expand your knowledge, 
                            our platform caters to all curiosities.
                        </p>

                        <Link to="/quiz" 
                        ref={actBtnRef}
                        className="mb-5 mt-4 btn border-radius-lg px-3 
                        py-2 btn-primary text-decoration-none fs-6 shadow">
                            Start playing
                        </Link>

                    </div>
                </div>

                <div className="col-md-6">
                    <img src={indexImg} alt="Thinking" className="img-fluid" />
                </div>
            </div>

            <div className="fs-15 d-flex justify-content-center mt-5 mb-4">
                <div>
                Vector Image by <a target="_blank" rel="noreferrer noopener"
                href="https://fr.freepik.com/vecteurs-libre/pack-personnes-plates-posant-questions_13404912.htm#query=question&position=15&from_view=search&track=sph&uuid=42a771b9-1e55-48d4-8afd-10b2cd7ebb15">
                    Freepik
                    </a>
                </div>
            </div>
            
        </div>
    )
}