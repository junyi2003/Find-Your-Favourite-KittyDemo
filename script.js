
const spinnerOverlay = document.getElementById("spinnerOverlay");
const catImg = document.getElementById("catImg");
const likesText = document.getElementById("likes");
const captiondiv = document.getElementById("caption");

const Usernames = ["CatLover99", "FelineFanatic", "PurrfectPal", "WhiskerWizard", "MeowMaster", "ClawCraze", "KittyKrazy", "TabbyTales", "PawsomeAdventures", "FurballFrenzy"];
const comments =[ "This kitty is serving model vibes 🐾💖",
  "Fluff level: 1000/10. I can’t handle the cuteness 😻",
  "Who gave this cat permission to be this gorgeous?!",
  "That face could melt the coldest heart 🐈💕",
  "Cats are secretly royalty 👑🐾",
  "Perfection clearly has whiskers 🐱✨",
  "Internet royalty has arrived 👑✨",
  "Excuse me… who allowed this much cuteness online?!",
  "That face deserves its own fan club 🐾💖",
  "This post just made my whole day brighter 🌞🐾",
  "Fluff levels are officially off the charts 💯🐈",
  "I didn’t know perfection had whiskers 🐱",
  "This is the kind of content I signed up for 😻",
  "That kitty is pure serotonin 🐾💫",
  "Cuteness overload detected 🚨🐱💕"
];


function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCaption() {
        captiondiv.innerHTML="";
        for(let i=0;i<2;i++){
        const username = getRandomElement(Usernames);
        const comment = getRandomElement(comments);
        const p = document.createElement("p");
        p.innerHTML = `<strong>${username}</strong>  ${comment}`;
        captiondiv.appendChild(p);
    }
}
function getcats() {

    spinnerOverlay.style.display = "flex";
    fetch('https://cataas.com/cat?width=400&height=400')
        .then(response => response.blob())
        .then(blob => {
            const imgUrl = URL.createObjectURL(blob)

            catImg.onload = () => {
                spinnerOverlay.style.display = "none"; 
            };

            catImg.src = imgUrl; 
        }
    )
    likesText.innerText = `${Math.floor(Math.random() * 1000) + 1} likes`;
    generateCaption();

}


const displayArea = document.getElementById("swipe-area");

const hammer = new Hammer(displayArea);

let like = 0;
let dislike = 0;
let like_cat= [];

hammer.on("swipeleft", function (event) {
    if (like + dislike < 10) {
        dislike++;
        getcats();
        showResults();
    }
    else {
        alert("You have reached the maximum number of swipes.");
    }
}
)

hammer.on("swiperight", function (event) {
    if (like + dislike < 10) {
        like_cat.push(catImg.src);
        like++;
        getcats();
        showResults();
    }
    else {
        alert("You have reached the maximum number of swipes.");
    }
}
)



function showResults() {
    if (like + dislike === 10) {
        document.getElementById("SummaryMsg").innerText = `You liked ${like} cats and disliked ${dislike} cats.`;
        openLikedCatsModal();
    }
   
}

function reset() {
    like = 0;
    dislike = 0;
    document.getElementById("SummaryMsg").innerText = "";
    getcats();
    like_cat = [];
    const customModal = document.getElementById("customModal");
    customModal.style.display = "none";

}

function showLikedCats() {
    const likedCatsContainer = document.getElementById("LikedCatGalleryContainer");
    likedCatsContainer.innerHTML = ""; // Clear previous images

    like_cat.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.id = "likedCatImg";
        img.className = "liked-cat-img m-2";
        likedCatsContainer.appendChild(img);
    })


}

function openLikedCatsModal() {
    const likedCatsModal =  document.getElementById("customModal");
    likedCatsModal.style.display = "flex";
        const modalContent = likedCatsModal.querySelector('.modal-content');
    modalContent.scrollTop = 0;
    showLikedCats();
}

const swipeSection = document.getElementById("swipePage");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            getcats();
            observer.unobserve(swipeSection); // stop observing after first load
        }
    });
}, { threshold: 0.1 }); // triggers when 10% of section is visible

observer.observe(swipeSection);


function scrollToSwipe() {
  const swipeSection = document.getElementById("swipePage");
  swipeSection.scrollIntoView({ behavior: "smooth" });
  getcats();
}



