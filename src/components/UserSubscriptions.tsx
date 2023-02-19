import classNames from "classnames";
import { ethers } from "ethers";

const UserSubscriptions = ({ className, vendors }: any) => {
  const imgsrc =
    "https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg";

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  return (
    <div className={classNames(className)}>
      <div className="format px-12 text-left dark:format-invert">
        <h1>Subscriptions</h1>
      </div>
      <div className="pb-12">
        {vendors &&
          vendors.map((vendor: any) => (
            <div className="mt-12 px-20">
              <div className="format flex flex-row gap-4 dark:format-invert">
                <img src="/icons/vendor.png" className="h-8 w-8" />{" "}
                <h3>{vendor.name}</h3>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Rate ( SP / month )
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendor.services.map((service: any) => (
                      <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-900 dark:text-white"
                        >
                          {service.name}
                        </th>
                        <td className="px-6 py-4 text-center">
                          {calculateFlowRate(service.rate)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {service.duration ? service.duration : "3 months"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {service.startDate ? service.startDate : "12/2/23"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href="#"
                            className="font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserSubscriptions;
