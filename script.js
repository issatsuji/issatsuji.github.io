/* =========================================================
   ISSA TSUJI PORTFOLIO — DATA + INTERACTION

   Add or edit work inside portfolioData.
   Images can be JPG / PNG / WEBP / AVIF.
   A null link means the card is NOT clickable.
========================================================= */

const portfolioData = {
  filmed: {
    indieFilms: [
      {
        title: "空蝉",
        type: "Short Film",
        year: "2026",
        image: "images/filmed/IMG_0028.JPG",
        link: null,
      },
      {
        title: "今日の友は、明日の敵。",
        type: "Short Film",
        year: "2026",
        image: "images/filmed/film-02.jpg",
        link: null,
      },
      {
        title: "Film Project 03",
        type: "Short Film",
        year: "2026",
        image: "images/filmed/film-03.jpg",
        link: null,
      },
    ],

    musicVideos: [
      {
        title: "pretty girll has problems/isa",
        type: "Music Video",
        year: "2026",
        image: "images/music-video/hqdefault.avif",
        link: "https://youtu.be/Uc3BdeECWoQ?si=OoFTwtVbjjdF9oE3",
      },
      {
        title: "かなオリ",
        type: "Music Video",
        year: "2026",
        image: "images/music-video/hq720.avif",
        link: "https://youtu.be/ngUHxcpQbZs?si=Ult0odd6VN4g-sPH",
      },
      {
        title: "Music Video 03",
        type: "Music Video",
        year: "2026",
        image: "images/music-video/mv-03.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
    ],

    documentary: [
      {
        title: "Documentary 01",
        type: "Documentary",
        year: "2026",
        image: "images/filmed/documentary-01.jpg",
        link: null,
      },
      {
        title: "Documentary 02",
        type: "Documentary",
        year: "2026",
        image: "images/filmed/documentary-02.jpg",
        link: null,
      },
    ],
  },

  edit: {
    edits: [
      {
        title: "編集作品集",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
      {
        title: "Documentary Edit",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-02.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
      {
        title: "Edit Project 03",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-03.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
    ],

    otherEdits: [
      {
        title: "Motion / Graphic 01",
        type: "Motion",
        year: "2026",
        image: "images/edit/motion-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
      {
        title: "Color / Finishing 01",
        type: "Finishing",
        year: "2026",
        image: "images/edit/finishing-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_WITH_YOUR_VIDEO_ID",
      },
    ],
  },

  photos: [
    { image: "images/photos/photo-01.jpg", alt: "Visual 01" },
    { image: "images/photos/photo-02.jpg", alt: "Visual 02" },
    { image: "images/photos/photo-03.jpg", alt: "Visual 03" },
    { image: "images/photos/photo-04.jpg", alt: "Visual 04" },
  ],

  contact: {
    email: "YOUR-EMAIL@gmail.com",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/" },
      { label: "YouTube", url: "https://www.youtube.com/" },
      { label: "X", url: "https://x.com/" },
      { label: "Vimeo", url: "https://vimeo.com/" },
    ],
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isUsableLink(link) {
  if (typeof link !== "string" || !link.trim()) return false;
  if (link.includes("REPLACE_WITH_YOUR_VIDEO_ID")) return false;

  try {
    const url = new URL(link);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function createProjectCard(project, options = {}) {
  const isLink = isUsableLink(project.link);
  const card = document.createElement(isLink ? "a" : "article");

  card.className = `project-card ${isLink ? "is-link project-card-link" : ""}`;

  if (isLink) {
    card.href = project.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${project.title} — open project`);
  }

  const ratioClass = options.poster ? "poster" : "landscape";
  const overlay = isLink
    ? `
      <div class="thumb-overlay" aria-hidden="true">
        <div class="play-button">▶</div>
      </div>
    `
    : "";

  card.innerHTML = `
    <div class="thumb-wrap ${ratioClass}">
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy">
      ${overlay}
    </div>
    <div class="project-meta">
      <div class="project-title">${escapeHtml(project.title)}</div>
      <div class="project-subtitle">${escapeHtml(project.type)}<br>${escapeHtml(project.year)}</div>
    </div>
  `;

  const image = card.querySelector("img");
  const thumb = card.querySelector(".thumb-wrap");
  image.addEventListener("error", () => {
    image.remove();
    thumb.classList.add("no-image");
  });

  return card;
}

function renderCarousel(selector, items, options = {}) {
  const track = document.querySelector(`[data-carousel="${selector}"]`);
  if (!track) return;

  track.innerHTML = "";
  items.forEach((item) => track.appendChild(createProjectCard(item, options)));

  const wrapper = track.closest(".carousel-wrap");
  if (!wrapper) return;

  const prev = wrapper.querySelector(".carousel-button.prev");
  const next = wrapper.querySelector(".carousel-button.next");

  const getStep = () => {
    const firstCard = track.querySelector(".project-card");
    if (!firstCard) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");
    return firstCard.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => track.scrollBy({ left: -getStep() * 2, behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: getStep() * 2, behavior: "smooth" }));
}

function renderPhotos() {
  const grid = document.getElementById("photo-grid");
  const slides = document.getElementById("photo-slides");
  if (!grid || !slides) return;

  grid.innerHTML = "";
  slides.innerHTML = "";

  portfolioData.photos.forEach((photo, index) => {
    const item = document.createElement("figure");
    item.className = "photo-item reveal-loop";
    item.innerHTML = `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt)}" loading="lazy">`;
    const image = item.querySelector("img");
    image.addEventListener("error", () => {
      image.remove();
      item.textContent = "PHOTO / ADD LATER";
      item.style.minHeight = "180px";
      item.style.display = "grid";
      item.style.placeItems = "center";
      item.style.color = "#aaa59d";
      item.style.fontSize = "8px";
      item.style.letterSpacing = ".18em";
    });
    grid.appendChild(item);

    const slide = document.createElement("div");
    slide.className = `photo-slide ${index === 0 ? "is-active" : ""}`;
    slide.innerHTML = `<img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt)}" aria-hidden="true">`;
    const slideImage = slide.querySelector("img");
    slideImage.addEventListener("error", () => {
      slideImage.remove();
      slide.classList.add("no-image");
      slide.textContent = "VISUAL ARCHIVE";
    });
    slides.appendChild(slide);
  });
}

function startPhotoSlideshow() {
  const slides = [...document.querySelectorAll(".photo-slide")];
  const counter = document.getElementById("photo-stage-index");
  if (slides.length < 2) return;

  let current = 0;

  window.setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
    if (counter) counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  }, 4800);
}

function renderSocials() {
  const container = document.getElementById("social-links");
  const emailLink = document.getElementById("contact-email-link");
  if (!container || !emailLink) return;

  emailLink.textContent = portfolioData.contact.email;
  emailLink.href = `mailto:${portfolioData.contact.email}`;

  container.innerHTML = "";
  portfolioData.contact.socials.forEach((social) => {
    if (!isUsableLink(social.url)) return;
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = social.label;
    container.appendChild(link);
  });
}

function setupLoopingReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, { threshold: 0.13 });

  document.querySelectorAll(".reveal-loop").forEach((element) => observer.observe(element));
}

function setupHeroState() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => hero.classList.toggle("is-active", entry.isIntersecting));
  }, { threshold: 0.38 });

  observer.observe(hero);
}

