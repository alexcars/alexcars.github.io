/* Debugging version control */
let v = 1;
const ERROR_LENGTH = 4 * 1000; // 4 seconds
console.log(`Version: ${v}`);

let navActive = false;

/* Navbar variables */
let navCon = document.getElementById("nav-container");

/* Functions */
function hashString(str) {
    return encodeURIComponent(str);
}

function toggleNav() {
    navActive = !navActive;
    if (navActive) {
        navCon.id = "nav-container-active";
    } else {
        navCon.id = "nav-container";
    }
}

async function main() {
    // Navbar
    let res = await fetch("/../main/navbar.html");
    let txt = await res.text();
    let oldelem = document.getElementById("replace-with-navbar");
    if (!oldelem) {
        return;
    }
    let newelem = document.createElement("div");
    newelem.innerHTML = txt;
    oldelem.parentNode.replaceChild(newelem, oldelem);
}

async function setActive() {

    await main().catch(console.log);

    let url = window.location.href; // currently unused
}

/* Events & Run */

window.addEventListener("resize", (event) => {
    let navContainer = document.getElementById("nav-container") || document.getElementById("nav-container_active");
    if (window.innerWidth <= 1080 && navContainer.id == "nav-container_active") {
        navContainer.id = "nav-container";
    }
});

let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);
document.documentElement.style.setProperty('--vwh', `${Math.min(vh, vw)}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vwh', `${Math.min(vh, vw)}px`);
});

setActive().catch(console.log);

function OnError(message) {
    let errObj = document.createElement("div");
    errObj.style.position = "fixed";
    errObj.style.right = "calc(var(--vw, 1vw) * 5)";
    errObj.style.bottom = "0px";
    errObj.style.color = "#fff";
    errObj.style.backgroundColor = "#cccccc7d";
    errObj.style.borderRadius = "50px";
    errObj.style.borderColor = "#000000cc";
    errObj.style.borderStyle = "solid";
    errObj.style.zIndex = "99"; // should be on top of everything
    errObj.style.backdropFilter = "blur(3)";
    errObj.style.textAlign = "center";
    errObj.style.fontSize = "calc(var(--vh, 1vh) * 3)";
    errObj.style.padding = "5px";
    errObj.textContent = message;
    document.body.appendChild(errObj);
    setTimeout(() => {
        errObj.remove();
    }, ERROR_LENGTH);
}

window.onerror = function (message, source, lineno, colno, error) {
    let msg = message;
    if (message == "Script error.") {
        msg = "An unknown script error has occured.";
    }
    OnError(msg);
}
