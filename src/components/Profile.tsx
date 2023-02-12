import styles from "./Profile.module.css";
import { useState } from "react";

export default function Profile() {
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const repeatPassword = form.elements.namedItem(
      "repeat-password"
    ) as HTMLInputElement;
    validatePassword(password.value, repeatPassword.value);
  }

  function validatePassword(password: string, repeatPassword: string) {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }

    if (password !== repeatPassword) {
      setRepeatError("Passwords must match");
    } else {
      setRepeatError("");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="first-name">First name</label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          placeholder="First name"
        />
        <label htmlFor="last-name">Last name</label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          placeholder="Last name"
          readOnly
        />
        <label htmlFor="club">Club</label>
        <input type="text" name="club" id="club" placeholder="Eg. Tonsser FC" />
        <label htmlFor="role">Role</label>
        <input type="text" name="role" id="role" placeholder="Eg. Striker" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          className={styles.textarea}
          placeholder="..."
        ></textarea>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={passwordError && styles.errorBox}
        />
        {passwordError && (
          <p className={styles.errorMessage}>{passwordError}</p>
        )}
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          type="password"
          name="repat-password"
          id="repeat-password"
          placeholder="Repeat password"
          className={repeatError && styles.errorBox}
        />
        {repeatError && <p className={styles.errorMessage}>{repeatError}</p>}
        <div className={styles.buttonGroup}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.save}>Save</button>
        </div>
      </div>
    </form>
  );
}
