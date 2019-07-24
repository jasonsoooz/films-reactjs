const LastFilmSelector = wrapper => {
  const lastFilmWrapper = wrapper

  const columnEquals = (id, element) => {
    const column = lastFilmWrapper.find({id: id});
    // console.log(column.debug());
    return column.containsMatchingElement(element);
  }

  return { columnEquals }
}

export default LastFilmSelector