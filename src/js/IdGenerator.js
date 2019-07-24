const IdGenerator = () => {
  const getNextId = films => {
    if (films) {
      const ids = films.map((film) => (film.id));
      return (ids.length === 0) ? 1 : Math.max(...ids) + 1;
    } else {
      return 1;
    }
  } 

  return { getNextId }
}

export default IdGenerator