function setupCarouselWheel() {
  document.querySelectorAll(".card-track").forEach((track) => {
    track.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (track.scrollWidth <= track.clientWidth) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }, { passive: false });
  });
}

function setupDragScroll() {
  document.querySelectorAll(".card-track").forEach((track) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      isDown = true;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
      track.classList.add("dragging");
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      track.scrollLeft = startScroll - (event.clientX - startX);
    });

    const stop = () => {
      isDown = false;
      track.classList.remove("dragging");
    };

    track.addEventListener("pointerup", stop);
    track.addEventListener("pointercancel", stop);
    track.addEventListener("pointerleave", stop);
  });
}

function setupScrollShapes() {
  const elements = [...document.querySelectorAll(".shape-parallax")];
  if (!elements.length) return;

  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    elements.forEach((element) => {
      const speed = Number(element.dataset.speed || 0.2);
      const section = element.closest("[data-motion-section]");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const sectionCenter = rect.top + rect.height * 0.5;
      const distance = (sectionCenter - viewportCenter) * speed;
      const rotation = distance * 0.035;

      element.style.transform = `translate3d(0, ${distance}px, 0) rotate(${rotation}deg)`;
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
}

function setupNameMouseDrift() {
  const name = document.querySelector(".hero-name");
  if (!name) return;

  name.addEventListener("pointermove", (event) => {
    const rect = name.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    name.style.transform = `translate3d(${x * 10}px, ${y * 7}px, 0)`;
  });

  name.addEventListener("pointerleave", () => {
    name.style.transform = "translate3d(0,0,0)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCarousel("indie-films", portfolioData.filmed.indieFilms, { poster: true });
  renderCarousel("music-videos", portfolioData.filmed.musicVideos);
  renderCarousel("documentary", portfolioData.filmed.documentary);
  renderCarousel("edits", portfolioData.edit.edits);
  renderCarousel("other-edits", portfolioData.edit.otherEdits);

  renderPhotos();
  renderSocials();
  setupLoopingReveal();
  setupHeroState();
  setupCarouselWheel();
  setupDragScroll();
  setupScrollShapes();
  setupNameMouseDrift();
  startPhotoSlideshow();
});
