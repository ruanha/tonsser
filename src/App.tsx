import styles from "./App.module.css";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <header className={styles.AppHeader}>HEADER</header>
      <main>
        <Profile />
      </main>
    </div>
  );
}

export default App;
