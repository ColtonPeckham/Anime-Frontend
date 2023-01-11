export function AnimesShow(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateAnime(props.anime.id, params, () => event.target.reset());
  };

  const handleClickFavorite = () => {
    props.onCreateFavorite(props.event);
  };

  const handleClick = () => {
    props.onDestroyAnime(props.anime);
  };

  return (
    <div>
      <h1>Anime Details</h1>
      <p>Title: {props.anime.title}</p>
      <p>Description: {props.anime.description}</p>
      <p>Category: {props.anime.category}</p>
      <p>Image_url: {props.anime.image_url}</p>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input defaultValue="props.anime.title" name="title" type="text" />
        </div>
        <div>
          Description:
          <input
            defaultValue="props.anime.description"
            name="description"
            type="text"
          />
        </div>
        <div>
          Category:
          <input
            defaultValue="props.anime.category"
            name="category"
            type="text"
          />
        </div>
        <div>
          Image_url:
          <input
            defaultValue="props.anime.image_url"
            name="image_url"
            type="text"
          />
        </div>
        <button type="submit">Update Anime</button>
        <button onClick={handleClick} type="submit">
          Remove Anime
        </button>
      </form>
      <button onClick={handleClickFavorite} type="submit">
        Add to Favorites
      </button>
    </div>
  );
}
