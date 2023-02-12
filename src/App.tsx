import styles from "./App.module.css";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <header className={styles.AppHeader}>HEADER</header>
      <main>
        <Profile
          profile={{
            firstName: "John",
            lastName: "Doe",
            club: "Tonsser",
            role: "Developer",
            bio: "I am a developer",
            password: "password",
          }}
        />
      </main>
    </div>
  );
}

export default App;
