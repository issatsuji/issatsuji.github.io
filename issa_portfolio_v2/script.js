/* =========================================================
   ISSA TSUJI PORTFOLIO
   Add new works here. The HTML layout does not need to change.
========================================================= */

const portfolioData = {
  filmed: {
    indieFilms: [
      {
        title: "空蝉",
        type: "Short Film",
        year: "2026",
        image: "'/Users/issa/Documents/自主制作/空蝉(soon)/IMG_0028.JPG'",
        link: null
      },
      {
        title: "今日の友は、明日の敵。",
        type: "Short Film",
        year: "2026",
        image: "images/filmed/film-02.jpg",
        link: null
      },
      {
        title: "Film Project 03",
        type: "Short Film",
        year: "2026",
        image: "images/filmed/film-03.jpg",
        link: null
      }
    ],

    musicVideos: [
      {
        title: "pretty girl has problems/isa",
        type: "Music Video",
        year: "2026",
        image: "'/Users/issa/Documents/自主制作/isa movie_data(edit)/hqdefault.avif'",
        link: "https://youtu.be/Uc3BdeECWoQ?si=KhxRzBAifdvDP-SL"
      },
      {
        title: "かなオリ",
        type: "Music Video",
        year: "2026",
        image: "'/Users/issa/Documents/自主制作/kanato(done)/hq720.avif'",
        link: "https://youtu.be/ngUHxcpQbZs?si=BBxCxCq0zR2zDbsF"
      },
      {
        title: "Music Video 03",
        type: "Music Video",
        year: "2026",
        image: "images/music-video/mv-03.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      }
    ],

    documentary: [
      {
        title: "Documentary 01",
        type: "Documentary",
        year: "2026",
        image: "images/filmed/documentary-01.jpg",
        link: null
      },
      {
        title: "Documentary 02",
        type: "Documentary",
        year: "2026",
        image: "images/filmed/documentary-02.jpg",
        link: null
      }
    ]
  },

  edit: {
    edits: [
      {
        title: "編集作品集",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      },
      {
        title: "Documentary Edit",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-02.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      },
      {
        title: "Edit Project 03",
        type: "Edit",
        year: "2026",
        image: "images/edit/edit-03.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      }
    ],

    otherEdits: [
      {
        title: "Motion / Graphic 01",
        type: "Motion",
        year: "2026",
        image: "images/edit/motion-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      },
      {
        title: "Color / Finishing 01",
        type: "Finishing",
        year: "2026",
        image: "images/edit/finishing-01.jpg",
        link: "https://www.youtube.com/watch?v=REPLACE_ME"
      }
    ]
  },

  photos: [
    {
      image: "images/photos/photo-01.jpg",
      alt: "Visual 01"
    },
    {
      image: "images/photos/photo-02.jpg",
      alt: "Visual 02"
    },
    {
      image: "images/photos/photo-03.jpg",
      alt: "Visual 03"
    },
    {
      image: "images/photos/photo-04.jpg",
      alt: "Visual 04"
    }
  ],

  contact: {
    email: "YOUR-EMAIL@gmail.com",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/" },
      { label: "YouTube", url: "https://www.youtube.com/" },
      { label: "X", url: "https://x.com/" },
      { label: "Vimeo", url: "https://vimeo.com/" }
    ]
  }
};

function createProjectCard(project, options = {}) {
  const isLink = Boolean(project.link);
  const tag = isLink ? "a" : "article";
  const card = document.createElement(tag);

  card.className = `project-card ${isLink ? "is-link" : ""}`;
  if (isLink) {
    card.href = project.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.classList.add("project-card-link");
  }

  const thumbClass = options.poster ? "poster" : "landscape";
  const overlay = isLink
    ? `
      <div class="thumb-overlay" aria-hidden="true">
        <div class="play-button">▶</div>
      </div>
    `
    : "";

  card.innerHTML = `
    <div class="thumb-wrap ${thumbClass}">
      <img src="${project.image}" alt="${escapeHtml(project.title)}" loading="lazy" onerror="this.style.display='none';">
      ${overlay}
    </div>
    <div class="project-meta">
      <div class="project-title">${escapeHtml(project.title)}</div>
      <div class="project-subtitle">${escapeHtml(project.type)}<br>${escapeHtml(project.year)}</div>
    </div>
  `;

  return card;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCarousel(selector, items, options = {}) {
  const track = document.querySelector(`[data-carousel="${selector}"]`);
  if (!track) return;

  track.innerHTML = "";

  items.forEach(item => {
    track.appendChild(createProjectCard(item, options));
  });

  const wrapper = track.closest(".carousel-wrap");
  if (!wrapper) return;

  const prev = wrapper.querySelector(".carousel-button.prev");
  const next = wrapper.querySelector(".carousel-button.next");

  const getStep = () => {
    const firstCard = track.querySelector(".project-card");
    if (!firstCard) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || 0);
    return firstCard.getBoundingClientRect().width + gap;
  };

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -getStep() * 2, behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    track.scrollBy({ left: getStep() * 2, behavior: "smooth" });
  });
}

function renderPhotos() {
  const grid = document.getElementById("photo-grid");
  if (!grid) return;

  grid.innerHTML = "";

  portfolioData.photos.forEach((photo, index) => {
    const item = document.createElement("figure");
    item.className = `photo-item reveal`;
    item.innerHTML = `
      <img src="${photo.image}" alt="${escapeHtml(photo.alt)}" loading="lazy" onerror="this.style.display='none';">
    `;
    grid.appendChild(item);
  });
}

function renderSocials() {
  const container = document.getElementById("social-links");
  const emailLink = document.getElementById("contact-email-link");
  if (!container || !emailLink) return;

  const email = portfolioData.contact.email;
  emailLink.textContent = email;
  emailLink.href = `mailto:${email}`;

  container.innerHTML = "";

  portfolioData.contact.socials.forEach(social => {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = social.label;
    container.appendChild(link);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

function setupCarouselWheel() {
  document.querySelectorAll(".card-track").forEach(track => {
    track.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (track.scrollWidth <= track.clientWidth) return;

      event.preventDefault();
      track.scrollLeft += event.deltaY;
    }, { passive: false });
  });
}

function setupDragScroll() {
  document.querySelectorAll(".card-track").forEach(track => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener("pointerdown", event => {
      isDown = true;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
      track.classList.add("dragging");
    });

    track.addEventListener("pointermove", event => {
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

document.addEventListener("DOMContentLoaded", () => {
  renderCarousel("indie-films", portfolioData.filmed.indieFilms, { poster: true });
  renderCarousel("music-videos", portfolioData.filmed.musicVideos);
  renderCarousel("documentary", portfolioData.filmed.documentary);
  renderCarousel("edits", portfolioData.edit.edits);
  renderCarousel("other-edits", portfolioData.edit.otherEdits);

  renderPhotos();
  renderSocials();
  setupReveal();
  setupCarouselWheel();
  setupDragScroll();
});
