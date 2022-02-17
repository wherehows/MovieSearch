import { HeaderTemplate, MainTemplate } from "@templates";
import request from "@utils/api.js";
import { MOVIE_SEARCH_PATH } from "@utils/constants.js";

export default function MainPage({ target }) {
  const $mainPage = document.createElement("div");
  $mainPage.className = "main-page";

  let state = {
    movieName: "",
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  };

  this.setState = (nextState) => {
    state = nextState;
    const { movieName, results } = state;
    $mainTemplate.setState({ movieName, results });
  };

  new HeaderTemplate({
    target: $mainPage,
    onSearchByInput: handleSearchByInput.bind(this),
    onSearchByButton: handleSearchByButton.bind(this),
  });

  const $mainTemplate = new MainTemplate({
    target: $mainPage,
    initialState: { movieName: state.movieName, results: state.results },
    onRequestAdditionalMovies: handleRequestAdditionalMovies.bind(this),
  });

  const init = () => {
    const initRender = () => {
      target.appendChild($mainPage);
    };

    initRender();
  };

  init();

  async function handleSearchByInput(e) {
    if (e.key !== "Enter") return;

    const { value: movieName } = e.target;

    if (movieName.length > 0) {
      const res = await request(MOVIE_SEARCH_PATH + `&query=${movieName}`);
      this.setState({ movieName, ...res });
    }
  }

  async function handleSearchByButton({ currentTarget }) {
    const { previousSibling: $input } = currentTarget;
    const { value: movieName } = $input;

    if (movieName.length > 0) {
      const res = await request(MOVIE_SEARCH_PATH + `&query=${movieName}`);
      this.setState({ movieName, ...res });
    }
  }

  async function handleRequestAdditionalMovies() {
    const res = await request(
      MOVIE_SEARCH_PATH + `&query=${state.movieName}&page=${state.page + 1}`
    );

    this.setState({ movieName: state.movieName, ...res });
  }
}
