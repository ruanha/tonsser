import { cleanup, render, screen } from "@testing-library/react";
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

const profile = {
  firstName: "Rune",
  lastName: "Hartvig",
  club: "Tonsser FC",
  role: "Defender",
  bio: "I am a developer and a defender on the Tonsser team.",
};
