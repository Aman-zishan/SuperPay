import { useAuth } from "@arcana/auth-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserSubscriptions from "../components/UserSubscriptions";
import {
  getNotification,
  subscribeChannel,
} from "../utils/notificationservices";
import { supabase } from "../utils/supabaseClient";

const UserDashboard = () => {
  const auth = useAuth();
  const [vendors, setvendors] = useState<any>();
  const { userId } = useParams();
  const [userData, setuserData] = useState<any>();
  const [notifications, setnotifications] = useState<any>();
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      const messages = await getNotification(userId!);
      // try {
      //   const r = await subscribeChannel({
      //     address: userId!,
      //     provider: auth.provider,
      //   });
      //   console.log("subssss:", r);
      // } catch (error) {
      //   console.log(error);
      // }

      setnotifications(messages);
      const { data: userData } = await supabase
        .from("vendor_customer")
        .select()
        .eq("address", userId);
      const { data: serviceIds } = await supabase
        .from("vendor_customer")
        .select("services")
        .eq("address", userId);

      const { data: userServiceData } = await supabase
        .from("service")
        .select()
        .in("id", serviceIds![0].services);
      console.log(userServiceData);
      setuserData(userData);
      let ObjMap: any = {};
      userServiceData?.forEach((element) => {
        var makeKey = element.vendor_name;
        if (!ObjMap[makeKey]) {
          ObjMap[makeKey] = [];
        }

        ObjMap[makeKey].push({
          name: element.name,
          rate: element.rate,
        });
      });
      console.log(ObjMap);
      let sample: any = [];
      console.log(
        Object.keys(ObjMap).forEach((element: any) => {
          console.log(element);
          sample.push({ name: element, services: ObjMap[element] });
        })
      );
      setvendors(sample);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <>
      <Navbar notifications={notifications} />
      {!userData ? (
        "loading"
      ) : (
        <>
          {" "}
          <header className="format my-12 flex flex-col px-12 text-left dark:format-invert">
            <h2 className="mb-[0.588889em]">{userData[0].name}</h2>
            <p>{userData[0].address}</p>
          </header>
          <UserSubscriptions vendors={vendors} className="mt-16" />
        </>
      )}
    </>
  );
};

export default UserDashboard;
