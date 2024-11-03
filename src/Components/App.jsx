import React, { useEffect, useReducer } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Loader from "./loader/Loader";
import Error from "./error/Error";
import StartScreen from "./startScreen/StartScreen";
import Question from "./question/Question";
import NextButton from "./nextButton/NextButton";
import Progress from "./progress/Progress";
import FinishScreen from "./finishScreen/FinishScreen";
import RestartButton from "./RestartButton/RestartButton";
import Timer from "./timer/Timer";
import Footer from "./footer/Footer";

const INITIAL_URL = `http://localhost:8000`;

const SECS_PER_QUESTION = 30;

const INITIAL_STATE = {
  questions: [],
  // loading, error, ready, active, finish
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...INITIAL_STATE,
        questions: state.questions,
        status: "ready",
        currentIndex: 0,
        points: 0,
        answer: null,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    questions,
    status,
    currentIndex,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  const numQuestions = questions.length;

  const maxPossiblePoint = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch(`${INITIAL_URL}/questions`);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              currentIndex={currentIndex}
              numQuestions={numQuestions}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              currentQuestion={questions[currentIndex]}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                numQuestions={numQuestions}
                dispatch={dispatch}
                currentIndex={currentIndex}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              highScore={highScore}
              maxPossiblePoint={maxPossiblePoint}
            />
            <RestartButton dispatch={dispatch} INITIAL_STATE={INITIAL_STATE} />
          </>
        )}
      </Main>
    </div>
  );
}
