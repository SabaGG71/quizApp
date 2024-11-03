import image from "../../assets/react.svg";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.appHeader}>
      <img src={image} alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
