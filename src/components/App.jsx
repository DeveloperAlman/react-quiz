/* eslint-disable no-case-declarations */
import { useEffect } from "react";
import { useReducer } from "react";
import Header from "./Header";
import Page from "./Page";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initalState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Action is unknown");
  }
}

function App() {
  // useStates in useReducer
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initalState
  );
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, next) => prev + next.points, 0);

  useEffect(() => {
    try {
      const questionsFetching = async () => {
        const response = await fetch(`http://localhost:8000/questions`);
        const data = await response.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      };
      questionsFetching();
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Page>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
          </>
        )}
        <NextButton
          numQuestions={numQuestions}
          index={index}
          dispatch={dispatch}
          answer={answer}
        />
        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
          />
        )}
      </Page>
    </div>
  );
}

export default App;
