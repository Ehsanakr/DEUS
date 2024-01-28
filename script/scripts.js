//---THREE.JS---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let camera, scene, renderer, uniforms, scrollProgress;

init();
animate();

function init() {
  const container = document.getElementById("webGLID");

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneGeometry(2, 2);

  uniforms = {
    iAnimTimer: { value: 0.0 },
    iClick: { value: 1.0 },
    iTime: { value: 1.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() },
    iMousePos: { type: "v2", value: new THREE.Vector2() },
    iAnimProgress_1: { type: "v3", value: new THREE.Vector3() },
    iAnimProgress_2: { type: "v3", value: new THREE.Vector3() },
  };

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  uniforms.iResolution.value.x = window.innerWidth * window.devicePixelRatio;
  uniforms.iResolution.value.y = window.innerHeight * window.devicePixelRatio;

  renderer.setSize(window.innerWidth, window.innerHeight);
}
// Update mouse position uniform
function handleMouseMove(event) {
  uniforms.iMousePos.value.x = event.clientX;
  uniforms.iMousePos.value.y = window.innerHeight - event.clientY;
}

function animate() {
  requestAnimationFrame(animate);

  // Update time
  uniforms["iTime"].value = performance.now() / 1000;

  // Update resolution if needed
  uniforms.iResolution.value.x = window.innerWidth * window.devicePixelRatio;
  uniforms.iResolution.value.y = window.innerHeight * window.devicePixelRatio;

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);
}

//---LIST COUNTER---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let counter = 0;
let counterInterval = null;

// Start counting function
function startCounter(targetValue, speed = 2) {
  clearInterval(counterInterval); // Clear existing interval
  counterInterval = setInterval(() => {
    const step = speed;
    const direction = targetValue > counter ? 1 : -1;

    if (Math.abs(counter - targetValue) >= step) {
      counter += step * direction;

      // Update colors based on the counter value
      updateColors();

      uniforms.iAnimTimer.value = counter;
    } else {
      // Stop the interval when reaching the target value
      counter = targetValue;
      updateColors();
      uniforms.iAnimTimer.value = counter;
      clearInterval(counterInterval);
    }
  }, 50); // Adjust the interval duration as needed
}

// Reset and stop counting function
function resetCounter() {
  clearInterval(counterInterval); // Stop the counter interval
  counterInterval = null; // Set counterInterval to null
  counter = 0; // Reset the counter to 0

  // Reset colors to the initial state
  updateColors();
}

// Function to check conditions and start/stop counting
function animCounter() {
  // Check if iAnimProgress_1.x is more than 0.1 and iAnimProgress_1.y is less than 0.9
  if (
    uniforms.iAnimProgress_1.value.x > 0.1 &&
    uniforms.iAnimProgress_1.value.y < 0.9
  ) {
    // Start counting if not already counting
    if (!counterInterval) {
      startCounter(400); // Set the initial target value
    }
  } else {
    // Reset and stop counting if conditions are not met
    resetCounter();
  }
}
const listItem0 = document.getElementById("listItem0");
const listItem1 = document.getElementById("listItem1");
const listItem2 = document.getElementById("listItem2");
const listItem3 = document.getElementById("listItem3");
const listItem4 = document.getElementById("listItem4");
const listItem5 = document.getElementById("listItem5");
const listItem6 = document.getElementById("listItem6");

listItem0.addEventListener("click", function () {
  counter=0.0;
  startCounter(400); // Set the initial target value
});
listItem1.addEventListener("click", function () {
  startCounter(100, 9); // Set the initial target value and speed
});
listItem2.addEventListener("click", function () {
  startCounter(150, 9); // Set the initial target value and speed
});
listItem3.addEventListener("click", function () {
  startCounter(200, 9); // Set the initial target value and speed
});
listItem4.addEventListener("click", function () {
  startCounter(250, 9); // Set the initial target value and speed
});
listItem5.addEventListener("click", function () {
  startCounter(300, 9); // Set the initial target value and speed
});
listItem6.addEventListener("click", function () {
  startCounter(350, 9); // Set the initial target value and speed
});

