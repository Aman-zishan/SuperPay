import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserSubscriptions from "../components/UserSubscriptions";
import { supabase } from "../utils/supabaseClient";

const UserDashboard = () => {
  const { userId } = useParams();
  const [userData, setuserData] = useState<any>();
  const [userServices, setuserServices] = useState<any>();
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase
        .from("vendor_customer")
        .select()
        .eq("address", userId);
      //  const { data: userServiceData } = await supabase
      //    .from("service")
      //    .select()
      //    .eq("userId", userId);
      //  console.log(userData, userServiceData);
      //  setuserServices(userServiceData);
      setuserData(userData);
      console.log(userData);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      {!userData ? (
        "loading"
      ) : (
        <>
          {" "}
          <header className="format my-12 flex flex-col px-12 text-left dark:format-invert">
            <h2 className="mb-[0.588889em]">{userData[0].name}</h2>
            <p>{userData[0].address}</p>
          </header>
          <UserSubscriptions className="mt-16" />
        </>
      )}
    </>
  );
};

export default UserDashboard;
