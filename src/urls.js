import { createBrowserRouter, useRouteError } from "react-router-dom"
import Main from "./main_component/Main";
import Quiz, { loader as cateQuizLoader } from "./quiz_page_component/Quiz";
import QuizDetail, {loader as quizDetailLoader } from "./detail_page_components/DetailPage";


function ErrorPage(){
    const error = useRouteError();
    console.error(error);
  
    return (
      <div className="d-flex justify-content-center vh-100 align-items-center">
        <div className="text-center">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
            <i>{error.statusText || error.message}</i>
            </p>
        </div>
      </div>
    );
}

export const RouterPartterns = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />
    },
    {
      path: "/quiz",
      element: <Quiz />,
      errorElement: <ErrorPage />,
      loader: cateQuizLoader,
  },
  {
    path: "/quiz/:title/:lang/:level",
    element: <QuizDetail />,
    errorElement: <ErrorPage />,
    loader: quizDetailLoader,
},
])