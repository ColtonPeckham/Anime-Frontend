import axios from "axios";
import { useEffect, useState } from "react";
import { AnimesIndex } from "./AnimesIndex";
import { AnimesNew } from "./AnimesNew";
import { AnimesShow } from "./AnimesShow";
import { Modal } from "./Modal";

export function Home() {
  const [animes, setAnimes] = useState([]);
  const [IsAnimesShowVisible, setIsAnimesShowVisible] = useState(false);
  const [currentAnime, setCurrentAnime] = useState({});

  const handleIndexAnimes = () => {
    console.log("handleIndexAnimes");
    axios.get("http://localhost:3000/animes.json").then((response) => {
      console.log(response.data);
      setAnimes(response.data);
    });
  };

  const handleCreateAnime = (params, successCallback) => {
    console.log("handleCreateAnime", params);
    axios.post("http://localhost:3000/animes.json", params).then((response) => {
      setAnimes([...animes, response.data]);
      successCallback();
    });
  };

  const handleShowAnime = (anime) => {
    console.log("handleShowAnime", anime);
    setIsAnimesShowVisible(true);
    setCurrentAnime(anime);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsAnimesShowVisible(false);
  };

  const handleUpdateAnime = (id, params, successCallback) => {
    console.log("handleUpdateAnime", params);
    axios
      .patch("http://localhost:3000/animes/${id}.json", params)
      .then((response) => {
        setAnimes(
          animes.map((anime) => {
            if (anime.id === response.data.id) {
              return response.data;
            } else {
              return anime;
            }
          })
        );
        successCallback();
        handleClose();
      });
  };

  const handleDestroyAnime = (anime) => {
    console.log("handleDestroyAnime", anime);
    axios
      .delete("http://localhost:3000/animes/${anime.id}.json")
      .then((response) => {
        setAnimes(animes.filter((p) => p.id !== anime.id));
        handleClose();
      });
  };

  useEffect(handleIndexAnimes, []);

  return (
    <div>
      <AnimesNew onCreateAnime={handleCreateAnime} />
      <AnimesIndex animes={animes} onShowAnime={handleShowAnime} />
      <Modal show={IsAnimesShowVisible} onClose={handleClose}>
        <AnimesShow
          anime={currentAnime}
          onUpdateAnime={handleUpdateAnime}
          onDestroyAnime={handleDestroyAnime}
        />
      </Modal>
    </div>
  );
}

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <div>
          Password confirmation:{" "}
          <input name="password_confirmation" type="password" />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/"; // Change this to hide a modal, redirect to a specific page, etc.
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          Email: <input name="email" type="email" />
        </div>
        <div>
          Password: <input name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <a href="#" onClick={handleClick}>
      Logout
    </a>
  );
}
