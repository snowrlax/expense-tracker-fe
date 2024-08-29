import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

const NewTransaction = ({ mutation }: { mutation: UseMutationResult }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [isAmountNegative, setIsAmountNegative] = useState(false);

  console.log(mutation.isPending, mutation.isSuccess, mutation.isError);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedAmount = parseFloat(value);
    if (parsedAmount < 0) {
      setIsAmountNegative(true);
      setAmount(Math.abs(parsedAmount));
    } else {
      setIsAmountNegative(false);
      setAmount(parsedAmount);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEntry = {
      description,
      amount: Math.abs(amount),
      type: isAmountNegative ? "EXPENSE" : "INCOME",
    };
    mutation.mutate(newEntry);
    setDescription("");
    setAmount(0);
  };

  return (
    <div className="bg-white p-4 border-2 rounded-md">
      <form onSubmit={submitForm} className="mt-4">
        <div className="my-5 text-sm">
          <label htmlFor="text" className="block text-black">
            Description
          </label>
          <input
            type="text"
            name="description"
            autoFocus
            value={description}
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder="Enter Text"
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="my-5 text-sm">
          <label htmlFor="amount" className="block text-black">
            Amount
            <small className="text-gray-600">
              {" "}
              (<span className="text-red-400"> negative-expense</span> ,
              <span className="text-green-400"> positive-income</span>)
            </small>
          </label>
          <input
            type="number"
            name="amount"
            autoFocus
            className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
            placeholder="Enter Amount"
            required
            onChange={handleAmountChange}
          />
        </div>
        <div className="my-5">
          <button
            type="submit"
            className="rounded-sm block text-center text-white bg-gray-800 p-3 duration-300  hover:bg-black w-full"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTransaction;
