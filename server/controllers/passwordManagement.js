import { pbkdf2, randomBytes } from "crypto";

//stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto

export const hashPassword = (password) => {
  return new Promise((accept, reject) => {
    const salt = randomBytes(128).toString("base64");
    const iterations = 10000;
    pbkdf2(password, salt, iterations, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);

      accept({ salt, hash: derivedKey, iterations });
    });
  });
};

export const validatePassword = (
  savedHash,
  savedSalt,
  savedIterations,
  attemptedPassword
) => {
  return savedHash === pbkdf2(attemptedPassword, savedSalt, savedIterations);
};

export default { hashPassword, validatePassword };
