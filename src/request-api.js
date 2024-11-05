import axios from "axios";

export default async function requestApi(textSearch, pages) {
  const savedQuery = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: "gTIaBrNroRq-C3Cc0c230WokBG-ut0gZc17PvdScx8I",
      query: `${textSearch}`,
      per_page: 12,
      page: `${pages}`,
    },
  });
  return savedQuery;
}
