import styles from "./FinishScreen.module.css";
export default function FinishScreen({ points, highScore, maxPossiblePoint }) {
  const percentage = (points / maxPossiblePoint) * 100;

  let emoji;

  if (percentage === 100) emoji = "🥇";
  if (percentage >= 70 && percentage < 100) emoji = "🥈";
  if (percentage >= 15 && percentage < 80) emoji = "🥉";
  if (percentage < 15) emoji = "👎";

  return (
    <div>
      <p className={styles.result}>
        <span>{emoji}</span> You Scored <strong> {points}</strong> out of{" "}
        {maxPossiblePoint} {Math.ceil(percentage)}(%)
      </p>
      <p className={styles.highscore}>(HighScore: {highScore} points)</p>
    </div>
  );
}
