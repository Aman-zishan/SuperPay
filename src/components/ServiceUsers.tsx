import classNames from "classnames";

const ServiceUsers = ({ className = "", users }: any) => {
  const services = [
    {
      name: "Binod",
      rate: "0x921717352D4094e5F89d87273Eb5213F23DBEdAB",
      status: "Active",
      startDate: "12/01/23",
    },
    {
      name: "Arun",
      rate: "0x921717352D4094e5F89d87273Eb5213F23DBEdAB",
      status: "Active",
      startDate: "12/01/23",
    },
    {
      name: "Sunil",
      rate: "0x921717352D4094e5F89d87273Eb5213F23DBEdAB",
      status: "Active",
      startDate: "12/01/23",
    },
  ];

  const imgsrc =
    "https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg";

  return (
    <div className={classNames(className)}>
      <div className="pb-12">
        <div className="mt-12 px-20">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4 text-center">{user.address}</td>
                    <td className="px-6 py-4 text-center">12/01/23</td>
                    <td className="px-6 py-4 text-center">Active</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUsers;
