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
                <div class="card-body col-2">
                    <i class="far fa-file-code"></i>
                    <p class="text-white" id="repo${uniqueId}">${data2.name}</p>
                    <a href="${data2.url}" id="repo-link${uniqueId}">Repository</a>
                    <p class="text-white" id="repo-size${uniqueId}">${data2.size} KB</p>
                </div>`;
                uniqueId++;
            });
    
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
                            <h2 id="name">${data1.name}</h2>
                            <p id="location">${data1.location}</p>
                            <a href="${data1.html_url}" id="url" target="_blank">@${data1.login}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col p-0">
                    <div class="row m-0 text-center justify-content-center">
                        <p class="card-body text-white">Public Repositories: ${data1.public_repos}</p>
                        <p class="card-body text-white">Total Followers: ${followers}</p>
                    </div>
                </div>
            </div>
            <div id="appendRepos" class="row justify-content-between">
                ${repoHtml}
            </div>
            </section>`;
            
            $main.html(html);
        })
    });
}

$searchBtn.on("click", searchUser);
