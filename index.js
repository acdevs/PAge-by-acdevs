const year0 = document.getElementById("year-0");
const year1 = document.getElementById("year-1");
const frac0 = document.getElementById("frac-0");
const frac1 = document.getElementById("frac-1");
const frac2 = document.getElementById("frac-2");
const frac3 = document.getElementById("frac-3");
const frac4 = document.getElementById("frac-4");
const frac5 = document.getElementById("frac-5");
const frac6 = document.getElementById("frac-6");
const frac7 = document.getElementById("frac-7");
const confetti = document.querySelector(".confetti");
const confettiColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--primary-color');

let particles = [];
const colors = [confettiColor];
function pop() {
  for (let i = 0; i < 500; i++) {
    const p = document.createElement("p");
    p.x = window.innerWidth * 0.5;
    p.y = window.innerHeight + Math.random() * window.innerHeight * 0.3;
    p.vel = {
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * -20 - 15,
    };
    p.mass = Math.random() * 0.2 + 0.8;
    particles.push(p);
    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
    const size = Math.random() * 15 + 5;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.backgroundColor = colors[0];
    p.style.borderRadius = "50%";
    confetti.appendChild(p);
  }
}

function render() {
  for (let i = particles.length - 1; i > -1; i--) {
    const p = particles[i];
    p.style.transform = `translate3d(${p.x}px, ${p.y}px, 10px)`;

    p.x += p.vel.x;
    p.y += p.vel.y;

    p.vel.y += 0.2 * p.mass;
    if (p.y > window.innerHeight * 10) {
      p.remove();
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(render);
}

const once = () => {
  let hasBeenCalled = false;
  return function (...args) {
    if (hasBeenCalled) {
      return undefined;
    } else {
      hasBeenCalled = true;
      pop();
      window.setTimeout(() => render(), 1000);
    }
  };
};

const popOnce = once();

const toDateStringUS = (dateStringIN) => {
  const [day, month, year] = dateStringIN.split("/");
  return `${month}/${day}/${year}`;
};

const calculateAge = (dob) => {
  if (isNaN(dob.getTime())) {
    return NaN;
  }
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hasBirthdayOccurred =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasBirthdayOccurred) {
    age--;
  }
  return age;
};

const getDegrees = function (val) {
  return val * 36;
};

const myDob = localStorage.getItem("MY_PAGE_DOB");
myBirthDay = new Date(toDateStringUS(myDob));
const myAge = calculateAge(myBirthDay);
const myUpcomingBirthDay = new Date(
  new Date().getFullYear(),
  myBirthDay.getMonth(),
  myBirthDay.getDate()
).getTime();

const calculate = setInterval(() => {
  let currDay = new Date().getTime();

  let diff = myUpcomingBirthDay - currDay;
  let ageFracs = 1 - diff / (1000 * 60 * 60 * 24 * 365);
  let years = Math.floor(ageFracs);
  ageFracs = ageFracs.toFixed(9).toString().substring(2);
  let ageYears = (myAge + years).toString();
  if (ageYears.length === 1) {
    ageYears = "0" + ageYears;
  }

  year0.style.transform = `rotateX(${getDegrees(ageYears[0])}deg)`;
  year1.style.transform = `rotateX(${getDegrees(ageYears[1])}deg)`;
  frac0.style.transform = `rotateX(${getDegrees(ageFracs[0])}deg)`;
  frac1.style.transform = `rotateX(${getDegrees(ageFracs[1])}deg)`;
  frac2.style.transform = `rotateX(${getDegrees(ageFracs[2])}deg)`;
  frac3.style.transform = `rotateX(${getDegrees(ageFracs[3])}deg)`;
  frac4.style.transform = `rotateX(${getDegrees(ageFracs[4])}deg)`;
  frac5.style.transform = `rotateX(${getDegrees(ageFracs[5])}deg)`;
  frac6.style.transform = `rotateX(${getDegrees(ageFracs[6])}deg)`;
  frac7.style.transform = `rotateX(${getDegrees(ageFracs[7])}deg)`;

  if (ageYears === String(myAge + 1) && ageFracs === "000000000") {
    popOnce();
  }
}, 0);
