import styles from "./StartScreen.module.css";
export default function StartScreen({ dispatch, numQuestions }) {
  return (
    <div className={styles.start}>
      <h2>Welcome To The React Quiz</h2>
      <h3>{numQuestions} Question To Test Your React Mastery</h3>

      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let's Start
      </button>
    </div>
  );
}
