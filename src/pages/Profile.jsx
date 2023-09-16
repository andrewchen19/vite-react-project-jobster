import { ProfileFilter } from "../components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

// restrict access
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

const Profile = () => {
  return (
    <div className="bg-gray-100 py-8 px-6">
      <h2 className="mb-4 text-secondary-focus text-2xl lg:text-3xl tracking-wide font-semibold capitalize">
        Profile
      </h2>
      <ProfileFilter />
    </div>
  );
};

export default Profile;
