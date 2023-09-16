import { useLoaderData } from "react-router-dom";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";

const StatsContainer = () => {
  const { stats } = useLoaderData();
  //   console.log(stats);

  return (
    <section className="grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      <article className="card w-full rounded-md shadow-lg border-b-4 border-warning">
        <div className="card-body">
          {/* stats & icon */}
          <header className="flex justify-between items-center">
            <span className="text-4xl font-bold text-warning">
              {stats.pending}
            </span>
            <div className="w-12 h-12 bg-warning grid place-items-center">
              <FaSuitcaseRolling className="w-6 h-6" />
            </div>
          </header>
          {/* title */}
          <h4 className="mt-2 text-lg lg:text-xl tracking-wide capitalize">
            Pending Applications
          </h4>
        </div>
      </article>
      <article className="card w-full rounded-md shadow-lg border-b-4 border-success">
        <div className="card-body">
          {/* stats & icon */}
          <header className="flex justify-between items-center">
            <span className="text-4xl font-bold text-success">
              {stats.interview}
            </span>
            <div className="w-12 h-12 bg-success grid place-items-center">
              <FaCalendarCheck className="w-6 h-6" />
            </div>
          </header>
          {/* title */}
          <h4 className="mt-2 text-lg lg:text-xl tracking-wide capitalize">
            Interviews Scheduled
          </h4>
        </div>
      </article>
      <article className="card w-full rounded-md shadow-lg border-b-4 border-error">
        <div className="card-body">
          {/* stats & icon */}
          <header className="flex justify-between items-center">
            <span className="text-4xl font-bold text-error">
              {stats.declined}
            </span>
            <div className="w-12 h-12 bg-error grid place-items-center">
              <FaBug className="w-6 h-6" />
            </div>
          </header>
          {/* title */}
          <h4 className="mt-2 text-lg lg:text-xl tracking-wide capitalize">
            Jobs Declined
          </h4>
        </div>
      </article>
    </section>
  );
};

export default StatsContainer;
