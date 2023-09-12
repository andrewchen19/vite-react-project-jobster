import { AddJobFilter } from "../components";

// restrict access
export const loader = (store) => () => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warning("Please log in first", {
      icon: "😵",
    });
    return redirect("/landing");
  }

  return null;
};

const AddJob = () => {
  return (
    <div className="bg-gray-100 py-8 px-6">
      <h2 className="mb-4 text-secondary-focus text-2xl lg:text-3xl tracking-wide font-semibold capitalize">
        add job
      </h2>
      <AddJobFilter />
    </div>
  );
};

export default AddJob;
