import { ToastContainer } from "react-toastify";
import styles from "./App.module.css";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <header className={styles.AppHeader}>HEADER</header>
      <main>
        <Profile
          profile={{
            firstName: "Rune",
            lastName: "Hartvig",
            club: "Tonsser FC",
            role: "Defender",
            bio: "I am a developer and a defender on the Tonsser team.",
          }}
        />
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
