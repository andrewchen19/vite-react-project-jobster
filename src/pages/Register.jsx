import { FormInput, Logo, SubmitBtn } from "../components";
import { Form, NavLink, redirect } from "react-router-dom";

import { customFetch } from "../utilize";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);
  // console.log(formObject);

  try {
    const response = await customFetch.post("/auth/register", formObject);
    console.log(response);

    toast.success("Account created successfully", {
      icon: "😎",
    });

    // 記得最後一定要 return
    return redirect("/login");
  } catch (error) {
    // console.log(error);
    const errorMessage =
      error?.response?.data?.msg || "Please double check your identification";

    toast.error(errorMessage, {
      icon: "😵",
    });
    // 記得最後一定要 return
    return null;
  }
};

const Register = () => {
  return (
    <section className="bg-gray-50 h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <div className="flex justify-center">
          <Logo imgSize="h-12 w-12" textSize="4xl" />
        </div>

        <h4 className="mt-4 text-center text-3xl font-bold capitalize">
          register
        </h4>

        <FormInput label="name" type="text" name="name" />
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />

        {/* SubmitBtn 外面是 inline-block 屬性，不會推開上下元素 */}
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <NavLink to="/login" className="ml-2 link link-error capitalize">
            login
          </NavLink>
        </p>
      </Form>
    </section>
  );
};

export default Register;
