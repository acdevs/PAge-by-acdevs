const ROOT = document.querySelector(":root");
const DIGITS = document.getElementsByClassName("digit-selector");
const STATUS = document.querySelector(".status");
const WHEELS = [0, 0, 0, 0, 0, 0];
let active_digit = 0;

const showStatusMessage = (message) => {
  STATUS.innerHTML = message.repeat(10);
  STATUS.classList.add("status-show");
  setTimeout(() => {
    STATUS.classList.remove("status-show");
  }, 2000);
};

const toDateStringUS = (dateStringIN) => {
  const [day, month, year] = dateStringIN.split("/");
  return `${month}/${day}/${year}`;
};

const toDateStringIN = (date) => {
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let year = date.getFullYear() % 100;
  year = year < 10 ? "0" + year : year;
  return `${day}/${month}/${year}`;
};

const isDateValid = (dateStringIN) => {
  date = new Date(toDateStringUS(dateStringIN));
  if (isNaN(date.getTime())) return false;
  if (
    date.getFullYear() < 1900 ||
    date.getFullYear() > new Date().getFullYear()
  )
    return false;
  if (
    date.getFullYear() == new Date().getFullYear() &&
    date.getMonth() > new Date().getMonth()
  )
    return false;
  if (
    date.getFullYear() == new Date().getFullYear() &&
    date.getMonth() == new Date().getMonth() &&
    date.getDate() > new Date().getDate()
  )
    return false;
  return true;
};

chrome.storage.sync.get("MY_PAGE_DOB", (data) => {
  const MYDOB = data.MY_PAGE_DOB;
  if (MYDOB) {
    let ageString = MYDOB.split("/").join("");
    for (let i = 0; i < 6; i++) {
      let digit = ageString[i];
      setTimeout(() => {
        ROOT.style.setProperty(`--digit-${i}`, digit);
      }, 1);
      WHEELS[i] = digit;
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    DIGITS[active_digit++].classList.remove("digit-selector-active");
    active_digit = active_digit % 6;
    DIGITS[active_digit].classList.add("digit-selector-active");
  }
  if (event.key === "ArrowLeft") {
    DIGITS[active_digit--].classList.remove("digit-selector-active");
    active_digit = active_digit < 0 ? 5 : active_digit;
    DIGITS[active_digit].classList.add("digit-selector-active");
  }
  if (event.key === "Tab") {
    event.preventDefault();
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    let value = Number(
      getComputedStyle(ROOT).getPropertyValue(`--digit-${active_digit}`)
    );
    let digitValue;
    if (++value >= 0) digitValue = value % 10;
    else digitValue = value == -10 ? 0 : (value % 10) + 10;
    WHEELS[active_digit] = digitValue;
    ROOT.style.setProperty(`--digit-${active_digit}`, value);
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    let value = Number(
      getComputedStyle(ROOT).getPropertyValue(`--digit-${active_digit}`)
    );
    let digitValue;
    if (--value < 0) digitValue = value == -10 ? 0 : (value % 10) + 10;
    else digitValue = value % 10;
    WHEELS[active_digit] = digitValue;
    ROOT.style.setProperty(`--digit-${active_digit}`, value);
  }

  if (event.key === "Enter") {
    let dob = "";
    for (let i = 0; i < 6; i++) {
      dob += WHEELS[i];
      if (i & 1 && i != 5) dob += "/";
    }
    if (!isDateValid(dob)) {
      showStatusMessage("Error");
    } else {
      chrome.storage.sync.set({ "MY_PAGE_DOB": dob });
      showStatusMessage("Saved");
      setTimeout(() => {
        history.back();
        if (history.length <= 1) {
          window.open("index.html", "_self");
        }
      }, 1500);
    }
  }
});
