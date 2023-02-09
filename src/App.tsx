import { Auth, useAuth } from "@arcana/auth-react";
import "flowbite";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./utils/supabaseClient";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

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
                navigate("/test");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
