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



//***********     Other functions     ***********//

// Initialize Scrollify with mandatory snap scrolling
$.scrollify({
  section: "section",
  scrollSpeed: 300,
  scrollbars: false,
  setHeights: false,
  snap: true,
  scrollSnapOffset: 0,
  easing: "easeOutSine",
});


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
      window.scrollY == document.querySelector(".sectionWrap.seven").offsetTop
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

$(window).scroll(function () {
  //scroll down icon invertion
  const scrollDownElement = document.querySelector(".scrollDown-wrapper");
  const sectionEleven = document.querySelector(".sectionWrap.seven").offsetTop;
  if (window.scrollY == sectionEleven) {
    scrollDownElement.style.transform = `scaleY(-1)`;
  } else {
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
  const scrollPosition = $(this).scrollTop();
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

//***********     text gsap     ***********//

// Set up content scroll triggers
gsap.registerPlugin(ScrollTrigger);

const content = [
  
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.one",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span class=active-span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.two",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span class=active-span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.three",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span class=active-span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.four",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span class=active-span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.five",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span class=active-span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.six",
  },
  {
    titleSYMM: "",
    title: "",
    subtitle: "",
    list_top:
      "<span class= head-span>HOW TO TRADE DERIVATIVES<br>with INTENTs using SYMMIO.</span> " +
      "</br></br>" +
      " <span>• FORMULATE your INTENT via 3rd party frontend</span></br>" +
      " <span>• SEND your INTENT to the pool</span></br>" +
      " <span>• Counterparties (Hedgers) SEE your INTENT in the pool</span></br>" +
      " <span>• Counterparty (Hedger) CLAIMs your intent</span></br>" +
      " <span>• Claimed INTENTs CREATE a trade</span></br>" +
      " <span class=active-span>• Both parties LOCK collateral</span>",

    selector: ".sectionWrap.seven",
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
