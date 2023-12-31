import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Input from "./Input";

function App(props) {
  const [isTrue, setIsTrue] = useState(true);
  const [crowd, setCrowd] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  // refs
  const firstNameRef = useRef();
  const lastNameRef = useRef(null);
  const dobRef = useRef(null);
  const toggleTrue = () => {
    if (isTrue) {
      setIsTrue(false);
      return;
    }

    setIsTrue(true);
  };

  useEffect(() => {
    console.log("useEffect fired!");
    let people = [
      {
        id: 1,
        firstName: "Mary",
        lastName: "Jones",
        dob: "1997-05-02",
      },

      {
        id: 2,
        firstName: "Jack",
        lastName: "Smith",
        dob: "1995-08-12",
      },

      {
        id: 3,
        firstName: "Ketty",
        lastName: "Perry",
        dob: "1990-05-12",
      },
    ];
    setCrowd(people);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (lastName !== "") {
      addPerson(firstName, lastName, dob);
    }
  };

  const addPerson = (newFirst, newLast, newDoB) => {
    // create the object
    let newPerson = {
      id: crowd.length + 1,
      firstName: newFirst,
      lastName: newLast,
      dob: newDoB,
    };
    const newList = crowd.concat(newPerson);
    const sorted = newList.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else if (a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    });

    setCrowd(sorted);
    setFirstName("");
    setLastName("");
    setDob("");
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    dobRef.current.value = "";
  };
  return (
    <Fragment>
      <hr></hr>
      <h1 className="h1-green">{props.msg}</h1>
      <hr />
      {isTrue && (
        <Fragment>
          <p>The current value of isTrue is true</p>
          <hr></hr>
        </Fragment>
      )}
      <hr />
      {isTrue ? <p>Is True</p> : <p>Is False</p>}
      <hr></hr>
      <a href="#!" className="btn btn-outline-secondary" onClick={toggleTrue}>
        Toggle is True
      </a>
      <hr></hr>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            ref={firstNameRef}
            autoComplete="first-name-new"
            className="form-control"
            onChange={(event) => setFirstName(event.target.value)}
          ></input>
        </div>
        <Input
          title="Last Name"
          type="text"
          ref={lastNameRef}
          name="last-name"
          autoComplete="last-name-new"
          className="form-control"
          onChange={(event) => setLastName(event.target.value)}
        ></Input>
        <Input
          title="Date of Birth"
          type="date"
          ref={dobRef}
          name="dob"
          autoComplete="dob-new"
          className="form-control"
          onChange={(event) => setDob(event.target.value)}
        ></Input>
        <input type="submit" value="submit" className="btn btn-primary"></input>
      </form>
      <div>
        First Name : {firstName}
        <br />
        Last Name : {lastName}
        <br />
        DoB : {dob}
        <br />
      </div>

      <hr></hr>
      <h3>People</h3>
      <ul className="list-group">
        {crowd.map((m) => (
          <li key={m.id} className="list-group-item">
            {m.firstName} {m.lastName}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
