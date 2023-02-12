import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Profile from "./Profile";

afterEach(cleanup);

test("renders profile form", () => {
  render(<Profile profile={profile} />);
  expect(screen.getByLabelText("First name")).toHaveValue(profile.firstName);
  expect(screen.getByLabelText("Last name")).toHaveValue(profile.lastName);
  expect(screen.getByLabelText("Club")).toHaveValue(profile.club);
  expect(screen.getByLabelText("Role")).toHaveValue(profile.role);
  expect(screen.getByLabelText("Bio")).toHaveValue(profile.bio);
});

test("displays error message when password is too short and submit button is clicked", async () => {
  render(<Profile profile={profile} />);
  userEvent.type(screen.getByLabelText("New password"), "123");
  userEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(
    screen.getByText("Password must be at least 8 characters long.")
  ).toBeVisible();
});

test("displays error message when passwords do not match and submit button is clicked", async () => {
  render(<Profile profile={profile} />);
  userEvent.type(screen.getByLabelText("New password"), "12345678");
  userEvent.type(screen.getByLabelText("Repeat new password"), "123456789");
  userEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByText("Passwords do not match.")).toBeVisible();
});

test("does not display error message when password is valid and submit button is clicked", async () => {
  render(<Profile profile={profile} />);
  userEvent.type(screen.getByLabelText("New password"), "12345678");
  userEvent.type(screen.getByLabelText("Repeat new password"), "12345678");
  userEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.queryByText("Passwords do not match.")).not.toBeInTheDocument();
});

const profile = {
  firstName: "Rune",
  lastName: "Hartvig",
  club: "Tonsser FC",
  role: "Defender",
  bio: "I am a developer and a defender on the Tonsser team.",
};
