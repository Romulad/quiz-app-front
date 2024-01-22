import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./quiz-page.css";
import usLogo from "./countries-logo/us-logo.svg";
import frLogo from "./countries-logo/fr-logo.svg";
import esLogo from "./countries-logo/es-logo.svg";
import { allQuizStr } from "./Quiz";
import { levelRefer } from "../detail_page_components/DetailPage";


export const Aquiz = ({title, image, slogan, onQuizClick}) => {
    return(
        <div className="a-quiz-col mb-4">
            <div className="shadow bg-white border-radius">
                <div className="">
                    <img src={image} alt={title} 
                    className="img-fluid border-top-radius"/>
                </div>

                <div className="px-3 py-3">
                    <div>
                        <p className="fw-bolder fs-16 mb-1 dm-bold">
                            {title}
                        </p>

                        <p className="fs-14 mb-0">
                            {slogan}
                        </p>
                    </div>
                    <div className="mt-4">
                        <button 
                        onClick={() => {onQuizClick(title)}}
                        className="btn-primary border-0 px-3 py-1 border-radius-lg shadow">
                            Let's start
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Popup = ({title, disabledPopup}) => {
    const [isNextLangBtnActif, setIsNextLangBtnActif] = useState(false);
    const [currentLang, setCurrentLang] = useState('');
    const [currentLevel, setCurrentLevel] = useState("");
    const langChoiceRef = useRef(null);
    const levelChoiceRef = useRef(null);

    function onBtnLangClick(lang){
        setCurrentLang(lang);
        setIsNextLangBtnActif(true);
    }
    
    const Langue = ({img, lang}) => {
        const style = `img-fluid border-radius mb-2 
        ${currentLang === lang ? "country-logo-img-active" : "country-logo-img"}`;
        return(
            <button 
            onClick={()=>{onBtnLangClick(lang)}}
            className="border-0 p-0 country-logo">
                <img  
                src={img} alt={lang} 
                className={style}/>
                <p className="mb-0">{lang}</p>
            </button>
        )
    }

    function onNextLangBtnClick(){
        langChoiceRef.current.classList.add('d-none');
        levelChoiceRef.current.classList.remove('d-none');
    }

    const LangNextBtn = () => (
        <div className="text-end">
            <button onClick={onNextLangBtnClick}
            className="border-0 btn-primary px-3 py-1 border-radius-lg">
                Next
            </button>
        </div>
    )

    const Level = ({emoName, levelName}) => {
        const emoStyle = `level-emo bi bi-${emoName} fs-2`;
        const btnStyle = `border border-radius 
        ${currentLevel === levelName ? "level-btn-active" : "level-btn"} `;
        return(
            <div className="text-center mx-1 my-1">
                <button className={btnStyle}
                onClick={()=>{setCurrentLevel(levelName)}}>
                    <span className={emoStyle}></span>
                </button>
                <p className="mb-0 mt-2">{levelName}</p>
            </div>
        )
    }

    const levels = Object.keys(levelRefer)
    return(
        <>
            <div className="overlay" onClick={disabledPopup}></div>
            <div className="popup opacity-anima">

                <div className="d-block text-end">
                    <button 
                    className="border-0 bg-transparent icon"
                    onClick={disabledPopup}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div ref={langChoiceRef}>
                    <p className="text-center fw-bolder dm-bold">Choose a language</p>
                    <div className="d-flex justify-content-around mt-5 mb-6">
                        <Langue img={usLogo} lang="En"/>
                        <Langue img={esLogo} lang="Es"/>
                        <Langue img={frLogo} lang="Fr"/>
                    </div>

                    {isNextLangBtnActif ? <LangNextBtn /> : <></>}
                </div>

                <div className="d-none" ref={levelChoiceRef}>
                    <p className="text-center fw-bolder dm-bold">Choose a level</p>
                    <div className="d-flex justify-content-around mt-5 mb-6 flex-wrap">
                        <Level emoName="emoji-neutral-fill" levelName={levels[0]}/>
                        <Level emoName="emoji-smile-fill" levelName={levels[1]}/>
                        <Level emoName="emoji-sunglasses-fill" levelName={levels[2]}/>
                    </div>

                    <div className="d-flex justify-content-between flex-wrap">
                        <button
                        onClick={()=>{
                            levelChoiceRef.current.classList.add('d-none');
                            langChoiceRef.current.classList.remove('d-none')
                        }} 
                        className="btn-primary border-0 px-3 py-1 border-radius-lg my-1">
                            Previous
                        </button>
                        
                        {
                            currentLang && currentLevel ? 
                            <Link 
                            to={
                                `/quiz/${title}/${currentLang.toLowerCase()}/${currentLevel}`
                            }
                            className="btn-success px-3 py-1 border-radius-lg my-1 text-decoration-none">
                                Let's Go 
                            </Link> : <></>
                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default function QuizContainer({
    quizList, currentCate
}){
    const [quizIsClick, setQuizIsClick] = useState(false);
    const [currentTitle, setCurrentTitle] = useState('')

    function onQuizClick(title){
        setCurrentTitle(title);
        setQuizIsClick(true);
    }

    function disabledPopup(){
        setQuizIsClick(false);
    }

    const allQuiz = quizList.map((el)=> (
        <Aquiz 
        image={el.image} 
        title={el.title} 
        slogan={el.slogan}
        onQuizClick={onQuizClick}
        key={el.title} />
    ))
    
    const quizHeader = (
        <span>{currentCate === allQuizStr ? "All Quizzes" : `About ${currentCate}`}</span>
    )

    return(
        <main className="">
            <div className="container-fluid">
                <div className="main-quiz-text">
                    <i className="bi bi-gem me-2 "></i>
                    {quizHeader}
                </div>

                <div className="row">
                    {allQuiz}
                </div>
            </div>
            {
                quizIsClick ? 
                <Popup 
                title={currentTitle} 
                disabledPopup={disabledPopup}/> : 
                <></>
            }
        </main>
    )
}