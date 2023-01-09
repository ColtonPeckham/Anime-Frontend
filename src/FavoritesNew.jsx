export function FavoritesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateFavorite(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Watch Later</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Anime_id: <input name="anime_id" type="text" />
        </div>
        <div>
          User_id: <input name="user_id" type="text" />
        </div>
        <button type="submit">Watch Later!</button>
      </form>
    </div>
  );
}
