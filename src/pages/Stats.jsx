import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// restrict access，在 loader function 處理
// 因為 loaders runs before the page is actually rendered
export const loader = (store) => () => {
  const user = store.getState().user.user;

  if (!user) {
    toast.warning("Please log in first", {
      icon: "😵",
    });
    return redirect("/landing");
  }

  return null;
};

const Stats = () => {
  return <div>Stats</div>;
};

export default Stats;
