export function AnimesIndex(props) {
  return (
    <div>
      <h1>Anime List</h1>
      {props.animes.map((anime) => (
        <div key={anime.id}>
          <h2>{anime.title}</h2>
          <img src={anime.image_url} />
          {/* <p>Category: {anime.category}</p>
          <p>Description: {anime.description}</p> */}
          <button onClick={() => props.onShowAnime(anime)}>More Info</button>
        </div>
      ))}
    </div>
  );
}
