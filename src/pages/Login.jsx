import { FormInput, Logo, SubmitBtn } from "../components";
import { Form, NavLink, redirect, useNavigate } from "react-router-dom";

import { customFetch } from "../utilize";
import { loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);
    // console.log(formObject);

    try {
      const response = await customFetch.post("/auth/login", formObject);
      // console.log(response);

      // useDispatch (React Hook) 只能在 React component & custom hook 內部使用
      // 解決辦法：使用 App.jsx 傳進來的 store 以及其 method .dispatch 代替 useDispatch
      store.dispatch(loginUser(response.data.user));

      toast.success("Logged in successfully", {
        icon: "✋🏽",
      });

      // 記得最後一定要 return
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.msg || "Please double check your identification";
      toast.error(errorMessage, {
        icon: "😵",
      });
      // 記得最後一定要 return
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // utility function
  const guestHandler = async () => {
    try {
      const response = await customFetch.post("/auth/login", {
        email: "testUser@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data.user));
      toast.success("Welcome guest user", {
        icon: "✋🏽",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login error. Please try again", {
        icon: "😵",
      });
    }
  };

  return (
    <section className="bg-gray-50 h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <div className="flex justify-center">
          <Logo imgSize="12" textSize="4xl" />
        </div>

        <h4 className="mt-4 text-center text-3xl font-bold capitalize">
          login
        </h4>

        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />
        {/* SubmitBtn 外面是 inline-block 屬性，不會推開上下元素 */}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button
          type="button"
          className="btn btn-neutral btn-block"
          onClick={guestHandler}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <NavLink to="/register" className="ml-2 link link-error capitalize">
            register
          </NavLink>
        </p>
      </Form>
    </section>
  );
};

export default Login;
