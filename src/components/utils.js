export function sort(array, key, order) {
  return array.sort((a, b) => {
    if (order === "asc") {
      return b[key].localeCompare(a[key]);
    }

    return a[key].localeCompare(b[key]);
  });
}

export function filter(array, key, term) {
  if (!term) {
    return array;
  }

  return array.filter((element) => element[key].toLowerCase().includes(term.toLowerCase()));
}
