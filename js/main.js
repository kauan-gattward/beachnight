/**
 * Beach Night Itacaré — ajustes rápidos
 * --------------------------------------
 * 1) Próxima edição: preencha NEXT_EDITION quando a data for oficial.
 *    Enquanto dateLabel e lineup estiverem vazios, a página mostra
 *    "Próxima edição em breve, fique ligado no Instagram".
 *    Não invente preço: use priceLabel só com valor confirmado.
 *
 * 2) WhatsApp: deixe WHATSAPP_NUMBER vazio para esconder o botão.
 *    Para mostrar, use só dígitos com DDI, por exemplo "5573999999999".
 */
const WHATSAPP_NUMBER = "";

const NEXT_EDITION = {
  dateLabel: "",
  dateISO: "",
  start: "22h",
  end: "05h",
  lineup: [],
  ticketUrl: "",
  priceLabel: "",
  note: ""
};

const SITE = {
  instagram: "https://www.instagram.com/beachnightitc",
  instagramHandle: "@beachnightitc",
  tickets: "https://coraiseventos.com"
};

(function () {
  "use strict";

  const text = (value) => (typeof value === "string" ? value.trim() : "");

  const externalLink = (href, label, className, dataAttr) => {
    const link = document.createElement("a");
    link.className = className;
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (dataAttr) link.setAttribute(dataAttr, "");
    link.append(document.createTextNode(label));
    const hint = document.createElement("span");
    hint.className = "sr-only";
    hint.textContent = " (abre em uma nova aba)";
    link.append(hint);
    return link;
  };

  function renderNextEdition() {
    const card = document.querySelector("[data-proxima]");
    if (!card) return;

    const dateLabel = text(NEXT_EDITION.dateLabel);
    const dateISO = text(NEXT_EDITION.dateISO);
    const lineup = Array.isArray(NEXT_EDITION.lineup)
      ? NEXT_EDITION.lineup.map(text).filter(Boolean)
      : [];
    const note = text(NEXT_EDITION.note);
    const price = text(NEXT_EDITION.priceLabel);
    const start = text(NEXT_EDITION.start) || "22h";
    const end = text(NEXT_EDITION.end) || "05h";
    const ticket = text(NEXT_EDITION.ticketUrl) || SITE.tickets;

    document.querySelectorAll("[data-ticket]").forEach((link) => {
      link.href = ticket;
    });

    if (!dateLabel && lineup.length === 0) return;

    card.replaceChildren();
    card.classList.add("is-announced");

    const kicker = document.createElement("p");
    kicker.className = "ticket-kicker";
    kicker.textContent = "Data confirmada";
    card.append(kicker);

    const title = document.createElement("p");
    title.className = "ticket-title";
    if (dateLabel) {
      const time = document.createElement("time");
      if (dateISO) time.dateTime = dateISO;
      time.textContent = dateLabel;
      title.append(time);
    } else {
      title.textContent = "Line-up da próxima Beach Night";
    }
    card.append(title);

    const when = document.createElement("p");
    when.className = "ticket-meta";
    when.textContent = start + " às " + end + " · Cabana Corais, Praia da Concha";
    card.append(when);

    if (lineup.length) {
      const list = document.createElement("ul");
      list.className = "ticket-lineup";
      lineup.forEach((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        list.append(item);
      });
      card.append(list);
    }

    if (price) {
      const priceEl = document.createElement("p");
      priceEl.className = "ticket-price";
      priceEl.textContent = price;
      card.append(priceEl);
    }

    if (note) {
      const noteEl = document.createElement("p");
      noteEl.className = "ticket-note";
      noteEl.textContent = note;
      card.append(noteEl);
    }

    const actions = document.createElement("div");
    actions.className = "cta-row";
    actions.append(
      externalLink(ticket, "Garantir ingresso", "btn btn-primary", "data-ticket"),
      externalLink(SITE.instagram, "Seguir no Instagram", "btn btn-ghost"),
      externalLink("https://wa.me/", "Chamar no WhatsApp", "btn btn-whats", "data-whatsapp")
    );
    const whats = actions.querySelector("[data-whatsapp]");
    if (whats) whats.hidden = true;
    card.append(actions);
  }

  function setupWhatsapp() {
    const digits = String(WHATSAPP_NUMBER).replace(/\D/g, "");
    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      if (!digits) {
        link.hidden = true;
        return;
      }
      link.href = "https://wa.me/" + digits;
      link.hidden = false;
    });
  }

  function setupNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;

    const label = toggle.querySelector(".sr-only");
    const close = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (label) label.textContent = "Abrir menu";
    };
    const open = () => {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      if (label) label.textContent = "Fechar menu";
      const first = menu.querySelector("a");
      if (first) first.focus();
    };

    toggle.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) close();
      else open();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 999px)").matches) close();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function setupReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
  }

  function setupLightbox() {
    const dialog = document.querySelector("[data-lightbox]");
    const buttons = Array.from(document.querySelectorAll("[data-photo]"));
    if (!dialog || !buttons.length) return;

    const image = dialog.querySelector("img");
    const source = dialog.querySelector("source");
    const caption = dialog.querySelector("[data-lightbox-caption]");
    const counter = dialog.querySelector("[data-lightbox-count]");
    let index = 0;

    const paint = (next) => {
      index = (next + buttons.length) % buttons.length;
      const button = buttons[index];
      const webp = button.getAttribute("data-webp");
      const jpg = button.getAttribute("data-jpg");
      const inline = button.querySelector("img");
      const alt = button.getAttribute("data-alt") || (inline ? inline.alt : "") || "";
      if (source && webp) source.srcset = webp;
      image.src = jpg || webp || "";
      image.alt = alt;
      if (caption) caption.textContent = alt;
      if (counter) counter.textContent = index + 1 + " / " + buttons.length;
    };

    buttons.forEach((button, buttonIndex) => {
      button.addEventListener("click", () => {
        paint(buttonIndex);
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });

    const closeLightbox = () => {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    };

    dialog.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
    dialog.querySelector("[data-lightbox-prev]").addEventListener("click", () => paint(index - 1));
    dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => paint(index + 1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeLightbox();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        paint(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        paint(index + 1);
      }
    });

    dialog.addEventListener("close", () => {
      image.removeAttribute("src");
      if (source) source.removeAttribute("srcset");
    });
  }

  function setupYear() {
    const slot = document.querySelector("[data-year]");
    if (slot) slot.textContent = String(new Date().getFullYear());
  }

  document.documentElement.classList.add("js");
  renderNextEdition();
  setupWhatsapp();
  setupNav();
  setupReveal();
  setupLightbox();
  setupYear();
})();
