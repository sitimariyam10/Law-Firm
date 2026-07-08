// ==========================================================
// DATA — proyek portofolio
// ==========================================================
const PROJECTS = [
  {
    title: "Kopi Kultura",
    year: "2024",
    category: "identitas",
    tag: "Identitas Merek",
    desc: "Sistem identitas untuk jaringan kedai kopi berbasis komunitas petani lokal, dari logo hingga kemasan.",
    from: "#C99B3F",
    to: "#8a6a22"
  },
  {
    title: "Nusantara Pay",
    year: "2023",
    category: "produk",
    tag: "Desain Sistem UI",
    desc: "Sistem desain untuk aplikasi pembayaran digital yang dipakai lebih dari 3 juta pengguna aktif.",
    from: "#2F6F5E",
    to: "#173a30"
  },
  {
    title: "Arsip Tenun",
    year: "2023",
    category: "cetak",
    tag: "Cetak & Editorial",
    desc: "Buku fotografi dan katalog untuk pameran arsip tenun Nusantara di empat kota besar.",
    from: "#8a6a22",
    to: "#3f3110"
  },
  {
    title: "Ruang Ide",
    year: "2022",
    category: "produk",
    tag: "Desain Produk",
    desc: "Platform kolaborasi untuk studio kreatif kecil — riset, wireframe, hingga sistem komponen.",
    from: "#4A4A47",
    to: "#1f1f1d"
  },
  {
    title: "Sawah Studio",
    year: "2022",
    category: "identitas",
    tag: "Identitas Merek",
    desc: "Rebranding penuh untuk studio arsitektur lansekap berkelanjutan, terinspirasi pola sawah berundak.",
    from: "#1E4A3E",
    to: "#0e2621"
  },
  {
    title: "Katalog Rempah",
    year: "2021",
    category: "cetak",
    tag: "Cetak & Editorial",
    desc: "Tipografi dan tata letak katalog produk untuk eksportir rempah premium ke pasar Eropa.",
    from: "#B4402C",
    to: "#6b2417"
  }
];

// ==========================================================
// RENDER WORK GRID
// ==========================================================
const workGrid = document.getElementById("workGrid");

function renderProjects(list) {
  workGrid.innerHTML = list.map((p) => `
    <article class="work-card" data-category="${p.category}">
      <div class="work-thumb" style="background:linear-gradient(150deg, ${p.from}, ${p.to});">
        <span class="work-thumb-tag">${p.tag}</span>
      </div>
      <div class="work-meta">
        <h3 class="work-title">${p.title}</h3>
        <span class="work-year">${p.year}</span>
      </div>
      <p class="work-desc">${p.desc}</p>
    </article>
  `).join("");
  observeRevealTargets();
}

renderProjects(PROJECTS);

// ==========================================================
// FILTER BAR
// ==========================================================
const filterBar = document.getElementById("filterBar");

filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");

  const filter = btn.dataset.filter;
  const cards = workGrid.querySelectorAll(".work-card");

  cards.forEach((card) => {
    const match = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !match);
  });
});

// ==========================================================
// MOBILE NAV
// ==========================================================
const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-menu-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-menu-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ==========================================================
// SCROLL REVEAL (cards + skill bars)
// ==========================================================
let revealObserver;

function observeRevealTargets() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  document.querySelectorAll(".work-card:not(.is-visible)").forEach((el) => revealObserver.observe(el));
}

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".skill-bar").forEach((el) => skillObserver.observe(el));

// ==========================================================
// INK CURSOR (desktop only, respects reduced motion)
// ==========================================================
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const inkCursor = document.getElementById("inkCursor");

if (canHover && !prefersReducedMotion) {
  window.addEventListener("mousemove", (e) => {
    inkCursor.style.left = `${e.clientX}px`;
    inkCursor.style.top = `${e.clientY}px`;
    inkCursor.classList.add("is-active");
  });

  document.querySelectorAll("a, button, .work-card").forEach((el) => {
    el.addEventListener("mouseenter", () => inkCursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => inkCursor.classList.remove("is-hover"));
  });
}

// ==========================================================
// HEADER SHRINK ON SCROLL
// ==========================================================
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 12;
  header.classList.toggle("is-scrolled", scrolled);
  lastScrollY = window.scrollY;
}, { passive: true });

// ==========================================================
// CONTACT FORM VALIDATION (client-side only, no backend)
// ==========================================================
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function setFieldError(name, message) {
  const errorEl = form.querySelector(`.field-error[data-for="${name}"]`);
  const fieldEl = errorEl.closest(".field");
  errorEl.textContent = message || "";
  fieldEl.classList.toggle("has-error", Boolean(message));
}

function validateForm(data) {
  let valid = true;

  if (!data.name.trim()) {
    setFieldError("name", "Nama tidak boleh kosong.");
    valid = false;
  } else {
    setFieldError("name", "");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    setFieldError("email", "Masukkan alamat email yang valid.");
    valid = false;
  } else {
    setFieldError("email", "");
  }

  if (data.message.trim().length < 10) {
    setFieldError("message", "Ceritakan sedikit lebih detail (min. 10 karakter).");
    valid = false;
  } else {
    setFieldError("message", "");
  }

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  if (!validateForm(data)) {
    formStatus.textContent = "";
    return;
  }

  // No backend is connected — this simulates a successful send.
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  formStatus.textContent = "Mengirim…";

  setTimeout(() => {
    formStatus.textContent = `Terima kasih, ${data.name.split(" ")[0]}! Pesan Anda telah diterima.`;
    form.reset();
    submitBtn.disabled = false;
  }, 700);
});

// ==========================================================
// FOOTER YEAR
// ==========================================================
document.getElementById("year").textContent = new Date().getFullYear();
