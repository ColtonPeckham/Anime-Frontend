export function FavoritesIndex(props) {
  return (
    <div>
      <h1>My List</h1>
      {props.favorites.map((favorite) => (
        <div key={favorite.id}>
          <p>Anime_id: {favorite.anime_id}</p>
          <p>User_id: {favorite.user_id}</p>
        </div>
      ))}
    </div>
  );
}
