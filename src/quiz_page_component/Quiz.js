import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import SideConatiner from "./cate-container";
import QuizContainer from "./quiz-container";
import { getAllCategory, getAllquiz, getQuizCategory } from "../utils";

export const allQuizStr = "All categories";
export const urlTitleParamStr = "title"

export async function loader(){
    const categories = await getAllCategory();
    const allQuiz = await getAllquiz();
    return [categories, allQuiz]
}

export default function Quiz(){
    const [categories, allQuiz] = useLoaderData();
    const [currentCate, setCurrentCate] = useState(allQuizStr);
    const [isExpandBtnClick, setExpandBtnClick] = useState(false);

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        if(params.has(urlTitleParamStr)){
            const cate_name = getQuizCategory(params.get(urlTitleParamStr));
            cate_name.then((response)=>{
                return response
            }).then((response)=>{
                if(response){
                    setCurrentCate(response)
                }
            })
        }
    }, []);

    const currentQuiz = currentCate !== allQuizStr ? allQuiz.filter((obj)=>(
        obj.category === currentCate
    )) : allQuiz

    const expandStyle = `fs-5 bi bi-chevron-bar-${isExpandBtnClick ? "left" : "right"}`
    
    return(
        <>
            <SideConatiner 
            isExpand={isExpandBtnClick}
            setIsExpand={setExpandBtnClick}
            cateList={categories} 
            setCurrentCate={setCurrentCate} 
            currentCate={currentCate}/>

            <QuizContainer
            quizList={currentQuiz} 
            currentCate={currentCate} />

            <button 
            onClick={()=>{
                (
                    isExpandBtnClick ? 
                    setExpandBtnClick(false) : 
                    setExpandBtnClick(true)
                )
            }}
            className="expand-btn">
                <span className={expandStyle}></span>
            </button>
        </>
    )
}