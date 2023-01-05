export function AnimesNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateAnime(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Anime!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title: <input name="title" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Category: <input name="category" type="text" />
        </div>
        <div>
          Image_url: <input name="image_url" type="text" />
        </div>
        <button type="submit">Add Anime</button>
      </form>
    </div>
  );
}
