var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var errorLabelName = document.getElementById("errorLabelName");
var errorLabelUrl = document.getElementById("errorLabelUrl");
var searchInput = document.getElementById("searchInput");
var sitesArr;
var updateSiteIndex = 0;

if (localStorage.getItem("sites") == null)
    sitesArr = [];
else {
    sitesArr = JSON.parse(localStorage.getItem("sites"));
    displaySites(sitesArr);
}

submitBtn.addEventListener("click", function () {
    addSite();
});

updateBtn.addEventListener("click", function () {
    updateSite();
});

searchInput.addEventListener("keyup", function () {
    searchSite();
});

function checkInputs() {
    if (siteNameInput.value == "") {
        errorLabelName.classList.remove("d-none");
        return false;
    }
    else if (siteUrlInput.value == "") {
        errorLabelUrl.classList.remove("d-none");
        return false;
    }
    else if (!validateName(siteNameInput.value)) {
        errorLabelName.classList.remove("d-none");
        errorLabelName.innerHTML = "ex: Udemy";
        return false;
    }
    else if (!validateUrl(siteUrlInput.value)) {
        errorLabelUrl.classList.remove("d-none");
        errorLabelUrl.innerHTML = "ex: https://www.udemy.com";
        return false;
    }
    else {
        errorLabelName.classList.add("d-none");
        errorLabelUrl.classList.add("d-none");
        return true;
    }
}

function addSite() {
    if (checkInputs()) {
        var site = {
            sName: siteNameInput.value,
            sUrl: siteUrlInput.value
        };
        sitesArr.push(site);
        localStorage.setItem("sites", JSON.stringify(sitesArr));
        displaySites(sitesArr);
        clearInputs();
    }
}

function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displaySites(arr) {
    var htmlContainer = "";
    for (var i = 0; i < arr.length; i++) {
        htmlContainer += `<div class="item mx-auto my-4 w-75">
        <div class="d-flex">
            <div class="col-sm-6 d-flex p-4">
                <div class="col-6">
                    <h2>${arr[i].sName}</h2>
                </div>
                <a href="${arr[i].sUrl}" target="_blank" class="mx-1 btn btn-primary text-decoration-none pt-2">Visit</a>
                <button class="mx-1 btn btn-danger" onClick="deleteSite(${i})">Delete</button>
                <button class="mx-1 btn btn-success" onClick="updateSiteShowInForm(${i})">Update</button>
            </div>
        </div>
    </div>`;
    }
    if (sitesArr == 0)
        searchInput.classList.replace("d-block", "d-none");
    else
        searchInput.classList.replace("d-none", "d-block");
    document.getElementById("displaySites").innerHTML = htmlContainer;
}

function deleteSite(index) {
    sitesArr.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sitesArr));
    displaySites(sitesArr);
}

function updateSiteShowInForm(index) {
    siteNameInput.value = sitesArr[index].sName;
    siteUrlInput.value = sitesArr[index].sUrl;
    updateSiteIndex = index;
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}

function updateSite() {
    if (checkInputs()) {
        var site = {
            sName: siteNameInput.value,
            sUrl: siteUrlInput.value
        };
        sitesArr[updateSiteIndex] = site;
        localStorage.setItem("sites", JSON.stringify(sitesArr));
        displaySites(sitesArr);
        clearInputs();
        submitBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
    }
}


function validateUrl(siteUrl) {
    var regex = /^(h|H)ttps:\/\/www.[a-z]{3,20}.com$/;
    if (regex.test(siteUrl))
        return true;
    else
        return false;
}
function validateName(siteName) {
    var regex = /^[A-Z][a-z]{3,20}$/;
    if (regex.test(siteName))
        return true;
    else
        return false;
}


function searchSite() {
    var sitesSearch = [];
    for (var i = 0; i < sitesArr.length; i++) {
        if (sitesArr[i].sName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            sitesSearch.push(sitesArr[i]);
        }
    }
    displaySites(sitesSearch);
}


