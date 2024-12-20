import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import Card from "../Card/Card";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const localStorageTasks = localStorage.getItem("tasks");
    const localStorageTasksValidated = JSON.parse(localStorageTasks) || [];
    setTasks(localStorageTasksValidated);
  }, []);

  const onAddTask = () => {
    if (!task) {
      console.log("Please add task title");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: task,
      isDone: false,
      createdAt: new Date(),
    };

    setTasks((prevState) => {
      const newTasks = [...prevState, newTask];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });

    setTask("");
  };

  const onSwitchCardStatus = (id) => {
    setTasks((prevState) => {
      const modifiedTasks = prevState.map((ps) => {
        if (ps.id === id) {
          return { ...ps, isDone: !ps.isDone };
        }
        return { ...ps };
      });
      localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
      return modifiedTasks;
    });
  };

  const onCardDeleted = (id) => {
    setTasks((prevState) => {
      const filteredTasks = prevState.filter((ps) => ps.id !== id);
      localStorage.setItem("tasks", JSON.stringify(filteredTasks));
      return filteredTasks;
    });
  };

  // =====================

  useEffect(() => {
    console.log("hitttt");
  }, [task]);

  const hasSpecialSymbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordValid(false);
      setErrorMessage("Password is too short");
      return;
    }

    if (!hasSpecialSymbolRegex.test(password)) {
      setPasswordValid(false);
      setErrorMessage("Password does not contain special symbol");
      return;
    }

    setPasswordValid(true);
    setErrorMessage("");
  };

  useEffect(() => {
    if (password.length > 0) {
      validatePassword();
    }
  }, [password]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //======================

  return (
    <div className={styles.main}>
      <h1>to do app</h1>
      <div className={styles.form}>
        <input
          ref={inputRef}
          placeholder="task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button onClick={onAddTask}>Add task</button>
      </div>
      <div className={styles.tasks}>
        {tasks.length >= 1 ? (
          tasks.map((t) => {
            return (
              <Card
                id={t.id}
                key={t.id}
                title={t.title}
                isDone={t.isDone}
                onClick={onSwitchCardStatus}
                onCardDeleted={onCardDeleted}
              />
            );
          })
        ) : (
          <div>No tasks yet</div>
        )}
      </div>
      <br />
      <br /> <br />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div>{isPasswordValid ? <>valid</> : <>invalid</>} </div>
      <div>{errorMessage}</div>
    </div>
  );
};

export default Tasks;
