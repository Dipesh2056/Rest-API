// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";
import UserModal from "./UserModal";

function App() {
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = (id) => {
    console.log("id", id);
    console.log("users", users);
    console.log(
      "filtered",
      users.filter((i) => i.id !== id)
    );

    axios
      .delete(`https://fakerestapi123.herokuapp.com/users/${id}`)
      .then(() => {
        console.log("delete");
        setUsers(users.filter((i) => i.id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const call = () => {
      axios
        .get("https://fakerestapi123.herokuapp.com/users")
        .then((response) => setUsers(response?.data))
        .catch((err) => console.log(err));
    };
    call();
  }, []);

  const addUser = (user) => {
    console.log("add user call", user);
    handleClose();

    //axios.post
    axios

      .post("https://fakerestapi123.herokuapp.com/users", {
        first_name: user,
      })
      .then((res) => setUsers([...users, res?.data]))
      .catch((err) => console.log(err));
  };

  return (
    <div className="APP">
      <div onClick={handleShow} className="add_container">
        Add
      </div>
      <UserModal show={show} handleClose={handleClose} addUser={addUser} />

      {users ? (
        users.map((item, index) => (
          <UserItem item={item} key={index} deleteUser={deleteUser} />
        ))
      ) : (
        <div> loading users</div>
      )}
    </div>
  );
}

export default App;
