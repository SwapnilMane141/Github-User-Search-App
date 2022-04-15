'use strict';

const darkModeButton = document.querySelector('.dark-mode');
const body = document.querySelector('.body');
const profileBox = document.querySelector('.profile-box');
const profilestatsBox = document.querySelector('.profile-stats');

// Text Fields

const title = document.querySelector('.title');
const searchBoxInput = document.querySelector('.search-box__input');
const greyTextFields = document.querySelectorAll('.grey-text');
const greyBlueTextFields = document.querySelectorAll('.grey-blue-text');
const searchError = document.querySelector('.search-error');

// Data fields to be changes by api
const profileImage = document.querySelector('.profile-img');
const nameElement = document.querySelector('.profile-name');
const userNameElement = document.querySelector('.profile-username');
const bioElement = document.querySelector('.profile-bio');
const reposElement = document.querySelector('.repo');
const followersElement = document.querySelector('.followers');
const followingElement = document.querySelector('.following');
const locationElement = document.querySelector('.location');
const twitterUsernameElement = document.querySelector('.twitter-username');
const blogElement = document.querySelector('.blog-link');
const companyElement = document.querySelector('.company');


// Search input and Btn

const searchInputBox = document.querySelector('.search-box__input');
const searchButton = document.querySelector('.search-btn');


const lightHtmlContent = `
<div class="light-mode__text">Light</div>
<img src="images/icon-sun.svg" alt="Light mode icon" class="light-mode__icon">
`;

const darkHtmlContent = `
    <div class="dark-mode__text">DARK</div>
    <img src="images/icon-moon.svg" alt="Dark mode icon" class="dark-mode__icon">
`;


searchButton.addEventListener('click',async() => {
    const inputBoxValue = searchBoxInput.value;
    searchBoxInput.value = null;

    try{
        const resp = await fetch(`https://api.github.com/users/${inputBoxValue}`);
        if(resp.status === 200){
            const data = await resp.json();
            console.log(data);
            searchError.classList.add('hidden')
            const profileImgSrc = data.avatar_url;
            const name = data.name;
            const username = data.login;
            const bio = data.bio;
            const repos = data.public_repos;
            const followers = data.followers;
            const following = data.following;
            const location = data.location;
            const twitterUsername = data.twitter_username;
            const blog = data.blog;
            const company = data.company;
            
            profileImage.src = profileImgSrc;
            nameElement.innerHTML = name === null ? username : name;
            userNameElement.innerHTML = `@${username}`;
            bioElement.innerHTML = bio === null ? 'No bio' : bio;
            reposElement.innerHTML = repos;
            followersElement.innerHTML = followers;
            followingElement.innerHTML = following;
            locationElement.innerHTML = location === null ? 'Not Available' : location;
            twitterUsernameElement.innerHTML = twitterUsername === null ? 'Not Available':twitterUsername;
            blogElement.innerHTML = blog === "" ? 'Not Available' : blog;
            companyElement.innerHTML = company === null ? 'Not Available' : company;
        } else if(resp.status === 404){

            searchError.classList.remove('hidden')
        } else{
            console.log('Something went wrong. Please Try again letter!');
        }
        
    } catch(e){
        console.log('Something went wrong. Please Try again letter!');
    }

    
})











darkModeButton.addEventListener('click',function(){
    if(darkModeButton.innerHTML === lightHtmlContent){
        darkModeButton.innerHTML = darkHtmlContent;
    } else{
        darkModeButton.innerHTML = lightHtmlContent;
    }
    
    body.classList.toggle('applied-dark-mode');
    profileBox.classList.toggle('box-dark-mode');
    profileBox.classList.toggle('white-text');
    searchBoxInput.classList.toggle('applied-dark-mode');
    profilestatsBox.classList.toggle('applied-dark-mode');
    
    title.classList.toggle('white-text');

    greyTextFields.forEach((element) => element.classList.toggle('grey-text'));
    greyTextFields.forEach((element) => element.classList.toggle('white-text'));

    greyBlueTextFields.forEach((element) => element.classList.toggle('grey-blue-text'));
    greyBlueTextFields.forEach((element) => element.classList.toggle('white-text'));
})


