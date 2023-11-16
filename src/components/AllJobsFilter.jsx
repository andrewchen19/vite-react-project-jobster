import { useSelector } from "react-redux";
import { FormSelect, FormInput, SubmitBtn } from "./index";
import { Form, NavLink, redirect, useLoaderData } from "react-router-dom";
import { getAllJobs } from "../features/allJobs/allJobsSlice";
import { customFetch } from "../utilize";
import { toast } from "react-toastify";

const filterAllJobsQuery = (params, token) => {
  const { search, jobType, status, sort, page } = params;

  return {
    // Nullish coalescing operator
    // if left hand side is 「undefined」 or 「null」, return right hand side
    queryKey: [
      "allJobs",
      search ?? "",
      jobType ?? "all",
      status ?? "all",
      sort ?? "latest",
      page ?? "1",
    ],
    queryFn: () =>
      customFetch("/jobs", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().user.user;

    // restrict access
    if (!user) {
      toast.warning("Please log in first", {
        icon: "😵",
      });
      return redirect("/landing");
    }

    // get params
    const url = new URL(request.url);
    // url.searchParams return an URLSearchParams object (iterable)
    // Object.fromEntries() turn a list of key-value pairs into an object
    const params = Object.fromEntries(url.searchParams);
    // console.log(params);

    try {
      const response = await queryClient.ensureQueryData(
        filterAllJobsQuery(params, user.token)
      );
      // console.log(response);

      store.dispatch(getAllJobs(response.data));
      console.log(response.data);

      return {
        jobs: response.data.jobs,
        numOfPages: response.data.numOfPages,
        totalJobs: response.data.totalJobs,
        params,
      };
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || "There was an error";
      toast.error(errorMessage, {
        icon: "😵",
      });

      //if token expired or missing (401) , redirect to login page
      if (error.response.status === 401) {
        return redirect("/login");
      }

      return null;
    }
  };

const AllJobsFilter = () => {
  const { sortOptions } = useSelector((store) => store.allJobs);
  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);
  const { params } = useLoaderData();
  console.log(params);

  return (
    <div className="bg-gray-100 py-8 px-6">
      <h2 className="mb-4 text-secondary-focus text-2xl lg:text-3xl tracking-wide font-semibold capitalize">
        search form
      </h2>
      <Form
        method="GET"
        className="rounded-md grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
      >
        <FormInput
          label="search"
          type="text"
          name="search"
          size="input-sm"
          defaultValue={params.search}
        />
        <FormSelect
          label="status"
          name="status"
          list={["all", ...statusOptions]}
          defaultValue={params.status}
          size="select-sm"
        />
        <FormSelect
          label="type"
          name="jobType"
          list={["all", ...jobTypeOptions]}
          defaultValue={params.jobType}
          size="select-sm"
        />
        <FormSelect
          label="sort"
          name="sort"
          list={sortOptions}
          defaultValue={params.sort}
          size="select-sm"
        />

        {/* buttons */}
        <div className="mt-4 grid grid-cols-2 gap-x-4">
          {/* refresh the current page & reset input */}
          <NavLink to="/all-jobs" className="btn btn-block btn-sm btn-neutral">
            reset
          </NavLink>
          <SubmitBtn text="submit" size="btn-sm" />
        </div>
      </Form>
    </div>
  );
};

export default AllJobsFilter;
