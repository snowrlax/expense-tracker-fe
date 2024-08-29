import NewTransaction from "./components/newTransaction";
import TransactionList from "./components/transactionList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newEntry: any) => {
      return addEntry(newEntry);
    },
    onSuccess: () => {
      console.log("Success");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });

  let income = 0;
  let expense = 0;

  if (data?.response) {
    data.response.forEach((entry: any) => {
      if (entry.type === "EXPENSE") {
        expense += entry.amount;
      } else {
        income += entry.amount;
      }
    });
  }

  return (
    <div className="flex justify-center bg-gray-500 min-h-screen overflow-x-hidden">
      <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-5">
        <div className="bg-slate-200 p-2 my-2 rounded-md">
          <div className="border-b">
            <div className="my-4 flex justify-center px-6">
              <h2 className="font-bold text-xl text-slate-700">
                EXPENSE TRACKER
              </h2>
            </div>
          </div>
          <div className="px-8 py-2">
            <h4 className="text-lg text-gray-500 font-thin">Your Balance</h4>
            <h4 className="text-2xl font-bold text-slate-600">
              Rs {data?.netBalance}
            </h4>
          </div>
          <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-2 my-2 px-6">
            <div className="bg-green-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
              <h1 className="text-xl font-light">INCOME</h1>
              <h1 className="text-2xl text-green-100 font-semibold">
                Rs {income}
              </h1>
            </div>
            <div className="bg-red-600 p-4 border-2 rounded-md shadow-lg  w-full text-white text-center">
              <h1 className="text-xl font-light">EXPENSE</h1>
              <h1 className="text-2xl text-red-100 font-semibold">
                Rs {expense}
              </h1>
            </div>
          </div>
          <div className="px-8 my-6">
            <div className="my-4 border-b w-full">
              <h2 className="font-semibold text-lg">History</h2>
            </div>

            {isLoading && (
              <TransactionList
                id={0}
                description="Loading..."
                amount={0o0}
                type=""
                createdAt=""
                mutation={deleteMutation}
              />
            )}

            {error && (
              <TransactionList
                id={1}
                description="Error while Fetching History..."
                amount={0o0}
                type=""
                createdAt=""
                mutation={deleteMutation}
              />
            )}

            {data?.response.map((entry: any) => (
              <TransactionList
                key={entry.id}
                id={entry.id}
                description={entry.description}
                type={entry.type}
                createdAt={entry.createdAt}
                amount={entry.amount}
                mutation={deleteMutation}
              />
            ))}
          </div>
          <div className="px-8 my-6">
            <div className="my-4 border-b w-full">
              <h2 className="font-semibold text-lg">Add new transaction</h2>
            </div>
            <NewTransaction mutation={mutation} />
          </div>
        </div>
      </div>
    </div>
  );
};

const fetchTransactions = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_APILINK}/entry`);
  return data;
};

const addEntry = async (newEntry: any) => {
  return axios.post(`${import.meta.env.VITE_APILINK}/entry`, newEntry);
};

const deleteEntry = async (id: number) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APILINK}/entry/${id}`
  );

  return data;
};

export default App;
