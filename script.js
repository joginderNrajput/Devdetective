const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;

const get = (param) => document.getElementById(`${param}`);

// API Call
const url = "https://api.github.com/users/";
const noresult = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const username = get("name");
const user = get("user");
const date = get("date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const userlocation = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listner
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener("input", function () {
  noresult.style.display = "none";
});

btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Functions for API Call
function getUserData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        updateProfile(data);
      })
      .catch((error) => {
        throw error;
      });
  }

// function for rendring on UI
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresult.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    username.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;

    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;

    bio.innerText =
      data.bio == null ? "This Profile has no Bio!" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    userlocation.innerText = checkNull(data.location, userlocation)
      ? data.location
      : "Not Available!";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available!";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter)
      ? data.twitter_username
      : "Not Available!";

    twitter.href = checkNull(data.twitter_username, twitter)
      ? `https://twitter.com/${data.twitter_username}`
      : "#";

    company.innerText = checkNull(data.company, company)
      ? data.company
      : "Not Available!";

    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresult.style.display = "block";
  }
}

// switch to dark mode -- activate Dark Mode
function darkModeProperties() {
  root.setProperty("--lm-bg", "#212d46");
  root.setProperty("--lm-bg-content", "#131124");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg","brightness(1000%)");
  avatar.style.border = "3px solid #f4f2f2";
  darkMode = true;
  localStorage.setItem("dark-mode", true);
}

// switch to light mode light mode properties 
function lightModeProperties(){
    root.setProperty("--lm-bg", "#dce8dc");
  root.setProperty("--lm-bg-content", "#ffffff");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  avatar.style.border = "3px solid #3e2020";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode",false);
}

//   Initializing the UI for the first time 
function init(){
    darkMode = true;
    const value = localStorage.getItem("dark-mode");
    if(value === "null"){
        localStorage.setItem("dark-mode", darkMode);
        lightModeProperties();
    }else if(value === "true"){
        darkModeProperties();
    }else if(value == "false"){
        lightModeProperties();
    }
    getUserData(url + "jogindernrajput");
}
init();

