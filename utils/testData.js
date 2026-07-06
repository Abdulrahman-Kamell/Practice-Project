import { faker } from "@faker-js/faker";

/**
 * Returns the login credentials loaded from environment variables.
 * Set LOGIN_USERNAME and LOGIN_PASSWORD in your .env file.
 */
export function getLoginCredentials() {
  const username = process.env.LOGIN_USERNAME;
  const password = process.env.LOGIN_PASSWORD;

  if (!username || !password) {
    throw new Error(
      "LOGIN_USERNAME and LOGIN_PASSWORD must be set in your .env file.",
    );
  }

  return { username, password };
}

const OCCUPATIONS = ["Doctor", "Student", "Engineer", "Scientist"];
const GENDERS = ["Male", "Female"];

/**
 * Generates a fresh, unique set of registration data for one test run.
 * Call this once per test — do NOT reuse the same object across multiple
 * registration attempts, since the site will reject a duplicate email.
 */
export function generateRegistrationData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    // Timestamp keeps the email unique even if faker ever repeats a name,
    // and makes it obvious in test reports which run created this user.
    email: `${firstName}.${lastName}.${Date.now()}@test.com`.toLowerCase(),
    phone: faker.string.numeric(10),
    occupation: faker.helpers.arrayElement(OCCUPATIONS),
    gender: faker.helpers.arrayElement(GENDERS),
    password: `${faker.internet.password({ length: 10 })}1!`,
  };
}
