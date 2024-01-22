import React, { useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { countNumber, getQuizData, writeText } from "../utils";
import "./detail.css";
import { urlTitleParamStr } from "../quiz_page_component/Quiz";


export const levelRefer = {
    Beginner : "débutant",
    Intermediate : "confirmé",
    Expert : "expert"
}

export async function loader({params}){
    const quizData = await getQuizData(
        params.title, params.lang, levelRefer[params.level]
    );
    return [quizData, params.title, params.level]
}

export function QuizChoice({
    choice, isChoose, isRightChoice, theRightChoice, isNextBtnActive, onChoiceClick
}){
    /* isRightChoice is used to check if after validation, the selected choice is the right response 
       isNextBtnActive, when this is true it mean that user has already choose a choice and validate it
    */
    let classState = "choice";
    if(isRightChoice === true || theRightChoice){
        classState = "choice-active-t"
    }else if(isRightChoice === false){
        classState = "choice-active-w"
    }else{

    };

    return(
        <button 
        className={
            `d-flex flex-nowrap py-4 px-2 w-100 ${classState} `
        }
        onClick={() => {onChoiceClick(choice)}} disabled={isNextBtnActive ? true : false} >
            <div className="border rounded-circle p-1
            my-auto me-3 ms-2">
                <div 
                className={`border p-2 rounded-circle ${isChoose ? "bg-success" : ""}`}>
                </div>
            </div>
            <div className="my-auto fs-6">{choice}</div>
        </button>
    )
}

export function QuizValidateBtn({onValidationBtnClick}){
    return(
        <div className="page-bottom">
            <div className="d-flex">
                <button 
                onClick={()=>{onValidationBtnClick()}}
                className="btn btn-primary border-radius-lg ms-auto px-4">
                    Check
                </button>
            </div>
        </div>
    )
}

export function QuizNextBtn({nextIsTheEnding, isRightResponse, onNextBtnClick}){
    const messageChoice = Math.random() * 8
    const successMessage = [
        "Great job! You nailed it!",
        "Congratulations! That's the correct answer!",
        "Well done! You're on fire!",
        "Fantastic! You're a quiz master!",
        "Awesome! You got it right!",
        "Perfect! You're acing this quiz!",
        "Brilliant! Keep up the good work!",
        "Superb! You really know your stuff!",
        "Terrific! Correct answer!",
    ]
    const failureMessage = [
        "No worries!", "Not quite, Keep going!", "Incorrect!", "It happens!", "Not the right answer!",
        "Keep your head up!", "Missed that one, but you're unstoppable!", 
        "Every question is a new opportunity!",
        "Don't be discouraged!",
    ]

    return(
        <div className="page-bottom">

            <div className="text-center mb-2">
                <p className={`mb-0 fs-18 ${isRightResponse ? "text-success" : "text-danger"}`}>
                    {
                        isRightResponse ? 
                        `${successMessage[parseInt(messageChoice)]}` : 
                        `${failureMessage[parseInt(messageChoice)]}`
                    }
                </p>
            </div>

            <div className="d-flex">
                <button 
                onClick={onNextBtnClick}
                className="next-btn">
                    {nextIsTheEnding ? "Let's finish" : "Next"}
                </button>
            </div>
        </div>
    )
}


export function ShowLevel({levelName}){
    return(
        <div className="d-flex">
            <div className="my-auto">
                <div className="level-point">
                </div>
            </div>

            <div className="my-auto ms-3">
                <span className="level-point-text">
                    <span className="fw-bolder dm-bold">
                        Level
                    </span> : {levelName}
                </span>
            </div>
        </div>
    )
}


export function AfterQuiz({title, level, score, lacked, totalStep}){
    const percentRef = useRef(null);
    const goodResponseRef = useRef(null);
    const badResponseRef = useRef(null);
    const challengMesageRef = useRef(null);
    const percent = parseInt((score * 100) / totalStep);
    const challengingMess = [
        "Can you beat your own record and claim victory once again? Prove it!",
        "Challenge accepted? Push your limits and show what you're truly capable of!",
        "Think you can raise the bar? Prove yourself in the next round!"
    ]
    const chMessage = (
        percent > 50 ? challengingMess[0] : percent < 50 ? challengingMess[1] : challengingMess[2]
    );
    const percentColor = (
        percent > 50 ? "text-success" : percent < 50 ? "text-danger" : "text-warning"
    );

    useEffect(()=>{
        countNumber(percent, percentRef, 50);
        goodResponseRef.current.classList.add("scale-anima-slow");
        badResponseRef.current.classList.add("scale-anima-slow");
        writeText(challengMesageRef, 50)
    }, [percent]);

    return(
        <div className="container mt-5 ">
            <div className="row justify-content-center">
                <div className="success-page-contain">
                    <div className="shadow p-3 border-radius">
                        <ShowLevel levelName={level}/>

                        <div className="text-center mt-4">
                            <p className="mb-1">Overall Score</p>
                            <span className={`fw-bolder fs-2 ${percentColor}`}
                            ref={percentRef}>
                                0
                            </span><span className={`${percentColor}`}>%</span>
                        </div>

                        <div className="d-flex justify-content-around mt-5 text-white">
                            <div className="shadow p-2 border-radius good-response-bg"
                            ref={goodResponseRef}>
                                   <p className="text-center mb-1 fw-bolder fs-18">
                                        {`${score}`}
                                    </p> 
                                   <span className="text-center">
                                        Good {`${score > 1 ? "responses" : "response" }`}
                                    </span>
                            </div>

                            <div className="shadow p-2 border-radius bad-response-bg"
                            ref={badResponseRef}>
                                   <p className="text-center mb-1 fw-bolder fs-18">
                                        {`${lacked}`}
                                    </p> 
                                   <span className="text-center">
                                        Bad {`${lacked > 1 ? "responses" : "response" }`}
                                    </span>
                            </div>
                        </div>

                        <p className="text-center mt-5 opa-9" ref={challengMesageRef}>
                           {chMessage} 
                        </p>

                        <div className="text-end mt-5">
                            <Link to={`/quiz?${urlTitleParamStr}=${title}`}
                            className="text-decoration-none 
                            btn-primary btn border-radius-lg">
                                Okay, Quiz page
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default function QuizDetail(){
    const [quizData, title, level] = useLoaderData();
    const [nextBtnIsActive, setNextBtnIsActive] = useState(false);
    const [validateBtnIsActive, setValidateBtnIsActive] = useState(false);
    const [currentChoiceValue, setCurrentChoiceValue] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [isfinishing, setIsfinishing] = useState(false);
    const currentPercent = useRef(0);
    const scoreCurrentPercent = useRef(0);
    const progressRef = useRef(null);
    const scoreBarRef = useRef(null);
    const score = useRef(0);
    const lacked = useRef(0);
    const totalStep = quizData.length;
    const fillPercent = 100 / totalStep;
    const question = quizData[currentStep].question;
    const rightResponse = quizData[currentStep]["réponse"];
    const anecdoct = quizData[currentStep].anecdote;

    /*  Tell if the quiz is at the ending */ 
    const [isEnding, setIsEnding] = useState(false);
    const [showEndingPage, setShowEndingPage] = useState(false);


    function onChoiceClick(choiceValue){
        if(!nextBtnIsActive){
            setCurrentChoiceValue(choiceValue);
            setValidateBtnIsActive(true);  
        }
    }

    function onValidationBtnClick(){ 
        if(!((score.current + lacked.current) >= totalStep)){
            if(currentChoiceValue === rightResponse){
                score.current += 1;
                scoreBarRef.current.style.width = `${scoreCurrentPercent.current + fillPercent}%`;
                scoreCurrentPercent.current += fillPercent;
            }else{
                lacked.current += 1
            }
        }
        setValidateBtnIsActive(false);
        setNextBtnIsActive(true);
        window.scrollTo(0, document.getElementById("root").scrollHeight);
    }

    function onNextBtnClick(){ 
        if(!(currentStep + 1 >= totalStep)){
            setCurrentStep(currentStep + 1);
            progressRef.current.style.width = `${currentPercent.current + fillPercent}%`
            currentPercent.current += fillPercent;
            setNextBtnIsActive(false);
            setCurrentChoiceValue(""); 
        }else if(totalStep  === currentStep + 1){
            if(!isEnding){
                setIsfinishing(true);
                progressRef.current.style.width = `${currentPercent.current + fillPercent}%`
                setNextBtnIsActive(true);  
                setIsEnding(true)
            }else{
                setShowEndingPage(true)
            }
            
        }
        window.scrollTo(0, 0);
    }

    const choices = quizData[currentStep].propositions.map((el)=>(
        <QuizChoice 
        choice={el} 
        isChoose={currentChoiceValue === el ? true : false}
        key={el} 
        onChoiceClick={onChoiceClick}
        isRightChoice={
            nextBtnIsActive && currentChoiceValue === el && el === rightResponse ? true :
            nextBtnIsActive && currentChoiceValue === el && el !== rightResponse ? false : ""
        } 
        theRightChoice={nextBtnIsActive && el === rightResponse}
        isNextBtnActive={nextBtnIsActive} />
    ));
    

    const playQuiz = (
        <div>

            {/* Quiz Head */}
            <h1 className="text-center mt-4 fs-1 fw-bolder dm-bold">
                {title}
            </h1>

            {/* Quiz Progress bar */}
            <div className="d-flex justify-content-center mt-5">
                <div className="progress-bar">
                    <div className="progress-bar-inner" ref={progressRef}></div>
                </div>
            </div>

            <div className="container" style={{marginBottom:"150px"}}>

                {/* Quiz Question */}
                <div className="text-center mt-5">
                    <p className="fs-17 quiz-question">
                        <span className="fw-bolder dm-bold">
                            Question {`${currentStep + 1}/${totalStep}`} : 
                        </span> 
                        <span> {question}</span>
                    </p>
                </div>

                <div className="row justify-content-center flex-wrap-reverse mt-5">
                    
                    {/* Quiz Choices */}
                    <div className="col-md-6 mb-3">
                        <div className="border-radius">
                           {choices}
                        </div>
                    </div>

                    {/* Quiz Info */}
                    <div className="col-md-4 mb-3">
                        <div className="border-radius bg-white shadow p-3">

                            <ShowLevel levelName={level} />

                            <div className="mt-4">
                                <p className="fw-bolder level-point-text">
                                    Score : {`${score.current}/${totalStep}`}
                                </p>
                                <div className="score-bar">
                                    <div className="score-bar-inner" ref={scoreBarRef}>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>

                {/* Quiz Anecdoct */}
                {
                    nextBtnIsActive ?
                    (
                        <div className="text-center mt-3">
                            <p className="d-inline-block opa-9" style={{maxWidth:"600px"}}>
                                {anecdoct}
                            </p>
                        </div>
                    ) :
                    <></>
                }

            </div>

            {validateBtnIsActive? <QuizValidateBtn onValidationBtnClick={onValidationBtnClick} /> : <></>}
            {nextBtnIsActive? 
            <QuizNextBtn 
            nextIsTheEnding={isfinishing}
            onNextBtnClick={onNextBtnClick}
            isRightResponse={currentChoiceValue === rightResponse}/> : 
            <></>}
        </div>
    )
    return(
        showEndingPage ? 
        <AfterQuiz 
        score={score.current}
        lacked={lacked.current}
        totalStep={totalStep}
        level={level} 
        title={title}/> : 
        playQuiz
    )
}