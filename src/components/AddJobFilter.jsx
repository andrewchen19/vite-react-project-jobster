import { Form } from "react-router-dom";
import { FormSelect, FormInput, SubmitBtn } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { resetInput } from "../features/job/jobSlice";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const formObject = Object.fromEntries(formData);
    // console.log(formObject);

    return null;
  };

const AddJobFilter = () => {
  const {
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    editJobId,
  } = useSelector((store) => store.job);

  console.log(jobLocation);

  const dispatch = useDispatch();

  return (
    <Form
      method="POST"
      className="rounded-md grid gap-4 items-end md:grid-cols-2 lg:grid-cols-3"
    >
      <FormInput
        label="position"
        type="text"
        name="position"
        size="input-sm"
        defaultValue={position}
      />
      <FormInput
        label="company"
        type="text"
        name="company"
        size="input-sm"
        defaultValue={company}
      />
      <FormInput
        label="job location"
        type="text"
        name="jobLocation"
        size="input-sm"
        defaultValue={jobLocation}
      />
      <FormSelect
        label="status"
        name="status"
        list={statusOptions}
        defaultValue={status}
        size="select-sm"
      />
      <FormSelect
        label="job type"
        name="jobType"
        list={jobTypeOptions}
        defaultValue={jobType}
        size="select-sm"
      />
      {/* SubmitBtn 外面是 inline-block 屬性，不會推開上下元素 */}
      <div className="mt-4 grid grid-cols-2 gap-x-4">
        <button
          type="button"
          className="btn btn-block btn-sm btn-neutral"
          onClick={() => dispatch(resetInput())}
        >
          reset
        </button>
        <SubmitBtn text="submit" size="btn-sm" />
      </div>
    </Form>
  );
};

export default AddJobFilter;
