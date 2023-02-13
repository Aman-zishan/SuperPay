import { Auth, useAuth } from "@arcana/auth-react";
import "flowbite";
import "./App.css";
import { useNavigate, redirect } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogin = async () => {
    const address = auth.user?.address;
    if (!address) {
      return;
    }
    const { data, error } = await supabase
      .from("user")
      .insert([{ address: address }])
      .select();

    if (error) {
      alert("error updating DB");
      console.log(error);
      return;
    }
    if (data) {
      alert("successfully updated data");
      navigate("/test");
    }
  };

  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : (
        <>
          <div>
            <Auth
              externalWallet={false}
              theme={"dark"}
              onLogin={() => {
                console.log("logged in!");
                onLogin();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
