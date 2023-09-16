import { useState } from "react";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";

const ChartsContainer = () => {
  const [layout, setLayout] = useState(true);

  return (
    <section className="mt-16 flex flex-col items-center">
      {/* title */}
      <div className="text-xl md:text-2xl">Monthly Applications</div>
      <button
        className="mt-2 btn btn-link no-underline text-lg"
        onClick={() => setLayout(!layout)}
      >
        {layout ? "Area Chart" : "Bar Chart"}
      </button>

      {layout ? <AreaChartComponent /> : <BarChartComponent />}
    </section>
  );
};

export default ChartsContainer;
