/* eslint-disable react/prop-types */
function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to React Quiz!</h2>
      <h3>{numQuestions} questions to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets start
      </button>
    </div>
  );
}

export default StartScreen;