// Update colors based on the counter value
function updateColors() {
  if (counter > 50 && counter <= 100) {
    listItem1.classList.add("red");
  } else {
    listItem1.classList.remove("red");
  }

  if (counter > 100 && counter <= 150) {
    listItem2.classList.add("red");
  } else {
    listItem2.classList.remove("red");
  }

  if (counter > 150 && counter <= 200) {
    listItem3.classList.add("red");
  } else {
    listItem3.classList.remove("red");
  }
  if (counter > 200 && counter <= 250) {
    listItem4.classList.add("red");
  } else {
    listItem4.classList.remove("red");
  }

  if (counter > 250 && counter <= 300) {
    listItem5.classList.add("red");
  } else {
    listItem5.classList.remove("red");
  }
  if (counter > 300 && counter <= 350) {
    listItem6.classList.add("red");
  } else {
    listItem6.classList.remove("red");
  }
  if (counter >= 399 ) {
    counter=0; // Set the initial target value
  }

}

//---GSAP---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
gsap.to(uniforms.iAnimProgress_1.value, {
  x: 1,
  scrollTrigger: {
    trigger: "#home",
    start: "0%",
    end: "100%",
    scrub: true,
    onUpdate: animCounter,
  },
});

gsap.to(uniforms.iAnimProgress_1.value, {
  y: 1,
  scrollTrigger: {
    trigger: "#howItWorks1",
    start: "0%",
    end: "100%",
    scrub: true,
    onUpdate: animCounter,
  },
});

