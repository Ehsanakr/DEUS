//////////////////////////////THREE.JS(core)
let camera, scene, renderer, uniforms, scrollProgress;

init();
animate();

function init() {
  const container = document.getElementById("webGLID");

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  scene = new THREE.Scene();

  const geometry = new THREE.PlaneGeometry(2, 2);

  uniforms = {
    iClick: { value: 1.0 },
    iTime: { value: 1.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() },
    iMousePos: { type: "v2", value: new THREE.Vector2() },
    iAnimProgress_0: { type: "v3", value: new THREE.Vector3() },
    iAnimProgress_1: { type: "v3", value: new THREE.Vector3() },
    iAnimProgress_2: { type: "v3", value: new THREE.Vector3() },
    iAnimProgress_3: { type: "v3", value: new THREE.Vector3() },
    iAnimProgress_4: { type: "v3", value: new THREE.Vector3() },
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

//

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

// Create a timeline for the intro animation
const introTimeline = gsap.timeline();

// Add an initial state for iAnimProgress_4.z
introTimeline.from(uniforms.iAnimProgress_4.value, {
  z: 2, // Set the initial value
  duration: 3.0, // Adjust the duration as needed
});
gsap.to(uniforms.iAnimProgress_0.value, {
  z: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.zero",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_1.value, {
  x: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.one",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_1.value, {
  y: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.two",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_1.value, {
  z: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.three",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_2.value, {
  x: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.four",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_2.value, {
  y: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.five",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_2.value, {
  z: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.six",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});

gsap.to(uniforms.iAnimProgress_3.value, {
  x: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.seven",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_3.value, {
  y: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.eight",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});
gsap.to(uniforms.iAnimProgress_3.value, {
  z: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.nine",
    start: "0%",
    end: "100%",
    scrub: true,
  },
});

//***********     Other functions     ***********//

// Initialize Scrollify with mandatory snap scrolling
$.scrollify({
  section: "section",
  scrollSpeed: 900,
  scrollbars: false,
  setHeights: false,
  snap: true,
  scrollSnapOffset: 0,
  easing: "easeInSine",
});

// scroll to the first section on refresh
$(document).ready(function () {
  $.scrollify.move("#1");
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const progress = document.querySelector(".progress");
  const container = document.querySelector(".container");
  const docHeight = document.body.scrollHeight - window.innerHeight;

  function setScrollPerc() {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    const perc = Math.ceil((top * 50) / docHeight);
    container.setAttribute("data-scroll", perc);
    progress.style.strokeDashoffset = 264 - (perc / 100) * 264;
  }

  window.addEventListener("scroll", setScrollPerc);
});

///////////////////////////////// Initialize scrollButton
const playToggle = document.querySelector(".control");
const section4 = document.querySelector(".sectionWrap.nine"); // replace with the actual ID of section 4

playToggle.addEventListener("click", function () {
  playToggle.classList.toggle("play");
  playToggle.classList.toggle("pause");

  if (playToggle.classList.contains("play")) {
    // Stop auto-scrolling, scroll to top, and restart auto-scrolling
    clearInterval(autoScrollInterval);
  } else {
    // Start auto-scrolling
    autoScroll();
  }
});

// Function to auto-scroll continuously
let autoScrollInterval;

function autoScroll() {
  autoScrollInterval = setInterval(() => {
    // Assuming $.scrollify.next() is a valid function for your use case
    $.scrollify.next();
  }, 2000); // Change the interval as needed (2000 milliseconds = 2 seconds)
}

// Dark/Light mode function
const toggleSwitch = document.getElementById("toggleSwitch");
const htmlElement = document.querySelector("html");
toggleSwitch.addEventListener("change", function () {
  htmlElement.style.filter = toggleSwitch.checked
    ? "invert(0%) hue-rotate(0deg)"
    : "invert(100%) hue-rotate(180deg)";
});
// Scrollify Scroll Down button function with debounce
$("#scrollDownID").on(
  "click",
  debounce(function () {
    if (
      window.scrollY == document.querySelector(".sectionWrap.nine").offsetTop
    ) {
      $.scrollify.move("#1");
    } else {
      $.scrollify.next();
    }
  }, 500) // Adjust the delay (in milliseconds) as needed
);
// Debounce function to delay execution of the click function
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
// Toggle the state of the menu trigger checkbox
var menuTrigger = $("#menu_trigger");
var menuLinks = $(".menu-links li a");
menuLinks.on("click", function () {
  menuTrigger.prop("checked", !menuTrigger.prop("checked"));
});

// Set up smooth scroll effect for anchor links
$('a[href^="#"]').on("click", function (event) {
  event.preventDefault();
  let targetId = $(this).attr("href");
  let target = $(targetId);

  if (target.length) {
    // Get the index of the target section based on its ID
    let index = $("section").index(target);

    // Scroll to the target section using Scrollify
    $.scrollify.move(index);
  }
});
// ******************** scroll functions ********************
const mainTitle = document.getElementById("mainTitle");
// Add click event listeners to the checkboxes
mainTitle.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#1");
});
const listTitle1 = document.getElementById("listTitle1");
// Add click event listeners to the checkboxes
listTitle1.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  const sectionTwo = document.querySelector(".sectionWrap.one").offsetTop;
  if (window.scrollY == sectionTwo) {
    $.scrollify.move("#1");
  } else {
    $.scrollify.move("#2");
  }
});

const listTitle2 = document.getElementById("listTitle2");
// Add click event listeners to the checkboxes
listTitle2.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  const sectionTwo = document.querySelector(".sectionWrap.eight").offsetTop;
  if (window.scrollY == sectionTwo) {
    $.scrollify.move("#1");
  } else {
    $.scrollify.move("#9");
  }
});
const listTitle3 = document.getElementById("listTitle3");
// Add click event listeners to the checkboxes
listTitle3.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  const sectionTwo = document.querySelector(".sectionWrap.nine").offsetTop;
  if (window.scrollY == sectionTwo) {
    $.scrollify.move("#1");
  } else {
    $.scrollify.move("#10");
  }
});
const listItem1 = document.getElementById("listItem1");
const listItem2 = document.getElementById("listItem2");
const listItem3 = document.getElementById("listItem3");
const listItem4 = document.getElementById("listItem4");
const listItem5 = document.getElementById("listItem5");
const listItem6 = document.getElementById("listItem6");

