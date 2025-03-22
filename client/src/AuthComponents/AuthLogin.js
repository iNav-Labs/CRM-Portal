// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthLoginInfo = createContext({});
// export function AuthLogin(props) {
//   const [user, setUser] = useState();
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/user", {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching user data:", err);
//       });
//   }, []);

//   return (
//     <AuthLoginInfo.Provider value={user}>
//       {props.children}
//     </AuthLoginInfo.Provider>
//   );
// }

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthLoginInfo = createContext({});

export function AuthLogin(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again.");
        setUser(null);
      });
  }, []);

  return (
    <AuthLoginInfo.Provider value={{ user, error }}>
      {props.children}
    </AuthLoginInfo.Provider>
  );
}
