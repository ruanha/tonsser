import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <form className={styles.form}>
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
        />
        <label htmlFor="club">Club</label>
        <input type="text" name="club" id="club" placeholder="Eg. Tonsser FC" />
        <label htmlFor="role">Role</label>
        <input type="text" name="role" id="role" placeholder="Eg. Striker" />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" className={styles.textarea}></textarea>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <label htmlFor="repeat-password">Repeat password</label>
        <input
          type="password"
          name="repat-password"
          id="repeat-password"
          placeholder="Repeat password"
        />
      </div>
    </form>
  );
}
