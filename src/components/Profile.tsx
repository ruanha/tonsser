import styles from "./Profile.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile({ profile }: { profile: any }) {
  const [passwordError, setPasswordError] = useState("");
  const [repeatError, setRepeatError] = useState("");
  const [form, setForm] = useState({ ...profile, password: "", repeat: "" });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // get password and repeat from form and validate password
    const password = form.elements.namedItem("password") as HTMLInputElement;
    const repeatPassword = form.elements.namedItem(
      "repeat-password"
    ) as HTMLInputElement;

    if (
      passwordIsValid(password.value) &&
      repeatIsValid(password.value, repeatPassword.value)
    ) {
      // get rest of the values from form
      const firstName = form.elements.namedItem(
        "first-name"
      ) as HTMLInputElement;
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
      const response = mockFetch("https://api.tonsser.com/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.promise(
        response,
        {
          pending: "Changes are being saved...",
          success: "Changes have been successfully saved!",
          error: "Something went wrong. Please try again later.",
        },
        { hideProgressBar: true }
      );
    } else {
      if (!passwordIsValid(password.value)) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
        setPasswordError("");
      }
      if (!repeatIsValid(password.value, repeatPassword.value)) {
        setRepeatError("Passwords do not match.");
      } else {
        setRepeatError("");
      }
    }
  }

  const passwordIsValid = (password: string) => password.length >= 8;

  const repeatIsValid = (password: string, repeatPassword: string) =>
    password === repeatPassword;

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

function mockFetch(_url: string, _options: any): Promise<any> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        ok: true,
      });
    }, 2000);
  });
}

function FormField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
