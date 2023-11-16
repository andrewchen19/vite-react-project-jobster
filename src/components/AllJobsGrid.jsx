import { useLoaderData, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { customFetch } from "../utilize";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
// 和時間處理相關的 library
import dayjs from "dayjs";

const AllJobsGrid = () => {
  const { jobs } = useLoaderData();
  console.log(jobs);

  const { token } = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteHandler = async (_id) => {
    // console.log(_id);
    try {
      await customFetch.delete(`/jobs/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove specific query and fetch new one
      queryClient.removeQueries({ queryKey: ["stats"] });
      queryClient.removeQueries({ queryKey: ["allJobs"] });

      toast.success("Delete successful", {
        icon: "😢",
      });

      // refresh the current page
      navigate("/all-jobs");
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
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {jobs.map((product) => {
        const {
          _id,
          position,
          company,
          jobLocation,
          createdAt,
          jobType,
          status,
        } = product;

        return (
          <article
            key={_id}
            className="card w-full shadow-lg hover:shadow-xl transition-all duration-300 "
          >
            <div className="card-body">
              {/* 上半部 */}
              <div className="flex items-center gap-4">
                {/* icon */}
                <span className="w-12 h-12 bg-neutral rounded-lg grid place-items-center text-lg font-semibold capitalize">
                  {company.slice(0, 1)}
                </span>
                {/* position & company */}
                <div className="flex flex-col gap-y-1">
                  <h4 className="text-lg tracking-wide capitalize">
                    {position}
                  </h4>
                  <h5 className="text-gray-500 capitalize">{company}</h5>
                </div>
              </div>
              {/* 中線 */}
              <div className="border-b-[1px] border-primary-focus my-2"></div>
              {/* 下半部 */}
              <div className="grid gap-y-4 md:grid-cols-2 items-center">
                {/* jobLocation */}
                <p className="flex items-center gap-4">
                  <FaLocationArrow className="text-gray-400" />
                  {jobLocation}
                </p>
                {/* createdAt */}
                <p className="flex items-center gap-4">
                  <FaCalendarAlt className="text-gray-400" />
                  {dayjs(createdAt).format("MMM DD, YYYY")}
                </p>
                {/* jobType */}
                <p className="flex items-center gap-4">
                  <FaBriefcase className="text-gray-400" />
                  {jobType}
                </p>
                {/* status */}
                <div
                  className={`py-1 px-2 w-20 text-sm text-center rounded-lg capitalize font-semibold ${
                    (status === "pending" && "bg-warning") ||
                    (status === "interview" && "bg-success") ||
                    (status === "declined" && "bg-error")
                  }`}
                >
                  {status}
                </div>
                {/* edit & delete */}
                <div className="flex gap-x-2 items-center">
                  <NavLink
                    to={`/edit-job/${_id}`}
                    className="btn btn-sm btn-neutral capitalize"
                  >
                    edit
                  </NavLink>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary capitalize"
                    onClick={() => deleteHandler(_id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default AllJobsGrid;
