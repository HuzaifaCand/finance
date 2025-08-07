interface Props {
  handleDelete: () => void;
  onClose: () => void;
}

export default function DeleteUi({ handleDelete, onClose }: Props) {
  return (
    <div className="flex flex-col text-left gap-2 p-4 w-full">
      <h2 className="text-moreWhite text-xl font-semibold">Delete Expense</h2>
      <p className="text-moreWhite/80">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>

      <div className="flex flex-col [@media(min-width:350px)]:flex-row justify-end gap-3 mt-4 w-full">
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2 rounded-lg text-moreWhite text-xs border border-gray-800 bg-background focus:outline-none focus:bg-gray-500/20 hover:cursor-pointer font-semibold hover:bg-gray-500/50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto px-6 py-2 rounded-lg text-moreWhite text-xs bg-red-800 font-semibold hover:bg-red-700 focus:outline-none hover:cursor-pointer focus:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
