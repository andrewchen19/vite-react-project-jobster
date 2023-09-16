import { useSelector } from "react-redux";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { FormSelect, FormInput, SubmitBtn } from "./index";
import { customFetch } from "../utilize";
import { toast } from "react-toastify";

export const action =
  (store, queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);

    // get Id
    const id = params.id;

    // get token
    const { token } = store.getState().user.user;

    try {
      await customFetch.patch(`/jobs/${id}`, formObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["stats"] });
      queryClient.removeQueries({ queryKey: ["allJobs"] });

      toast.success("Job updated", {
        icon: "😎",
      });

      return redirect("/all-jobs");
    } catch (error) {
      console.log(error);
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

const EditJobFilter = () => {
  const { job } = useLoaderData();
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

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
        defaultValue={job.position}
      />
      <FormInput
        label="company"
        type="text"
        name="company"
        size="input-sm"
        defaultValue={job.company}
      />
      <FormInput
        label="job location"
        type="text"
        name="jobLocation"
        size="input-sm"
        defaultValue={job.jobLocation}
      />
      <FormSelect
        label="job type"
        name="jobType"
        list={jobTypeOptions}
        defaultValue={job.jobType}
        size="select-sm"
      />
      <FormSelect
        label="status"
        name="status"
        list={statusOptions}
        defaultValue={job.status}
        size="select-sm"
      />
      {/* buttons */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        {/* refresh the current page & reset input */}
        <NavLink
          to={`/edit-job/${job._id}`}
          className="btn btn-block btn-sm btn-neutral"
        >
          reset
        </NavLink>
        <SubmitBtn text="submit" size="btn-sm" />
      </div>
    </Form>
  );
};

export default EditJobFilter;
