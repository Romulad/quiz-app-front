import React, { useEffect, useRef } from "react";
import "./quiz-page.css";
import { allQuizStr } from "./Quiz";


export const Category = ({cateName, onCateClick, isActive}) =>{
    const activeCate =  (
        <button className="d-inline-block border-radius-lg border p-2 cate-btn cate-active">
            {cateName}
        </button>
    )
    const simpleCate =  (
        <button className="d-inline-block border-radius-lg border p-2 cate-btn"
        onClick={()=>{onCateClick(cateName)}}>
            {cateName}
        </button>
    )
    
    return(
        isActive ? activeCate : simpleCate
    )
}


export default function SideConatiner({
    cateList, setCurrentCate, currentCate, isExpand, setIsExpand
}){
    const sideRef = useRef(null);
    useEffect(()=>{
        if(isExpand){
            sideRef.current.classList.add('start-0')
        }else{
            sideRef.current.classList.remove('start-0') 
        }
    }, [isExpand])

    function onCateClick(cateName){
        setCurrentCate(cateName);
    }
    
    const categories = cateList.map((name)=>(
        <Category 
        cateName={name} 
        key={name} 
        onCateClick={onCateClick}
        isActive={name === currentCate ? true : false}
        />
    ));

    return (
        <>
            {
                isExpand ? 
                <div 
                className="side-overlay"
                onClick={()=>{setIsExpand(false)}}></div> : 
                <></>
            }
            <div className="side-bar" ref={sideRef}>

                <div className="cate-parent">
                    <div className="cate-filt-text">
                        <i className="bi bi-sliders me-2 "></i><span>Search by Category</span>
                    </div>

                    <div className="my-auto">
                        <Category 
                        cateName={allQuizStr}
                        key={allQuizStr}
                        onCateClick={onCateClick}
                        isActive={allQuizStr === currentCate ? true : false} />
                        {categories}
                    </div>
                </div>

            </div>
        </>
    ) 
};