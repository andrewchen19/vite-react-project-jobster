import { Form, NavLink, redirect } from "react-router-dom";
import { FormSelect, FormInput, SubmitBtn } from "./index";
import { useSelector } from "react-redux";
import { customFetch } from "../utilize";
import { toast } from "react-toastify";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);

    // get token
    const { token } = store.getState().user.user;

    try {
      await customFetch.post("/jobs", formObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["stats"] });
      queryClient.removeQueries({ queryKey: ["allJobs"] });

      toast.success("Job created", {
        icon: "😎",
      });

      return redirect("/all-jobs");
    } catch (error) {
      // console.log(error);
      const errorMessage = error?.response?.data?.msg || "There was an error";
      toast.error(errorMessage, {
        icon: "😵",
      });

      // if token expired or missing (401) , redirect to login page
      if (error.response.status === 401) {
        return redirect("/login");
      }

      return null;
    }
  };

const AddJobFilter = () => {
  const { position, company, jobTypeOptions, jobType, statusOptions, status } =
    useSelector((store) => store.job);
  const { location } = useSelector((store) => store.user.user);

  return (
    <Form
      method="POST"
      className="rounded-md grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="position"
        type="text"
        name="position"
        size="input-sm"
        defaultValue={position}
      />
      <FormInput
        label="company"
        type="text"
        name="company"
        size="input-sm"
        defaultValue={company}
      />
      <FormInput
        label="job location"
        type="text"
        name="jobLocation"
        size="input-sm"
        defaultValue={location}
      />
      <FormSelect
        label="job type"
        name="jobType"
        list={jobTypeOptions}
        defaultValue={jobType}
        size="select-sm"
      />
      <FormSelect
        label="status"
        name="status"
        list={statusOptions}
        defaultValue={status}
        size="select-sm"
      />
      {/* buttons */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* refresh the current page & reset input */}
        <NavLink to="/add-job" className="btn btn-block btn-sm btn-neutral">
          reset
        </NavLink>
        <SubmitBtn text="submit" size="btn-sm" />
      </div>
    </Form>
  );
};

export default AddJobFilter;
