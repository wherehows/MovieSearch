export default function Symbol({ target }) {
  const $name = document.createElement("h2");
  $name.textContent = "MovieSearch";
  $name.className = "symbol";

  const init = () => {
    const render = () => {
      target.appendChild($name);
    };

    render();
  };

  init();
}
