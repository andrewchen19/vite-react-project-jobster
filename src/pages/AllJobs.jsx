import {
  AllJobsFilter,
  AllJobsContainer,
  ModifiedPaginationContainer,
} from "../components";

const AllJobs = () => {
  return (
    <>
      <AllJobsFilter />
      <AllJobsContainer />
      <ModifiedPaginationContainer />
    </>
  );
};

export default AllJobs;
