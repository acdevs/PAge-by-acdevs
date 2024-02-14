const ROOT = document.querySelector(':root');
const YEAR0 = document.getElementById("year-0");
const YEAR1 = document.getElementById("year-1");
const FRAC0 = document.getElementById("frac-0");
const FRAC1 = document.getElementById("frac-1");
const FRAC2 = document.getElementById("frac-2");
const FRAC3 = document.getElementById("frac-3");
const FRAC4 = document.getElementById("frac-4");
const FRAC5 = document.getElementById("frac-5");
const FRAC6 = document.getElementById("frac-6");
const FRAC7 = document.getElementById("frac-7");
const FRAC8 = document.getElementById("frac-8");
const CONFETTI = document.querySelector(".confetti");
const CONFETTICOLOR = getComputedStyle(document.querySelector(':root')).getPropertyValue('--primary-color');

chrome.storage.sync.get(['primaryColor', 'secondaryColor', 'isDark'], function(theme) {
  if(Object.keys(theme).length === 0 && theme.constructor === Object){
      return;
  }
  ROOT.style.setProperty('--primary-color', theme.primaryColor);
  ROOT.style.setProperty('--secondary-color', theme.secondaryColor);
  ROOT.style.setProperty('--tertiary-color', theme.secondaryColor + 'ee');
  ROOT.style.setProperty('--text-color', theme.secondaryColor );
});

let particles = [];
const COLORS = [CONFETTICOLOR];
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
    p.style.backgroundColor = COLORS[0];
    p.style.borderRadius = "50%";
    CONFETTI.appendChild(p);
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

const evalDOB = (dob) => {
  if (isNaN(dob.getTime())) {
    return NaN;
  }
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear() - 1;
  let upcomingBirthDay = new Date(
    now.getFullYear(),
    dob.getMonth(),
    dob.getDate()
  ).getTime();
  return { age, upcomingBirthDay };
};

const getDegrees = function (val) {
  return val * 36;
};

chrome.storage.sync.get("MY_PAGE_DOB", (data) => {
  const myDob = data.MY_PAGE_DOB;
  myBirthDay = new Date(toDateStringUS(myDob));
  const { age : myAge, upcomingBirthDay : myUpcomingBirthDay } = evalDOB(myBirthDay);

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

    YEAR0.style.transform = `rotateX(${getDegrees(ageYears[0])}deg)`;
    YEAR1.style.transform = `rotateX(${getDegrees(ageYears[1])}deg)`;
    FRAC0.style.transform = `rotateX(${getDegrees(ageFracs[0])}deg)`;
    FRAC1.style.transform = `rotateX(${getDegrees(ageFracs[1])}deg)`;
    FRAC2.style.transform = `rotateX(${getDegrees(ageFracs[2])}deg)`;
    FRAC3.style.transform = `rotateX(${getDegrees(ageFracs[3])}deg)`;
    FRAC4.style.transform = `rotateX(${getDegrees(ageFracs[4])}deg)`;
    FRAC5.style.transform = `rotateX(${getDegrees(ageFracs[5])}deg)`;
    FRAC6.style.transform = `rotateX(${getDegrees(ageFracs[6])}deg)`;
    FRAC7.style.transform = `rotateX(${getDegrees(ageFracs[7])}deg)`;
    FRAC8.style.transform = `rotateX(${getDegrees(ageFracs[8])}deg)`;

    if (ageYears === String(myAge + 1) && ageFracs === "000000000") {
      popOnce();
    }
  }, 0);
});