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
//---THREE.JS---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//---GSAP---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let counter = 0;
let counterInterval = null;

<<<<<<< HEAD
// Add an initial state for iAnimProgress_4.z
introTimeline.from(uniforms.iAnimProgress_2.value, {
  z: 2, // Set the initial value
  duration: 3.0, // Adjust the duration as needed
});
=======
// Start counting function
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13

// Start counting function
function startCounter() {
  counterInterval = setInterval(() => {
    if (counter <= 400) {
      counter += 1;

      // Update colors based on the counter value
      updateColors();

      uniforms.iAnimTimer.value = counter;
    } else {
      // Reset the counter to 0 when it reaches 500
      counter = 0;

      uniforms.iAnimTimer.value = counter;
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
// Check conditions using ScrollTrigger
gsap.to(uniforms.iAnimProgress_1.value, {
  x: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.one",
    start: "0%",
    end: "100%",
    scrub: true,
    onUpdate: animCounter,
  },
});

gsap.to(uniforms.iAnimProgress_1.value, {
  y: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.two",
    start: "0%",
    end: "100%",
    scrub: true,
    onUpdate: animCounter,
  },
});

// Function to check conditions and start/stop counting
// Function to check conditions and start/stop counting
function animCounter() {
  // Check if iAnimProgress_1.x is more than 0.1 and iAnimProgress_1.y is less than 0.9
  if (
    uniforms.iAnimProgress_1.value.x > 0.1 &&
    uniforms.iAnimProgress_1.value.y < 0.9
  ) {
    // Start counting if not already counting
    if (!counterInterval) {
      startCounter();
    }
  } else {
    // Reset and stop counting if conditions are not met
    resetCounter();
  }
}
// Function to update colors based on the counter value
function updateColors() {
  const colorList = document.getElementById("colorList");
  const items = colorList.getElementsByTagName("li");

  // Reset all items to blue
  for (let i = 0; i < items.length; i++) {
    items[i].className = "blue";
  }

  // Update colors based on the counter value
  if (counter >= 50 && counter < 100) {
    items[0].className = "red";
  } else if (counter >= 100 && counter < 150) {
    items[1].className = "red";
  } else if (counter >= 150 && counter < 200) {
    items[2].className = "red";
  } else if (counter >= 200 && counter < 250) {
    items[3].className = "red";
  } else if (counter >= 250 && counter < 300) {
    items[4].className = "red";
  } else if (counter >= 300 && counter <= 350) {
    items[5].className = "red";
  }
}

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
<<<<<<< HEAD

//***********     Other functions     ***********//
=======
gsap.to(uniforms.iAnimProgress_2.value, {
  y: 1,
  scrollTrigger: {
    trigger: ".sectionWrap.five",
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
//---GSAP---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//---SCROLLIFY---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13

// Initialize Scrollify with mandatory snap scrolling
$.scrollify({
  section: "section",
<<<<<<< HEAD
  scrollSpeed: 300,
=======
  scrollSpeed: 2000,
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13
  scrollbars: false,
  setHeights: false,
  snap: true,
  scrollSnapOffset: 0,
  easing: "easeOutSine",
});

<<<<<<< HEAD

/* accordion */
function triggerAccordion() {
  $(".js-accordion__trigger").on("click", (e) => {
    let target = $(e.currentTarget);
    let expanded = target.attr("aria-expanded") === "true" || false;
    let targetContent = target
      .closest(".js-accordion")
      .find(".js-accordion__content");

    /* collapse all accordion contents */
    $(".js-accordion__trigger").attr("aria-expanded", "false");
    $(".js-accordion__content").attr("aria-hidden", "true").slideUp(700);

    /* toggle the target accordion block */
    target.attr("aria-expanded", !expanded);
    targetContent.attr("aria-hidden", expanded);

    let targetContentShown =
      targetContent.attr("aria-hidden") === "true" || false;

    targetContentShown
      ? targetContent.slideUp(700)
      : targetContent.slideDown(700);
  });
}

/* init accordion logic if it exists on the page */
$(".js-accordion") ? triggerAccordion() : false;

$(document).ready(function () {
  $(".toggle-accordion").on("click", function () {
    var accordionId = $(this).attr("accordion-id"),
      numPanelOpen = $(accordionId + " .collapse.in").length;

    $(this).toggleClass("active");

    if (numPanelOpen == 0) {
      openAllPanels(accordionId);
    } else {
      closeAllPanels(accordionId);
    }
  });

  openAllPanels = function (aId) {
    console.log("setAllPanelOpen");
    $(aId + ' .panel-collapse:not(".in")').collapse("show");
  };
  closeAllPanels = function (aId) {
    console.log("setAllPanelclose");
    $(aId + " .panel-collapse.in").collapse("hide");
  };
});
=======
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13
// scroll to the first section on refresh
$(document).ready(function () {
  $.scrollify.move("#1");
});

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
<<<<<<< HEAD
      window.scrollY == document.querySelector(".sectionWrap.four").offsetTop
=======
      window.scrollY == document.querySelector(".sectionWrap.five").offsetTop
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13
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
//---SCROLLIFY---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

//---SCROLLFUNCTIONS---↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
$("#reachus").addClass("disabled");
$(window).scroll(function () {
  //scroll down icon invertion
  const scrollDownElement = document.querySelector(".scrollDown-wrapper");
<<<<<<< HEAD
  const lastSection = document.querySelector(".sectionWrap.four").offsetTop;
  if (window.scrollY == lastSection) {
=======
  const sectionFive = document.querySelector(".sectionWrap.five").offsetTop;
  if (window.scrollY == sectionFive) {
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13
    scrollDownElement.style.transform = `scaleY(-1)`;
    $("#reachus").removeClass("disabled");
  } else {
    scrollDownElement.style.transform = `scaleY(1)`;
    $("#reachus").addClass("disabled");
  }

  //scrollbar style
  var scroll = $(window).scrollTop();
  var dh = $(document).height();
  var wh = $(window).height();
  var scrollPercent = (scroll / (dh - wh)) * wh;
  $("#progressbar").css("height", scrollPercent + "px");

  //caption text visibility
  const sections = document.querySelectorAll(".sectionWrap");
  const texts = document.querySelectorAll(".box__text");

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const isVisible =
      rect.top <= window.innerHeight / 2 &&
      rect.bottom >= window.innerHeight / 2;
    if (isVisible) {
      const opacity =
        1 - Math.max(0, Math.min(1, Math.abs(rect.top) / window.innerHeight));
      texts[index].style.opacity = opacity;
    } else {
      texts[index].style.opacity = 0;
    }
  });

  const scrollPosition = $(this).scrollTop();
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
//---SCROLLFUNCTIONS---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

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
<<<<<<< HEAD

//***********     text gsap     ***********//

// Set up content scroll triggers
gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    list_top: "",
    title: "",
    subtitle:
      "Bilateral OTC Derivatives with Intent-Based execution.<br/>Leverage trade any asset permissionlessly with hyper-efficient liquidity.",
    titleSYMM: "SYMMIO",
    list_top: "",
    selector: ".sectionWrap.one",
  },
  {
    titleSYMM: "",
    list_top: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>Neutral Parties as Arbiters</span> " +
      "</br></br>" +
      " <span class=active-span>Arbiters are advanced liquidators ensuring all parties adhere to the rules and maintain solvency. </span></br></br>" +
      " <span class=active-span>Both sides can be liquidated and their actions disputed, creating a trustless and highly capital efficient system.</span></br>",
    selector: ".sectionWrap.two",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>PartyA and PartyB are SYMMETRICAL</span> " +
      "</br></br>" +
      " <span class=active-span>One side LONGs 1 BTC.</span></br>" +
      " <span class=active-span>The other side SHORTs 1 BTC.</span></br>" +
      " <span class=active-span>The loss of one side is the win of the other.</span></br>",
    selector: ".sectionWrap.three",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top: "",
    selector: ".sectionWrap.four",
  },
];

content.forEach((item, i, arr) => {
  const onUpdate = function () {
    const time = this.time();
    const duration = this.duration();

    if (time >= duration || time <= 0) {
      return;
    }
  };
  // Create a timeline for the intro animation
  const introTimeline = gsap.timeline();

  // Add fade-in animation for the titles, subtitles, and other elements
  introTimeline.from(
    `${item.selector} .box__text`,
    { opacity: 0, duration: 5 },
    0
  );

  const timeline = new gsap.timeline({
    scrollTrigger: {
      trigger: item.selector,
      scrub: true,
      start: "top 75%",
      end: `bottom ${i < arr.length - 1 ? "75%" : "bottom"}`,
    },
  })
    .to(
      `${item.selector} .title`,
      { text: `${item.title}`, ease: "linear", duration: 0.2, onUpdate },
      0
    )
    .to(
      `${item.selector} .titleSYMM`,
      { text: `${item.titleSYMM}`, ease: "linear", duration: 0.2, onUpdate },
      0
    )
    .to(
      `${item.selector} .subtitle`,
      { text: `${item.subtitle}`, ease: "linear", duration: 0.2, onUpdate },
      0
    )
    .to(
      `${item.selector} .list_top`,
      { text: `${item.list_top}`, ease: "linear", duration: 0, onUpdate },
      0
    );

  if (i < arr.length - 1) {
    timeline.yoyo(true).repeat(1).repeatDelay(0.5);
  }
});
=======
//---ROLLDOWNTEXT---↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
>>>>>>> 0942ce9707f3f85e7c044b7c6899b549612c9a13
