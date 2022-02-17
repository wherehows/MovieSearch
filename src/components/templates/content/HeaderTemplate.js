import { Symbol } from "@atoms";
import { SearchBar } from "@molecules";

export default function HeaderTemplate({
  target,
  onSearchByInput,
  onSearchByButton,
}) {
  const $headerTemplate = document.createElement("header");
  $headerTemplate.className = "header-template";

  new Symbol({ target: $headerTemplate });

  new SearchBar({
    target: $headerTemplate,
    onSearchByInput,
    onSearchByButton,
  });

  const init = () => {
    const render = () => {
      target.appendChild($headerTemplate);
    };

    render();
  };

  init();
}
