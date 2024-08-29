import { UseMutationResult } from "@tanstack/react-query";
import TrashIcon from "../icons/trashIcon";

interface Props {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
  type: string;
  mutation: UseMutationResult<any, Error, number, unknown>;
}

const TransactionList = (props: Props) => {
  const { description, amount, type, id, mutation, createdAt } = props;
  const date = new Date(createdAt);
  return (
    <div
      className={`relative bg-white rounded-md p-4 border-l-8 shadow-md my-4 flex justify-between items-center ${
        type === "EXPENSE" ? "border-red-500" : "border-green-500"
      }`}
    >
      <div className="flex flex-col">
        <div>
          <p>{description}</p>
        </div>
        <div>
          <p>
            Rs {type === "EXPENSE" ? "-" : "+"}
            {amount}
          </p>
        </div>
        <div className="pt-2 text-xs text-slate-400 font-semibold">
          <p>Date: {date.toLocaleDateString()}</p>
        </div>
      </div>
      <div
        onClick={() => {
          mutation.mutate(id);
        }}
        className=""
      >
        <TrashIcon />
      </div>
    </div>
  );
};

export default TransactionList;
