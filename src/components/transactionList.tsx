import { UseMutationResult } from "@tanstack/react-query";
import TrashIcon from "../icons/trashIcon";

interface Props {
  id: number;
  description: string;
  amount: number;
  type: string;
  mutation: UseMutationResult<any, Error, number, unknown>;
}

const TransactionList = (props: Props) => {
  const { description, amount, type, id, mutation } = props;
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