// Add click event listeners to the checkboxes
listItem1.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#3");
});
// Add click event listeners to the checkboxes
listItem2.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#4");
});
// Add click event listeners to the checkboxes
listItem3.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#5");
});
// Add click event listeners to the checkboxes
listItem4.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#6");
});
// Add click event listeners to the checkboxes
listItem5.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#7");
});
// Add click event listeners to the checkboxes
listItem6.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#8");
});
const checkBox1 = document.getElementById("toggle1");
const checkBox2 = document.getElementById("toggle2");
const checkBox3 = document.getElementById("toggle3");
// Add click event listeners to the checkboxes
checkBox1.addEventListener("click", function (event) {
  console.log("clicked");
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#3");
});
// Add click event listeners to the checkboxes
checkBox1.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#2");
});
// Add click event listeners to the checkboxes
checkBox2.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#9");
});
// Add click event listeners to the checkboxes
checkBox3.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default checkbox behavior
  $.scrollify.move("#10");
});
$(window).scroll(function () {
  // Get the scroll position
  const scrollPosition = $(window).scrollTop();

  //ZERO  - section functions based on current section
  const scrollColorElementZero = document.querySelector(".list-item0");
  const scrollColorElementOne = document.querySelector(".list-title1");

  const sectionZero = document.querySelector(".sectionWrap.zero").offsetTop;
  if (window.scrollY == sectionZero) {
    checkBox1.checked = true; // Collapse the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
    scrollColorElementOne.classList.remove("red");
  } else {
  }

  //ONE  - section functions based on current section
  const sectionOne = document.querySelector(".sectionWrap.one").offsetTop;
  if (window.scrollY == sectionOne) {
    scrollColorElementOne.classList.add("red");
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
  }
  //TWO  - section functions based on current section
  const scrollColorElementTwo = document.querySelector(".list-item1");
  const sectionTwo = document.querySelector(".sectionWrap.two").offsetTop;
  if (window.scrollY == sectionTwo) {
    scrollColorElementOne.classList.add("red");
    scrollColorElementTwo.classList.add("pink");
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
    scrollColorElementTwo.classList.remove("pink");
  }
  //THREE  - section functions based on current section
  const scrollColorElementThree = document.querySelector(".list-item2");
  const sectionThree = document.querySelector(".sectionWrap.three").offsetTop;
  if (window.scrollY == sectionThree) {
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox

    scrollColorElementOne.classList.add("red");
    scrollColorElementThree.classList.add("pink");
  } else {
    scrollColorElementThree.classList.remove("pink");
  }
  //FOUR  - section functions based on current section
  const scrollColorElementFour = document.querySelector(".list-item3");
  const sectionFour = document.querySelector(".sectionWrap.four").offsetTop;
  if (window.scrollY == sectionFour) {
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox

    scrollColorElementOne.classList.add("red");
    scrollColorElementFour.classList.add("pink");
  } else {
    scrollColorElementFour.classList.remove("pink");
  }
  //FIVE  - section functions based on current section
  const scrollColorElementFive = document.querySelector(".list-item4");
  const sectionFive = document.querySelector(".sectionWrap.five").offsetTop;
  if (window.scrollY == sectionFive) {
    scrollColorElementOne.classList.add("red");
    scrollColorElementFive.classList.add("pink");
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
    scrollColorElementFive.classList.remove("pink");
  }
  //SIX  - section functions based on current section
  const scrollColorElementSix = document.querySelector(".list-item5");
  const sectionSix = document.querySelector(".sectionWrap.six").offsetTop;
  if (window.scrollY == sectionSix) {
    scrollColorElementOne.classList.add("red");
    scrollColorElementSix.classList.add("pink");
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
    scrollColorElementSix.classList.remove("pink");
  }
  //SEVEN  - section functions based on current section
  const scrollColorElementSeven = document.querySelector(".list-item6");
  const sectionSeven = document.querySelector(".sectionWrap.seven").offsetTop;
  if (window.scrollY == sectionSeven) {
    scrollColorElementOne.classList.add("red");
    scrollColorElementSeven.classList.add("pink");
    checkBox1.checked = false; // Expand the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
    scrollColorElementSeven.classList.remove("pink");
  }
  //EIGHT  - section functions based on current section
  const scrollColorElementEight = document.querySelector(".list-title2");
  const sectionEight = document.querySelector(".sectionWrap.eight").offsetTop;
  if (window.scrollY == sectionEight) {
    scrollColorElementOne.classList.remove("red");
    scrollColorElementEight.classList.add("red");
    checkBox1.checked = true; // Collapse the checkbox
    checkBox2.checked = false; // Expand the checkbox
    checkBox3.checked = true; // Collapse the checkbox
  } else {
    scrollColorElementEight.classList.remove("red");
  }
  //scroll down icon selector
  const scrollDownElement = document.querySelector(".scrollDown-wrapper");
  //NINE  - section functions based on current section
  const scrollColorElementNine = document.querySelector(".list-title3");
  const sectionNine = document.querySelector(".sectionWrap.nine").offsetTop;
  if (window.scrollY == sectionNine) {
    scrollColorElementOne.classList.remove("red");
    scrollColorElementNine.classList.add("red");
    scrollDownElement.style.transform = `scaleY(-1)`;
    checkBox1.checked = true; // Collapse the checkbox
    checkBox2.checked = true; // Collapse the checkbox
    checkBox3.checked = false; // Expand the checkbox
    playToggle.classList.remove("pause");
    playToggle.classList.add("play");
    clearInterval(autoScrollInterval);
    playToggle.addEventListener("click", function () {
  if (window.scrollY == sectionNine) {
        $.scrollify.move("#1");
  }
    });
  } else {
    scrollColorElementNine.classList.remove("red");
    scrollDownElement.style.transform = `scaleY(1)`;
  }

  //scrollbar style
  var scroll = $(window).scrollTop();
  var dh = $(document).height();
  var wh = $(window).height();
  var scrollPercent = (scroll / (dh - wh)) * wh;
  $("#progressbar").css("height", scrollPercent + "px");

  //caption text visibility
  const toggleSwitch = document.querySelector(".minimal-switch");

  var scrollThreshold = window.innerHeight * 0.2;
  if (scrollPosition >= scrollThreshold) {
    toggleSwitch.style.opacity = 0.0;
  } else {
    toggleSwitch.style.opacity = 1.0;
  }

  // Highlight current section in menu on scroll
  $("section").each(function () {
    var sectionTop = $(this).offset().top;
    var sectionHeight = $(this).outerHeight();
    var sectionId = $(this).attr("id");

    // Check if the middle of the section is in the viewport
    if (
      scrollPosition + window.innerHeight / 2 >= sectionTop &&
      scrollPosition + window.innerHeight / 2 < sectionTop + sectionHeight
    ) {
      $(".menu__item").removeClass("menu__item--current");
      $(".menu__link[href='#" + sectionId + "']")
        .parent()
        .addClass("menu__item--current");
    }
  });
});
