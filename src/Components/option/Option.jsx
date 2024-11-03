import styles from "./Option.module.css";

export default function Option({ currentQuestion, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className={styles.options}>
      {currentQuestion.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? styles.answer : ""} ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
