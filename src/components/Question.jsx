/* eslint-disable react/prop-types */
import Option from "./Option";

function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <Option answer={answer} dispatch={dispatch} question={question} />
    </div>
  );
}

export default Question;
