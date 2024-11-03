import axios from "axios";

export default async function requestApi(textSearch, pages) {
  console.log(pages);
  const savedQuery = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: "gTIaBrNroRq-C3Cc0c230WokBG-ut0gZc17PvdScx8I",
      // key: "gTIaBrNroRq-C3Cc0c230WokBG-ut0gZc17PvdScx8I",
      query: `${textSearch}`,
      // image_type: "photo",
      // orientation: "horizontal",
      // safesearch: true,
      per_page: 12,
      page: `${pages}`,
    },
  });
  return savedQuery;
}
