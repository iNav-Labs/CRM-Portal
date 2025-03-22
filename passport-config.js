// USING BCRYPT

// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const mysql = require("mysql");

// function initialize(connection, passport) {
//   const authenticateUser = async (username, password, done) => {
//     console.log("Attempting to authenticate user:", username);

//     connection.query(
//       "SELECT * FROM accounts WHERE username = ?",
//       [username],
//       async function (error, results, fields) {
//         // Handle database query errors
//         if (error) {
//           console.error("Database query error:", error);
//           return done(error);
//         }

//         // Debug: Log the query results
//         console.log("Query results:", results);

//         // Check if results is defined and has at least one row
//         if (!results || results.length === 0) {
//           console.log("No user found with the given username.");
//           return done(null, false, { message: "User not found" });
//         }

//         // Debug: Log the user found in the database
//         const user = results[0];
//         console.log("User found in database:", user);

//         // Compare passwords
//         try {
//           console.log("Comparing passwords...");
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           console.log("Password comparison result:", passwordMatch);

//           if (passwordMatch) {
//             console.log("User authenticated successfully:", user.username);
//             return done(null, user);
//           } else {
//             console.log("Incorrect password for user:", user.username);
//             return done(null, false, { message: "Wrong password" });
//           }
//         } catch (e) {
//           console.error("Error comparing passwords:", e);
//           return done(e);
//         }
//       }
//     );
//   };

//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "username",
//         passwordField: "password",
//       },
//       authenticateUser
//     )
//   );

//   passport.serializeUser((user, done) => {
//     console.log("Serializing user:", user.id);
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     console.log("Deserializing user with id:", id);

//     connection.query(
//       "SELECT * FROM accounts WHERE id = ?",
//       [id],
//       function (err, results) {
//         if (err) {
//           console.error("Deserialize user error:", err);
//           return done(err);
//         }

//         // Debug: Log the deserialized user
//         console.log("Deserialized user:", results[0]);
//         done(null, results[0]);
//       }
//     );
//   });
// }

// module.exports = initialize;

// WITHOUT BCRYPT

const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql2");

function initialize(connection, passport) {
  const authenticateUser = async (username, password, done) => {
    console.log("Attempting to authenticate user:", username);
    console.log("Plaintext password received:", password); // Debug: Log the plaintext password

    connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username],
      async function (error, results, fields) {
        if (error) {
          console.error("Database query error:", error);
          return done(error);
        }

        console.log("Query results:", results);

        if (!results || results.length === 0) {
          console.log("No user found with the given username.");
          return done(null, false, { message: "User not found" });
        }

        const user = results[0];
        console.log("User found in database:", user);

        try {
          console.log("Comparing passwords...");
          console.log("Plaintext password:", password); // Debug: Log the plaintext password
          console.log("Password from DB:", user.password); // Debug: Log the password from the database

          // Compare plaintext passwords directly
          if (password === user.password) {
            console.log("User authenticated successfully:", user.username);
            return done(null, user);
          } else {
            console.log("Incorrect password for user:", user.username);
            return done(null, false, { message: "Wrong password" });
          }
        } catch (e) {
          console.error("Error comparing passwords:", e);
          return done(e);
        }
      }
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserializing user with id:", id);

    connection.query(
      "SELECT * FROM accounts WHERE id = ?",
      [id],
      function (err, results) {
        if (err) {
          console.error("Deserialize user error:", err);
          return done(err);
        }

        console.log("Deserialized user:", results[0]);
        done(null, results[0]);
      }
    );
  });
}

module.exports = initialize;
