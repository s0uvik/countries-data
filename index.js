const select = document.getElementById("select");
const template = document.querySelector(".template");
const contentiner = document.querySelector(".container");

listOfCountries.forEach((elm) => {
  const option = document.createElement("option");
  option.value = `${elm.name}`;
  option.innerText = `${elm.name}`;
  select.append(option);
});

select.addEventListener("change", () => {
  let selectedValue = select.value;
  fetch(`https://restcountries.com/v3.1/name/${selectedValue}`)
    .then((res) => res.json())
    .then((data) => {
      const _content = template.content.cloneNode(true).children[0];

      const flag = _content.querySelector(".flag");
      const name = _content.querySelector(".name");
      const capital = _content.querySelector(".capital");
      const population = _content.querySelector(".population");
      const currencies = _content.querySelector(".currencies");
      const language = _content.querySelector(".language");

      flag.src = data[0].flags.png;
      name.innerText = `Name📛: ${data[0].name.common}`;
      capital.innerText = `Capital: ${data[0].capital[0]}`;
      population.innerText = `Population👫: ${data[0].population}`;
      currencies.innerText = `Currencies💰: ${
        Object.keys(data[0].currencies)[0]
      }`;
      language.innerText = `Language🗣️: ${Object.values(data[0].languages)[0]}`;

      contentiner.insertAdjacentElement("afterbegin", _content);
    });
});
