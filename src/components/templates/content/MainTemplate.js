import { MovieCard } from "@molecules";

export default function MainTemplate({
  target,
  initialState,
  onRequestAdditionalMovies,
}) {
  const $mainTemplate = document.createElement("div");
  $mainTemplate.className = "main-template";

  let state = initialState;

  this.setState = (nextState) => {
    if (state.movieName !== nextState.movieName) {
      const $movieCardWarpper = $mainTemplate.querySelector(
        ".main-template__movie-card-wrapper"
      );

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      handleClearPriorSearch($movieCardWarpper);
    }

    state = nextState;
    render();
  };

  const init = () => {
    const render = () => {
      const html = /* html */ `
          <div class="main-template__no-search">영화를 검색해 주세요</div>
          <ul class="main-template__movie-card-wrapper"></ul>
          <div class="main-template__scroll-observer hidden"></div>
          `;

      $mainTemplate.innerHTML = html;

      target.appendChild($mainTemplate);
    };

    render();

    const config = () => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onRequestAdditionalMovies();
            }
          });
        },
        {
          thershold: 0.3,
        }
      );

      const $observer = $mainTemplate.lastElementChild;
      io.observe($observer);
    };

    config();
  };

  init();

  const render = () => {
    if (state.results.length !== 0) {
      const $dummy = document.createDocumentFragment();

      const { results } = state;

      results.forEach((movieInfo) => {
        new MovieCard({ target: $dummy, initialState: movieInfo });
      });

      const $observer = $mainTemplate.lastElementChild;
      $observer.classList.remove("hidden");

      const $movieCardWrapper = $mainTemplate.querySelector(
        ".main-template__movie-card-wrapper"
      );

      $movieCardWrapper.appendChild($dummy);

      const $noSearch = $mainTemplate.querySelector(
        ".main-template__no-search"
      );

      $noSearch.classList.add("hidden");
    }
  };

  const handleClearPriorSearch = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
}
