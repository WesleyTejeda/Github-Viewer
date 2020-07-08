const $userField = $("#inputUser");
const $searchBtn = $("#search");
const $main = $("#main");
let userName = "";
let queryURL = "https://api.github.com/users/";

function searchUser(){
    event.preventDefault();
    userName = $userField.val();
    let genQuery = queryURL + userName; 
    getGithub(genQuery);
}

function getGithub(query) {
    $.ajax({
        url: query,
        method: "GET"
    }).then( (data1) => {
        postUserInfo(data1);
    });
}

async function postUserInfo(data1){
    $main.empty();
    let followers = 0;
    let repoHtml =``;
    $.get(queryURL + userName+"/followers").then(resp => {
        resp.forEach(() => followers++);
        console.log(followers);
        $.get(queryURL + userName+"/repos", data1).then(data2 => {
            let uniqueId = 0;
            data2.forEach(data2 => {
                repoHtml += `
                <a href="${data2.html_url}" id="repo-link${uniqueId}" target="_blank" class="card-body col-lg-3 col-md-4 col-sm-6 text-center repo-container">
                    <i class="far fa-file-code"></i>
                    <p >${data2.name}</p>
                    <p class="repo">${data2.language}</p>
                    <p class="text-white" id="repo-size${uniqueId}">${data2.size} KB</p>
                    <p class="text-white"><i class="fas fa-code-branch"></i> ${data2.forks_count} <i class="fas fa-star"></i> ${data2.stargazers_count}</p>
                </a>`;
                uniqueId++;
            });
            let userDate = formatDate(data1.created_at);
            let html =`<section class="container">
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div id="photoContainer" class="justify-content-between">
                            <img id="photo" src="${data1.avatar_url}">
                        </div>
                    </div>
                    <div class="row text-center">
                        <div id="accInfo">
                            <h2>${data1.name}</h2>
                            <p><i class="far fa-calendar"></i> Joined ${userDate}</p>
                            <a id="userURL" href="${data1.html_url}" target="_blank">@${data1.login}</a>
                            <p><i class="fas fa-map-marker-alt"></i> ${data1.location}</p>
                            <p>${data1.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="stats" class="row text-center">
                <p class="col-6 card-body text-white pr-2">Public Repositories: ${data1.public_repos} <i class="far fa-folder"></i></p>
                <p class="col-6 card-body text-white pl-2">Total Followers: ${followers} <i class="fas fa-user-friends"></i></p>
            </div>
            <div id="appendRepos" class="row justify-content-center">
                ${repoHtml}
            </div>
            </section>`;
            
            $main.html(html);
            addLanguageColor();
        })
    });
}

$searchBtn.on("click", searchUser);

function formatDate(date) {
    date = date.substr(0,10);
    date = date.split("-");
    let finalDate = `${date[1]}/${date[2]}/${date[0]}`
    return finalDate;
}

function addLanguageColor(){
    $.get("/colors").then(colors => {
        let json = colors;
        // console.log(json);
        $(".repo").each(function(){
            $(this).css("color", json[$(this).html()]);
        });
    });
}
