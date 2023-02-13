import { useAuth } from "@arcana/auth-react";
import "flowbite";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";
import React from "react";
import { arcanaProvider } from "./utils/auth";
import Register from "./pages/register";

// function App() {
//   const auth = useAuth();
//   const navigate = useNavigate();

//   const onLogin = async () => {
//     const address = auth.user?.address;
//     console.log(address);
//     if (!address) {
//       return;
//     }
//     const { data, error } = await supabase
//       .from("user")
//       .insert([{ address: address }])
//       .select();

//     if (error) {
//       alert("error updating DB");
//       console.log(error);
//       return;
//     }
//     if (data) {
//       alert("successfully updated data");
//       navigate("/test");
//     }
//   };

//   return (
//     <div>
//       {auth.loading ? (
//         "Loading"
//       ) : (
//         <>
//           <div>
//             <Auth
//               externalWallet={false}
//               theme={"dark"}
//               onLogin={() => {
//                 console.log("logged in!");
//                 onLogin();
//               }}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

export default function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    user,
    connect,
    isLoggedIn,
    loading,
    loginWithSocial,
    provider,
    logout,
  } = auth;

  return (
    <>
      {loading && <p style={{ color: "white" }}>loading</p>}
      {!loading && !isLoggedIn && <Register></Register>}
      {!loading && isLoggedIn && (
        <h2 style={{ color: "white" }}>{user?.email} logged in!</h2>
      )}
      {!loading && isLoggedIn && (
        <button style={{ color: "white" }} onClick={() => logout()}>
          disconnect
        </button>
      )}
    </>
  );
}
