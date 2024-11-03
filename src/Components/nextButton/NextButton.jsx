export default function NextButton({
  dispatch,
  answer,
  currentIndex,
  numQuestions,
}) {
  if (answer === null) {
    return;
  }

  if (currentIndex < numQuestions - 1) {
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "nextQuestion" })}
          className="btn btn-ui"
        >
          Next
        </button>
      </div>
    );
  }
  if ((currentIndex = numQuestions - 1)) {
    return (
      <div>
        <button
          onClick={() => dispatch({ type: "finished" })}
          className="btn btn-ui"
        >
          Finish
        </button>
      </div>
    );
  }
}
