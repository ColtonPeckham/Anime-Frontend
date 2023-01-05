export function AnimesIndex(props) {
  return (
    <div>
      <h1>All Animes</h1>
      {props.animes.map((anime) => (
        <div key={anime.id}>
          <h2>{anime.title}</h2>
          <img src={anime.url} />
          <p>Category: {anime.category}</p>
          <p>Description: {anime.description}</p>
        </div>
      ))}
    </div>
  );
}
