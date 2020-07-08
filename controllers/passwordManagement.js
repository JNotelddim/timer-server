import { pbkdf2, randomBytes } from "crypto";

//stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto

const LENGTH = 64;
const DIGEST = "sha512";

export const hashPassword = (password) => {
  return new Promise((accept, reject) => {
    randomBytes(124, (err, saltBuffer) => {
      const iterations = 10000;
      pbkdf2(
        password,
        saltBuffer.toString(),
        iterations,
        LENGTH,
        DIGEST,
        (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            accept({
              salt: saltBuffer.toString(),
              hash: derivedKey,
              iterations,
            });
          }
        }
      );
    });
  });
};

export const validatePassword = (hash, salt, iterations, attemptedPassword) => {
  return new Promise((accept, reject) => {
    pbkdf2(
      attemptedPassword,
      salt,
      iterations,
      LENGTH,
      DIGEST,
      (err, derivedKey) => {
        if (err) {
          reject(err);
        } else if (derivedKey == hash) {
          accept(true);
        } else {
          accept(false);
          // reject("Derived key !== hash");
        }
      }
    );
  });
};

export default { hashPassword, validatePassword };
