const fromInput = document.querySelector("input[list='from']");
const toInput = document.querySelector("input[list='to']");
const datalistToOptions = document.querySelectorAll("#to option");
const amount = document.querySelector(".amount");
const button = document.querySelector("button");
const result = document.querySelector(".result");
fromInput.addEventListener("input", () => {
  datalistToOptions.forEach((option) => {
    option.removeAttribute("disabled");
    if (option.value === fromInput.value) {
      option.setAttribute("disabled", "");
    }
  });
});

async function convert() {
  if (fromInput.value !== "" && toInput.value !== "" && amount.value !== "") {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/95bc9270b9f57906a54904ed/latest/${fromInput.value.toUpperCase()}`
      );
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Choose a valid currency!",
        });
      } else {
        const data = await response.json();
        const toAmount = data.conversion_rates[toInput.value.toUpperCase()]
        if (toAmount === undefined) {
          Swal.fire({
            icon: "error",
            title: "Choose a valid currency"
          })
        } else {
          const totalAmount = (amount.value * toAmount).toFixed(2)
          result.innerHTML = `<span>${amount.value}</span> ${fromInput.value} = <span>${totalAmount}</span> ${toInput.value}`
        }
      }
    }
    finally {
      amount.value = ''
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Fill out all fields please!",
    });
  }
}
