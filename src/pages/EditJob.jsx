import { EditJobFilter } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const loader =
  (store) =>
  ({ params }) => {
    const user = store.getState().user.user;
    const id = params.id;
    // console.log(id);

    // restrict access
    if (!user) {
      toast.warning("Please log in first", {
        icon: "😵",
      });
      return redirect("/landing");
    }

    // find the job we want to edit
    // 如果使用 Redux ToolKit allJobs state 的 jobs
    // refresh page 時，jobs 會變回 []
    // 這邊使用 localStorage 就不會出現問題
    const job = JSON.parse(localStorage.getItem("data")).jobs.find(
      (item) => item._id === id
    );
    // console.log(job);

    return { job };
  };

const EditJob = () => {
  return (
    <div className="bg-gray-100 py-8 px-6">
      <h2 className="mb-4 text-secondary-focus text-2xl lg:text-3xl tracking-wide font-semibold capitalize">
        Edit job
      </h2>
      <EditJobFilter />
    </div>
  );
};

export default EditJob;
