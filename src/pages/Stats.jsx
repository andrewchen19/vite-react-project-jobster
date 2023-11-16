import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utilize";
import { getStats } from "../features/allJobs/allJobsSlice";
import { StatsContainer, ChartsContainer } from "../components";

const statsQuery = (token) => {
  return {
    queryKey: ["stats"],
    queryFn: () =>
      customFetch("/jobs/stats", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  };
};

export const loader = (store, queryClient) => async () => {
  const user = store.getState().user.user;

  // restrict access
  if (!user) {
    return redirect("/landing");
  }

  try {
    // const response = await customFetch("/jobs/stats", {
    //   headers: { Authorization: `Bearer ${user.token}` },
    // });
    // console.log(response);
    const response = await queryClient.ensureQueryData(statsQuery(user.token));

    store.dispatch(getStats(response.data));

    return {
      stats: response.data.defaultStats,
      monthlyApplications: response.data.monthlyApplications,
    };
  } catch (error) {
    // console.log(error);
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

const Stats = () => {
  const { monthlyApplications } = useLoaderData();
  // console.log(monthlyApplications);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
