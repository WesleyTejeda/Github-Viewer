const $userField = $("#inputUser");
const $searchBtn = $("#search");
const $formCont = $("#formContainer");
let userName = "";
let queryURL = "https://api.github.com/users/";

// function getUser(){
//     return $.ajax({
//         url: "/"+userName,
//         method: "GET",
//     })
// }

function searchUser(){
    event.preventDefault();
    userName = $userField.val();
    getGithub();
}

function getGithub() {
    $.ajax({
        url: queryURL + userName,
        method: "GET"
    }).then( (data) => {
        postUserInfo(data);
    });
}
function postUserInfo(data){
    $formCont.empty();

    let newContent = $("<div>");
    let gitObj ={
        gitUser: data.name,
        gitLoc: data.location,
        gitProfPic: data.avatar_url,
        gitURL: data.html_url,
        gitRepos: data.public_repos,
    }
    let image = $("<img>").attr("src", gitObj.gitProfPic);
    image.attr("style", "width: 200px");
    let user = $("<p>").html("User: "+gitObj.gitUser);
    let loc = $("<p>").html("Location: "+gitObj.gitLoc);
    let url = $("<a>").attr("href", gitObj.gitURL).attr( "style", "color: white").html("Link: "+gitObj.gitURL);
    let repos = $("<p>").html("Public Respositories: "+gitObj.gitRepos);
    newContent.append(user);
    newContent.append(image);
    newContent.append(loc);
    newContent.append(url);
    newContent.append(repos);
    newContent.attr("style", "color: white");
    $formCont.append(newContent);
}

$searchBtn.on("click", searchUser);
