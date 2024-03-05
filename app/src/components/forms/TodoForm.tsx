import { ErrorMessage, Field, Formik, Form } from "formik";

interface IValue {
  name: string;
  description: string;
}

interface IUser {
  name: string;
}

const TodoForm = ({
  userFn,
}: {
  userFn: React.Dispatch<React.SetStateAction<IUser[]>>;
}) => {
  const initialValue: IValue = {
    name: "",
    description: "meow",
  };

  const myAPI = (window as any).myAPI;

  const handleSubmit = (values: IValue) => {
    console.log("values", values);
    userFn((prev) => [...prev, { name: values.description }]);
    myAPI.send("submit:todoform", values);
  };

  return (
    <div>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form className="shadow border rounded-xl p-4 m-4">
          <div className="m-4">
            <label htmlFor="description" className="font-bold block">
              User Name
            </label>
            <Field
              name="description"
              id="description"
              placeholder="Enter user name"
              className="px-2 py-3 my-2 border rounder shadow-sm w-full"
            />
            <ErrorMessage name="description" className="text-red-500 text-sm" />
          </div>
          <button className="p-2 m-4 border rounded" type="submit">
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TodoForm;
