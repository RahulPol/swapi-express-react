export const searchByPlanet = (searchStr) =>
  fetch("search/planets?searchStr=" + searchStr, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
