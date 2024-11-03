import styles from "./Progress.module.css";
export default function Progress({
  currentIndex,
  maxPossiblePoint,
  numQuestions,
  points,
  answer,
}) {
  return (
    <header className={styles.progress}>
      <progress
        max={numQuestions}
        value={currentIndex + Number(answer !== null)}
      />
      <p>
        Question{" "}
        <strong>
          {currentIndex + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint}
      </p>
    </header>
  );
}
