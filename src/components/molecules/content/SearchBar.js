export default function SearchBar({
  target,
  onSearchByInput,
  onSearchByButton,
}) {
  const $searchBar = document.createElement("div");
  $searchBar.className = "header-template__searchbar";

  const init = () => {
    const render = () => {
      const html = /* html */ `
        <input class="header-template__input"/>
        <button class="header-template__button">
          <i class=material-icons>search</i>
        </button>
          `;

      $searchBar.innerHTML = html;

      target.appendChild($searchBar);
    };

    render();

    const config = () => {
      const $button = $searchBar.querySelector(".header-template__button");
      $button.addEventListener("click", onSearchByButton, { capture: true });

      const $input = $searchBar.getElementsByTagName("input")[0];
      $input.addEventListener("keyup", onSearchByInput);
    };

    config();
  };

  init();
}
