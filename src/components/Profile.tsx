import styles from "./Profile.module.css";
import { useState } from "react";

export default function Profile({ profile }: { profile: any }) {
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");
  const [form, setForm] = useState({ ...profile, repeat: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // get password and repeat from form and validate password
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const repeatPassword = form.elements.namedItem(
      "repeat-password"
    ) as HTMLInputElement;
    validatePassword(password.value, repeatPassword.value);

    if (passwordError || repeatError) {
      return;
    }

    // get rest of the values from form
    const firstName = form.elements.namedItem("first-name") as HTMLInputElement;
    const lastName = form.elements.namedItem("last-name") as HTMLInputElement;
    const club = form.elements.namedItem("club") as HTMLInputElement;
    const role = form.elements.namedItem("role") as HTMLInputElement;
    const bio = form.elements.namedItem("bio") as HTMLInputElement;

    // combine first name, last name, club, role, bio, password into one object
    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      club: club.value,
      role: role.value,
      bio: bio.value,
      password: password.value,
    };

    // use fetch to send data to server
    fetch("https://api.tonsser.com/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          value={form.firstName}
          onChange={(event) => {
            setForm({ ...form, firstName: event.target.value });
          }}
        />
        <label htmlFor="last-name">Last name</label>
        <input
          type="text"
          name="last-name"
          id="last-name"
          placeholder="Last name"
          value={form.lastName}
          onChange={(event) => {
            setForm({ ...form, lastName: event.target.value });
          }}
        />
        <label htmlFor="club">Club</label>
        <input
          type="text"
          name="club"
          id="club"
          placeholder="Eg. Tonsser FC"
          value={form.club}
          onChange={(event) => {
            setForm({ ...form, club: event.target.value });
          }}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          name="role"
          id="role"
          placeholder="Eg. Striker"
          value={form.role}
          onChange={(event) => {
            setForm({ ...form, role: event.target.value });
          }}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          className={styles.textarea}
          placeholder="..."
          value={form.bio}
          onChange={(event) => {
            setForm({ ...form, bio: event.target.value });
          }}
        ></textarea>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className={passwordError && styles.errorBox}
          value={form.password}
          onChange={(event) => {
            setForm({ ...form, password: event.target.value });
          }}
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
          value={form.repeat}
          onChange={(event) => {
            setForm({ ...form, repeat: event.target.value });
          }}
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
