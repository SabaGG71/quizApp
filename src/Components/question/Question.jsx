import Option from "../option/Option";
export default function Question({ currentQuestion, dispatch, answer }) {
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Option
        dispatch={dispatch}
        answer={answer}
        currentQuestion={currentQuestion}
      />
    </div>
  );
}