gsap.to(uniforms.iAnimProgress_1.value, {
  z: 1,
  scrollTrigger: {
    trigger: "#howItWorks2",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});

gsap.to(uniforms.iAnimProgress_2.value, {
  x: 1,
  scrollTrigger: {
    trigger: "#howItWorks3",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_2.value, {
  y: 1,
  scrollTrigger: {
    trigger: "#reachus",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});

// Intro animation timeline
const introTimeline = gsap.timeline();
introTimeline.from(uniforms.iAnimProgress_2.value, {
  z: 2,
  duration: 3.0,
});

//---SCROLLIFY---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// Initialize Scrollify with mandatory snap scrolling
$.scrollify({
  section: "section",
  scrollSpeed: 500,
  scrollbars: false,
  setHeights: false,
  snap: true,
  scrollSnapOffset: 0,
  easing: "easeOutSine",
});

// Dark/Light mode function
const toggleSwitch = document.getElementById("toggleSwitch");
const htmlElement = document.querySelector("html");
toggleSwitch.addEventListener("change", function () {
  htmlElement.style.filter = toggleSwitch.checked
    ? "invert(0%) hue-rotate(0deg)"
    : "invert(100%) hue-rotate(180deg)";
});
//---LOAD FUNCTIONS--
$(document).ready(function () {
  $.scrollify.move("#1");
  $("#reachus").css("pointer-events", "none");
  $("#progressbar").css("height", "0");
});





//---MY MAIN---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const sectionOne = document.getElementById("home").offsetTop;
const sectionTwo = document.getElementById("howItWorks1").offsetTop;
const sectionThree = document.getElementById("howItWorks2").offsetTop;
const sectionFour = document.getElementById("howItWorks3").offsetTop;
const sectionFive = document.getElementById("reachus").offsetTop;
const sectionOneWrap = document.getElementById("sectionOneContent");
const sectionTwoWrap = document.getElementById("sectionTwoContent");
const sectionThreeWrap = document.getElementById("sectionThreeContent");
const sectionFourWrap = document.getElementById("sectionFourContent");
const sectionFiveWrap = document.getElementById("sectionFiveContent");

const darkLightBtn = document.getElementById("darkLightBtn");
const homeBtn = document.getElementById("homeBtn");
const howItWorksBtn = document.getElementById("howItWorksBtn");
const leanMoreBtn = document.getElementById("leanMoreBtn");
homeBtn.addEventListener("click", function () {
  $.scrollify.move("#1");
});
leanMoreBtn.addEventListener("click", function () {
  $.scrollify.move("#5");
});
howItWorksBtn.addEventListener("click", function () {
  $.scrollify.move("#2");
});

const burgerHomeBtn = document.getElementById("burgerHomeBtn");
const burgerHowItWorksBtn = document.getElementById("burgerHowItWorksBtn");
const burgerLearnMore = document.getElementById("burgerLearnMore");
burgerHomeBtn.addEventListener("click", function () {
  $.scrollify.move("#1");
});
burgerHowItWorksBtn.addEventListener("click", function () {
  $.scrollify.move("#2");
});
burgerLearnMore.addEventListener("click", function () {
  $.scrollify.move("#5");
});

//---SCROLLFUNCTIONS---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
$(window).scroll(function () {
  //ONE  - section functions based on current section
  if (window.scrollY == sectionOne) {
    sectionOneWrap.style.opacity = 1;
    burgerHomeBtn.style.color = "#ff6464";
    howItWorksBtn.classList.remove("red");
    
    darkLightBtn.style.opacity = 1;
    $("#darkLightBtn").css("pointer-events", "auto");
  } else {
    sectionOneWrap.style.opacity = 0;
    burgerHomeBtn.style.color = "#fff";
    burgerHowItWorksBtn.style.color = "#fff";
    darkLightBtn.style.opacity = 0;
    $("#darkLightBtn").css("pointer-events", "none");
  }

  //TWO  - section functions based on current section
  if (window.scrollY == sectionTwo) {
    sectionTwoWrap.style.opacity = 1;
    howItWorksBtn.classList.add("red");
    burgerHowItWorksBtn.style.color = "#ff6464";
    $("#howItWorks1").css("pointer-events", "auto");
  } else {
    sectionTwoWrap.style.opacity = 0;
    $("#howItWorks1").css("pointer-events", "none");
  }
  //THREE  - section functions based on current section
  if (window.scrollY == sectionThree) {
    sectionThreeWrap.style.opacity = 1;
    $("#howItWorks2").css("pointer-events", "auto");
    
    howItWorksBtn.classList.add("red");
    burgerHowItWorksBtn.style.color = "#ff6464";
  } else {
    sectionThreeWrap.style.opacity = 0;
    $("#howItWorks2").css("pointer-events", "none");
  }
  //FOUR  - section functions based on current section
  if (window.scrollY == sectionFour) {
    sectionFourWrap.style.opacity = 1;
    $("#howItWorks3").css("pointer-events", "auto");

    howItWorksBtn.classList.add("red");
    burgerHowItWorksBtn.style.color = "#ff6464";
  } else {
    sectionFourWrap.style.opacity = 0;
    $("#howItWorks3").css("pointer-events", "none");

  }
  //FIVE  - section functions based on current section
  if (window.scrollY == sectionFive) {
    sectionFiveWrap.style.opacity = 1;
    $("#reachus").css("pointer-events", "auto");
    howItWorksBtn.classList.remove("red");
    burgerHowItWorksBtn.style.color = "#fff";
    leanMoreBtn.classList.add("red");

    burgerLearnMore.style.color = "#ff6464";
  } else {
    sectionFiveWrap.style.opacity = 0;
    $("#reachus").css("pointer-events", "none");
    leanMoreBtn.classList.remove("red");
    burgerLearnMore.style.color = "#fff";
  }

  //scrollbar style
  var scroll = $(window).scrollTop();
  var dh = $(document).height();
  var wh = $(window).height();
  var scrollPercent = (scroll / (dh - wh)) * wh;
  $("#progressbar").css("height", scrollPercent + "px");
});




//---ROLLDOWNTEXT---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const changingWords = [
  "CRYPTOS",
  "COMMODITIES",
  "AGREEMENTS",
  "FUTURES",
  "TRADING",
  "OPTIONS",
  "DERIVATIVES",
  "PERPETUALS",
  "BONDS",
  "STOCKS",
];

// Index to keep track of the current word
let currentIndex = 0;

// Function to update the changing word with an animation
function updateChangingWord() {
  const changingWordElement = document.getElementById("changingWord");
  const textContainerElement = document.getElementById("rollingTextContainer");

  textContainerElement.style.width = `${changingWordElement.offsetWidth}px`; // Set the width to the current word's width

  changingWordElement.classList.remove("fade-in");
  changingWordElement.classList.add("fade-out");

  setTimeout(() => {
    changingWordElement.textContent = changingWords[currentIndex];
    changingWordElement.classList.remove("fade-out");
    changingWordElement.classList.add("fade-in");

    // Update the container width after changing the word
    textContainerElement.style.width = `${changingWordElement.offsetWidth}px`;

    currentIndex = (currentIndex + 1) % changingWords.length;
  }, 500); // Adjust the duration as needed
}

// Initial call to start the animation
updateChangingWord();

// Set up a timer to change the word at intervals
setInterval(updateChangingWord, 3000); // Change the word every 3 seconds, adjust as needed
//---ROLLDOWNTEXT---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
