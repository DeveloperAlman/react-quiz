/* eslint-disable react/prop-types */
function FinishScreen({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} points&#160;
        <strong>
          {percentage < 60
            ? "F (Not passed)"
            : percentage >= 60
            ? "D (Pass)"
            : percentage >= 70
            ? "C (Solid)"
            : percentage >= 80
            ? "B (Good)"
            : percentage >= 90
            ? "A (Excellent)"
            : "N/A"}
        </strong>
      </p>

      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
