import { IMAGE_PATH } from "@utils/constants.js";

export default function MovieCard({ target, initialState }) {
  const $movieCard = document.createElement("li");
  $movieCard.className = "movie-card";

  const state = initialState;

  const init = () => {
    const initRender = () => {
      const { poster_path, title, overview, vote_average } = state;

      const $posterWrapper = document.createElement("div");
      $posterWrapper.className = "movie-card__poster-wrapper";

      $posterWrapper.innerHTML = /* html */ `
        <img class="movie-card__poster" src="${IMAGE_PATH}${poster_path}"/>
      `;

      const $movieInfoWrapper = document.createElement("div");
      $movieInfoWrapper.className = "movie-card__movie-info";

      $movieInfoWrapper.innerHTML = /* html */ `
        <h3 class="movie-card__name">${title}</h3>
        <p class="movie-card__overview">${overview}</p>
        <div class="movie-card__rating">rating ${vote_average} / 10 </div>
      `;

      $movieCard.append($posterWrapper, $movieInfoWrapper);

      target.appendChild($movieCard);
    };

    initRender();
  };

  init();
}
