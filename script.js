let wrapper = document.querySelector(".wrapper");
let welcomePage = document.querySelector(".welcome-page");
let loadingPage = document.querySelector(".loading-page");
let displayBar = document.querySelector(".display-bar");
let searchBar = document.querySelector(".search-bar");
let inputArea = document.querySelector("[data-userHandle]");
let inputText = document.querySelector("[data-userKaNaam]");
let modeButton = document.querySelector(".mode-button");
let notFound = document.querySelector(".not-found");
let modeText = document.querySelector("#mode-text");

welcomePage.classList.add("active");
let data;
let response;
let rawData;

function renderUserInfo(data) {
  if (data?.status === "FAILED") {
    notFound.classList.add("active");
    console.log("failed");
  } else if (data?.status === "OK") {
    welcomePage.classList.remove("active");
    notFound.classList.remove("active");

    let name = document.querySelector("[data-name]");
    let handle = document.querySelector("[data-handle]");
    let cityCountry = document.querySelector("[data-cityCountry]");
    let contribution = document.querySelector("[data-contri]");
    let organization = document.querySelector("[data-org]");
    let currentInfo = document.querySelector("[data-current]");
    let maxInfo = document.querySelector("[data-max]");
    let titlePhoto = document.querySelector("[data-profilePic]");

    let firstName = data?.result?.[0]?.firstName;
    let lastName = data?.result?.[0]?.lastName;
    name.textContent = `${firstName} ${lastName}`;

    let country = data?.result?.[0]?.country;
    let city = data?.result?.[0]?.city;
    cityCountry.textContent = `${city}, ${country}`;

    let userhandle = data?.result?.[0]?.handle;
    handle.href = `https://codeforces.com/profile/${userhandle}`;
    handle.textContent = userhandle;

    contribution.textContent = `Contributions: ${data?.result?.[0]?.contribution}`;
    let currentRating = data?.result?.[0]?.rating;
    let currentRank = data?.result?.[0]?.rank;
    let maxRating = data?.result?.[0]?.maxRating;
    let maxRank = data?.result?.[0]?.maxRank;
    currentInfo.textContent = `Rating: ${currentRating}, Rank: ${currentRank}`;
    maxInfo.textContent = `MaxRating: ${maxRating}, MaxRank: ${maxRank}`;

    organization.textContent = data?.result?.[0]?.organization;
    titlePhoto.src = data?.result?.[0]?.titlePhoto;

    displayBar.classList.add("active");
  }
}

async function fetchUserDetails(userHandle) {
  try {
    welcomePage.classList.remove("active");
    displayBar.classList.remove("active");
    notFound.classList.remove("active");
    loadingPage.classList.add("active");
    response = await fetch(
      `https://codeforces.com/api/user.info?handles=${userHandle}&checkHistoricHandles=false`
    );
    rawData = await response.text();
    data = JSON.parse(rawData);
    loadingPage.classList.remove("active");

    renderUserInfo(data);
  } catch (error) {
    console.log("Error Detected Brother", error);
  }
}

inputArea.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hello");
  if (inputText.value === "") return;
  else {
    let userHandle = inputText.value;
    fetchUserDetails(userHandle);
  }
});

modeButton.addEventListener("click", () => {
  if (wrapper.classList.contains("dark-mode")) {
    wrapper.classList.remove("dark-mode");
    displayBar.classList.remove("dark-mode");
    welcomePage.classList.remove("dark-mode");
    modeText.textContent = "Dark Mode";
    modeButton.style.boxShadow = "5px 5px 30px black";
  } else {
    wrapper.classList.add("dark-mode");
    displayBar.classList.add("dark-mode");
    welcomePage.classList.add("dark-mode");
    modeText.textContent = "Light Mode";
    modeButton.style.boxShadow = "0px 0px 20px white";
  }
});
