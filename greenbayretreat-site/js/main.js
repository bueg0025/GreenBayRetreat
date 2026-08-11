(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;
    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
        if (open !== item) {
          open.classList.remove("is-open");
          open.querySelector(".faq-answer").style.maxHeight = null;
          open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
        question.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Gallery lightbox */
  var galleryLinks = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  var lightbox = document.querySelector(".lightbox");
  if (galleryLinks.length && lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      var link = galleryLinks[currentIndex];
      lightboxImg.src = link.getAttribute("href");
      lightboxImg.alt = link.querySelector("img").alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    function showNext(delta) {
      currentIndex = (currentIndex + delta + galleryLinks.length) % galleryLinks.length;
      var link = galleryLinks[currentIndex];
      lightboxImg.src = link.getAttribute("href");
      lightboxImg.alt = link.querySelector("img").alt || "";
    }

    galleryLinks.forEach(function (link, index) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        openLightbox(index);
      });
    });

    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-nav--prev");
    var nextBtn = lightbox.querySelector(".lightbox-nav--next");
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", function () { showNext(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { showNext(1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext(1);
      if (e.key === "ArrowLeft") showNext(-1);
    });
  }

  /* Netlify Form AJAX submit with inline success state */
  var form = document.querySelector('form[data-netlify="true"]');
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(function () {
          form.style.display = "none";
          var success = document.querySelector(".form-success");
          if (success) success.classList.add("is-visible");
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Inquiry";
          }
          alert("Something went wrong sending your message. Please try again or email us directly.");
        });
    });
  }
})();
