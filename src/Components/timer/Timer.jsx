import { useEffect } from "react";
import styles from "./Timer.module.css";
export default function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000); // 1 წამი არის 1000 მილიწამი

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className={styles.timer}>
      {minutes < 10 && "0"}
      {minutes}: {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
