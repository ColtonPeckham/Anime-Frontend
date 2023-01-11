export function FavoritesIndex(props) {
  console.log(props)
  return (
    <div>
      <h1>My List</h1>
      {props.favorites.map((favorite) => (
        <div key={favorite.id}>
          <p>Anime_id: {favorite.anime_id}</p>
          <p>User_id: {favorite.user_id}</p>
          <button onClick={() => props.onShowFavorite(favorite)}>
            Remove Favorite
          </button>
        </div>
      ))}
    </div>
  );
}
