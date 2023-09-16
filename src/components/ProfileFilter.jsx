import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { useSelector } from "react-redux";
import { customFetch } from "../utilize";
import { editUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { updateJobLocation } from "../features/job/jobSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);
    // console.log(formObject);

    // get token
    const { token } = store.getState().user.user;

    // patch request
    try {
      const response = await customFetch.patch("/auth/updateUser", formObject, {
        headers: {
          // Bearer 與 token 之間記得要空一格
          Authorization: `Bearer ${token} `,
        },
      });
      // console.log(response);

      store.dispatch(editUser(response.data.user));
      store.dispatch(updateJobLocation());
      toast.success("user updated", {
        icon: "😎",
      });

      return null;
    } catch (error) {
      //   console.log(error);
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

const ProfileFilter = () => {
  const { name, lastName, email, location } = useSelector(
    (store) => store.user.user
  );

  return (
    <Form
      method="PATCH"
      className="rounded-md grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="name"
        type="text"
        name="name"
        size="input-sm"
        defaultValue={name}
      />
      <FormInput
        label="last name"
        type="text"
        name="lastName"
        size="input-sm"
        defaultValue={lastName}
      />
      <FormInput
        label="email"
        type="email"
        name="email"
        size="input-sm"
        defaultValue={email}
      />
      <FormInput
        label="location"
        type="text"
        name="location"
        size="input-sm"
        defaultValue={location}
      />
      {/* SubmitBtn 外面是 inline-block 屬性，不會推開上下元素 */}
      <div className="mt-4">
        <SubmitBtn text="save change" size="btn-sm" />
      </div>
    </Form>
  );
};

export default ProfileFilter;
