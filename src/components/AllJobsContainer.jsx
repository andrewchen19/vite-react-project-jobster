import { useLoaderData } from "react-router-dom";
import AllJobsGrid from "./AllJobsGrid";

const AllJobsContainer = () => {
  const { totalJobs } = useLoaderData();
  // console.log(totalJobs);

  // conditional rendering
  if (totalJobs === 0) {
    return (
      <div className="mt-10">
        <h4 className="text-3xl text-secondary-focus tracking-wide">
          No jobs to display ...
        </h4>
      </div>
    );
  }

  return (
    <>
      {/* header */}
      <div className="mt-10">
        <h4 className="text-2xl text-secondary-focus tracking-wide">
          {totalJobs} Job{totalJobs > 1 && "s"} Found
        </h4>
      </div>

      {/* grid */}
      <div className="mt-6">
        <AllJobsGrid />
      </div>
    </>
  );
};

export default AllJobsContainer;
