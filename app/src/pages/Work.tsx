import { useEffect, useState } from "react";
import TodoForm from "../components/forms/TodoForm";
import axios from "axios";

interface IUser {
  name: string;
}

const Work = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  const userLoader = async () => {
    setLoading(true);
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(res);
    setUsers(res.data);
  };

  useEffect(() => {
    userLoader();
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="m-4 text-2xl font-extrabold">This is work page</div>
      <div className="border m-4">
        <div className="font-bold text-2xl mx-4">List of users</div>
        {users.map((user, index) => {
          return (
            <div key={index} className="mx-4 my-2">
              {user.name}
            </div>
          );
        })}
      </div>
      <TodoForm userFn={setUsers} />
    </div>
  );
};

export default Work;
