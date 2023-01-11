import axios from "axios";
import { useEffect, useState } from "react";
import { AnimesIndex } from "./AnimesIndex";
import { AnimesNew } from "./AnimesNew";
import { AnimesShow } from "./AnimesShow";
import { FavoritesIndex } from "./FavoritesIndex";
import { FavoritesNew } from "./FavoritesNew";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";

export function Home() {
  const handleIndexFavorites = () => {
    console.log("handleIndexFavorites");
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      console.log(response.data);
      setFavorites(response.data);
    });
  };

  useEffect(handleIndexFavorites, []);

  const [animes, setAnimes] = useState([]);
  const [IsAnimesShowVisible, setIsAnimesShowVisible] = useState(false);
  const [currentAnime, setCurrentAnime] = useState({});

  const [favorites, setFavorites] = useState([]);
  const [IsFavoritesShowVisible, setIsFavoritesShowVisible] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState({});

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
      .patch('http://localhost:3000/animes/${id}.json', params)
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
      .delete('http://localhost:3000/animes/${anime.id}.json')
      .then((response) => {
        setAnimes(animes.filter((p) => p.id !== anime.id));
        handleClose();
      });
  };

  const handleCreateFavorite = (params, successCallback) => {
    console.log("handleCreateFavorite", params);
    axios
      .post("http://localhost:3000/favorites.json", params)
      .then((response) => {
        setFavorites([...favorites, response.data]);
        successCallback();
      });
  };

  const handleDestroyFavorite = (favorite) => {
    console.log("handleDestroyFavorite", favorite);
    axios
      .delete('http://localhost:3000/favorites/${favorite.id}.json')
      .then((response) => {
        setFavorites(favorites.filter((p) => p.id !== favorite.id));
        handleClose();
      });
  };

  useEffect(handleIndexAnimes, []);

  return (
    <div>
      {/* <FavoritesNew onCreateFavorite={handleCreateFavorite} /> */}
      <FavoritesIndex
        favorites={favorites}
        onShowFavorites={handleCreateFavorite}
      />
      <Modal show={IsFavoritesShowVisible} onClose={handleClose} />
      <favorites
        favorite={currentFavorite}
        onDestroyFavorite={handleDestroyFavorite}
      />

      <AnimesNew onCreateAnime={handleCreateAnime} />
      <AnimesIndex animes={animes} onShowAnime={handleShowAnime} />
      <Modal show={IsAnimesShowVisible} onClose={handleClose}>
        <AnimesShow
          anime={currentAnime}
          onUpdateAnime={handleUpdateAnime}
          onDestroyAnime={handleDestroyAnime}
          onCreateFavorite={handleCreateFavorite}
        />
      </Modal>
    </div>
  );
}
