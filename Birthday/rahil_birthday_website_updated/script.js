// Rahil Birthday Website - repaired interactive controls
document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  // Two-step nickname surprise gate before the birthday website.
  const nicknameGate = byId("nicknameGate");
  const siteContent = byId("siteContent");
  const nicknameForm = byId("nicknameForm");
  const nicknameInput = byId("nicknameInput");
  const nicknameStep = byId("nicknameStep");
  const nicknameReveal = byId("nicknameReveal");
  const nicknameResult = byId("nicknameResult");
  const enterWebsiteBtn = byId("enterWebsiteBtn");
  let chosenNickname = "";
  if (nicknameForm && nicknameInput && nicknameStep && nicknameReveal) {
    nicknameForm.addEventListener("submit", (event) => {
      event.preventDefault();
      chosenNickname = nicknameInput.value.trim();
      if (!chosenNickname) {
        nicknameInput.focus();
        nicknameInput.setCustomValidity("Type the special name first ♡");
        nicknameInput.reportValidity();
        return;
      }
      nicknameInput.setCustomValidity("");
      if (nicknameResult) nicknameResult.textContent = chosenNickname + " ♡";
      nicknameStep.hidden = true;
      nicknameReveal.hidden = false;
      nicknameGate.classList.add("gate-celebrate");
    });
  }
  if (enterWebsiteBtn && nicknameGate && siteContent) {
    enterWebsiteBtn.addEventListener("click", () => {
      nicknameGate.classList.add("gate-leaving");
      window.setTimeout(() => {
        nicknameGate.hidden = true;
        siteContent.hidden = false;
        document.body.classList.add("site-unlocked");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 450);
    });
  }

  // Hero surprise button: scroll to the first birthday surprise section.
  const startBtn = byId("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const target = byId("candle");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Birthday letter open/close
  const letterBtn = byId("letterBtn");
  const letterContent = byId("letterContent");
  if (letterBtn && letterContent) {
    letterBtn.addEventListener("click", () => {
      const opening = letterContent.hidden;
      letterContent.hidden = !opening;
      letterBtn.setAttribute("aria-expanded", String(opening));
      const label = letterBtn.querySelector(".envelope-label");
      if (label) label.textContent = opening ? "Your letter is open ♡" : "Tap to open your letter";
      if (opening) setTimeout(() => letterContent.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    });
  }

  // One reliable birthday candle: visible candle, countdown, wish, and butterfly celebration.
  const candleSection = byId("candle");
  if (candleSection) {
    const startCandleBtn = byId("startCandleBtn");
    const blowBtn = byId("blowWishBtn");
    const scene = byId("candleScene");
    const flame = byId("flame");
    const count = byId("countdown");
    const status = byId("candleStatus");
    const wishMessage = byId("wishMessage");
    const cheer = byId("birthdayCheer");
    let timer = null, seconds = 5, started = false, finished = false;

    function finish(byTap) {
      if (finished) return;
      finished = true;
      clearInterval(timer);
      if (flame) flame.classList.add("flame-out");
      if (scene) scene.classList.add("blown");
      if (count) count.textContent = "♡";
      if (status) status.textContent = byTap ? "Wish made! Sending it up with a little magic… 💗" : "Your wish is still yours, birthday boy ✨";
      if (blowBtn) { blowBtn.disabled = true; blowBtn.textContent = "Wish sent to the stars 💗"; }
      if (startCandleBtn) startCandleBtn.disabled = true;
      if (wishMessage) wishMessage.hidden = false;
      if (cheer) cheer.hidden = false;
      releaseButterflies();
      makeConfettiHearts();
      candleSection.classList.add("birthday-celebration");
    }
    if (startCandleBtn) startCandleBtn.addEventListener("click", () => {
      if (started || finished) return;
      started = true; seconds = 5;
      if (flame) flame.classList.remove("flame-out");
      if (count) count.textContent = seconds;
      if (status) status.textContent = "Make a wish… 5 seconds of birthday magic! ✨";
      startCandleBtn.disabled = true;
      startCandleBtn.textContent = "Make your wish… ♡";
      if (blowBtn) blowBtn.disabled = false;
      timer = setInterval(() => {
        seconds -= 1;
        if (count) count.textContent = Math.max(seconds, 0);
        if (seconds <= 0) finish(false);
      }, 1000);
    });
    if (blowBtn) {
      blowBtn.disabled = true;
      blowBtn.addEventListener("click", () => { if (started && !finished) finish(true); });
    }
  }

  // Background music
const musicBtn = byId("musicBtn");
const audio = byId("birthdayAudio");

if (musicBtn && audio) {
  musicBtn.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        audio.currentTime = 0; // Song beginning muthal
        await audio.play();

        musicBtn.textContent = "♫ Pause birthday music";
        musicBtn.setAttribute("aria-pressed", "true");
      } catch {
        musicBtn.textContent = "Add music.mp3 to play ♫";
      }
    } else {
      audio.pause();
      musicBtn.textContent = "♫ Play birthday music";
      musicBtn.setAttribute("aria-pressed", "false");
    }
  });
}

  // Floating hearts
  function releaseButterflies() {
    const burst = document.getElementById("butterflyBurst");
    if (!burst) return;
    burst.innerHTML = "";
    const wings = ["🦋", "🦋", "✨", "🦋", "💗", "🦋", "✨", "🦋", "🦋", "💗", "🦋", "✨"];
    wings.forEach((symbol, index) => {
      const butterfly = document.createElement("span");
      butterfly.className = "flying-butterfly";
      butterfly.textContent = symbol;
      butterfly.style.setProperty("--flight-x", `${(index % 2 ? 1 : -1) * (35 + Math.random() * 150)}px`);
      butterfly.style.setProperty("--delay", `${Math.random() * 0.8}s`);
      butterfly.style.setProperty("--turn", `${(Math.random() * 70 - 35)}deg`);
      burst.appendChild(butterfly);
    });
    burst.classList.remove("released");
    void burst.offsetWidth;
    burst.classList.add("released");
  }

  function makeConfettiHearts(amount = 18) {
    for (let i = 0; i < amount; i++) {
      const heart = document.createElement("span");
      heart.className = "petal";
      heart.textContent = ["♡", "♥", "✧"][Math.floor(Math.random() * 3)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = (3 + Math.random() * 4) + "s";
      heart.style.fontSize = (14 + Math.random() * 18) + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 7500);
    }
  }
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "petal";
    heart.textContent = Math.random() > .5 ? "♡" : "✧";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (7 + Math.random() * 5) + "s";
    heart.style.fontSize = (12 + Math.random() * 12) + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 13000);
  }, 1100);

  // Full scrapbook spread: four photos visible together, 12 slots across 3 pages.
  const captions = [
    "iyy enne athyam ayi kandath❤️", "Ennod vann per choich panni nte sipup njn kudichila ennat🫣", "iyy enod samsrikanmnn parnj ennt njn sivanine aytt vann😂",
    "korchosam kainj iyy enik request aych pinen msg ayakkal ayi 😂 ", "angne anne njn bdy wish akki last november 4n iyyenne propose akki 😌", "vendum vann december 1 n iyy vendum vann gatinte avddenn propose akki❤️😫",
    "kore aloich njn irunnn angene december 5n nmde fifde ppde ann njn anne propose akki 😌", "pinne nammal angnd mudinja premam ayi aynte edk thalodal ayi sory prnj therkkal ayi ❤️😫😚", "iyy enne kettan vendi ang dufayilekk poyi 😫",
    "namde  krym njn veetil prnj ante vetkr vann samsrikn prnj 😌 ", "ange last uppa nmde engagement set akki😌 ", "angne nmde engament kainj iyy avde anenkilum but nml officialy fiance ayii 😫♡"
  ];
  const photos = captions.map((caption, i) => ({ src: `photos/memory${i + 1}.png`, caption, number: i + 1 }));
  const perSpread = 4;
  const totalSpreads = Math.ceil(photos.length / perSpread);
  let spreadIndex = 0;
  const grid = byId("scrapbookGrid"), counter = byId("albumCounter"), dotsWrap = byId("albumDots");
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < totalSpreads; i++) {
      const dot = document.createElement("button");
      dot.className = "album-dot" + (i === 0 ? " active" : "");
      dot.dataset.index = String(i);
      dot.setAttribute("aria-label", `Scrapbook page ${i + 1}`);
      dotsWrap.appendChild(dot);
    }
  }
  const spreadDots = [...document.querySelectorAll(".album-dot")];
  function showSpread(index) {
    if (!grid) return;
    spreadIndex = (index + totalSpreads) % totalSpreads;
    grid.innerHTML = "";
    const shown = photos.slice(spreadIndex * perSpread, spreadIndex * perSpread + perSpread);
    shown.forEach((item, localIndex) => {
      const figure = document.createElement("figure");
      figure.className = `scrapbook-tile scrapbook-tile-${localIndex + 1}`;
      const tape = document.createElement("span"); tape.className = "photo-tape"; tape.setAttribute("aria-hidden", "true");
      const frame = document.createElement("div"); frame.className = "scrapbook-image-frame";
      const img = document.createElement("img"); img.src = item.src; img.alt = item.caption; img.loading = "lazy";
      const placeholder = document.createElement("div"); placeholder.className = "scrapbook-placeholder"; placeholder.innerHTML = `<span>♡</span><small>Memory ${String(item.number).padStart(2, "0")}<br>Add your photo</small>`;
      img.addEventListener("error", () => { img.hidden = true; placeholder.hidden = false; });
      img.addEventListener("load", () => { img.hidden = false; placeholder.hidden = true; });
      placeholder.hidden = true;
      frame.append(img, placeholder);
      const caption = document.createElement("figcaption"); caption.textContent = item.caption;
      const tiny = document.createElement("span"); tiny.className = "tile-number"; tiny.textContent = `♡ ${String(item.number).padStart(2, "0")}`;
      figure.append(tape, frame, caption, tiny);
      grid.appendChild(figure);
    });
    if (counter) counter.textContent = `PAGE ${spreadIndex + 1} OF ${totalSpreads} · MEMORIES ${spreadIndex * perSpread + 1}–${Math.min((spreadIndex + 1) * perSpread, photos.length)}`;
    spreadDots.forEach((dot, i) => dot.classList.toggle("active", i === spreadIndex));
    grid.classList.remove("spread-turn"); void grid.offsetWidth; grid.classList.add("spread-turn");
  }
  const prev = byId("prevPhoto"), next = byId("nextPhoto");
  if (prev) prev.addEventListener("click", () => showSpread(spreadIndex - 1));
  if (next) next.addEventListener("click", () => showSpread(spreadIndex + 1));
  spreadDots.forEach(dot => dot.addEventListener("click", () => showSpread(Number(dot.dataset.index))));
  showSpread(0);

  // Interactive love constellation: each glowing star reveals a different personal note.
  const reasons = [
    "Your smile can make an ordinary day feel special.",
    "I love how you keep trying, even when things feel difficult.",
    "You deserve the same kindness you give to other people.",
    "Your dreams matter, and I'll always wish good things for you.",
    "You don't have to be perfect to be deeply loved.",
    "Even a simple moment feels memorable when it's shared with you.",
    "I hope you always feel proud of how far you've come.",
    "Your laugh is one of my favourite sounds.",
    "On hard days, please remember that you are not alone.",
    "Today and every day, I hope life is gentle with your heart."
  ];
  const noteTitles = ["Your sunshine", "Your brave heart", "Your kindness", "Your dreams", "Just as you are", "Our little world", "Look how far", "Your laugh", "Always beside you", "My birthday wish"];
  const noteEmojis = ["☀", "✦", "♡", "✨", "🌷", "📸", "🌱", "☺", "🫂", "🎂"];
  const noteGrid = byId("noteEnvelopeGrid");
  const constellationReveal = byId("constellationReveal");
  const constellationTitle = byId("constellationTitle");
  const constellationMessage = byId("constellationMessage");
  const closeConstellationNote = byId("closeConstellationNote");
  if (noteGrid) {
    reasons.forEach((message, index) => {
      const star = document.createElement("button");
      star.type = "button";
      star.className = `constellation-star star-${index + 1}`;
      star.setAttribute("aria-label", `Reveal love note ${index + 1}: ${noteTitles[index]}`);
      star.innerHTML = `<span class="star-orb">${noteEmojis[index]}</span><span class="star-label">${noteTitles[index]}</span><span class="star-number">0${index + 1}</span>`;
      star.addEventListener("click", () => {
        noteGrid.querySelectorAll(".constellation-star").forEach(item => item.classList.remove("selected"));
        star.classList.add("selected");
        if (constellationTitle) constellationTitle.textContent = noteTitles[index] + " ♡";
        if (constellationMessage) constellationMessage.textContent = message;
        if (constellationReveal) {
          constellationReveal.hidden = false;
          constellationReveal.classList.remove("note-pop"); void constellationReveal.offsetWidth; constellationReveal.classList.add("note-pop");
          setTimeout(() => constellationReveal.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
        }
        makeConfettiHearts(5);
      });
      noteGrid.appendChild(star);
    });
  }
  if (closeConstellationNote && constellationReveal) closeConstellationNote.addEventListener("click", () => { constellationReveal.hidden = true; });

  // Unwrap the virtual gift.
  const giftBtn = byId("giftBtn"), giftMessage = byId("giftMessage");
  if (giftBtn && giftMessage) giftBtn.addEventListener("click", () => {
    const open = giftMessage.hidden;
    giftMessage.hidden = !open;
    giftBtn.setAttribute("aria-expanded", String(open));
    giftBtn.querySelector("span").textContent = open ? "💝" : "🎁";
    giftBtn.querySelector("small").textContent = open ? "Your gift is open ♡" : "Tap to unwrap your gift";
    if (open) { makeConfettiHearts(); setTimeout(() => giftMessage.scrollIntoView({ behavior: "smooth", block: "center" }), 100); }
  });


  // Open-when comfort cards plus a full-screen animated virtual hug.
  const whenReveal = byId("whenReveal");
  document.querySelectorAll(".when-card").forEach((card) => {
    card.addEventListener("click", () => {
      if (!whenReveal) return;
      whenReveal.textContent = card.dataset.note || "Sending you a little love today. ♡";
      whenReveal.hidden = false;
      whenReveal.classList.remove("note-pop"); void whenReveal.offsetWidth; whenReveal.classList.add("note-pop");
    });
  });
  const hugOverlay = byId("hugOverlay");
  const hugSky = byId("hugSky");
  function launchHug() {
    if (!hugOverlay) return;
    hugOverlay.hidden = false;
    document.body.classList.add("hug-open");
    if (hugSky) {
      hugSky.innerHTML = "";
      const symbols = ["♡", "♥", "✦", "🦋", "💗", "✨", "♡", "🫧", "♥", "🦋", "✧", "💞", "♡", "✨", "🦋", "♥", "💗", "✦", "♡", "🫧", "💞", "🦋", "✨", "♥", "♡", "💗", "✦", "🦋", "♡", "♥"];
      symbols.forEach((symbol, index) => {
        const item = document.createElement("span");
        item.className = "hug-particle"; item.textContent = symbol;
        item.style.setProperty("--x", `${Math.random() * 100}%`);
        item.style.setProperty("--delay", `${Math.random() * 2.2}s`);
        item.style.setProperty("--duration", `${3.5 + Math.random() * 4}s`);
        item.style.setProperty("--size", `${15 + Math.random() * 24}px`);
        hugSky.appendChild(item);
      });
    }
  }
  function closeHug() { if (hugOverlay) hugOverlay.hidden = true; document.body.classList.remove("hug-open"); }
  const hugMeBtn = byId("hugMeBtn"), hugAgainBtn = byId("hugAgainBtn"), hugCloseBtn = byId("hugCloseBtn");
  if (hugMeBtn) hugMeBtn.addEventListener("click", launchHug);
  if (hugAgainBtn) hugAgainBtn.addEventListener("click", launchHug);
  if (hugCloseBtn) hugCloseBtn.addEventListener("click", closeHug);
  if (hugOverlay) hugOverlay.addEventListener("click", (event) => { if (event.target === hugOverlay) closeHug(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeHug(); });

  // Random simple date ideas.
  const dateIdeas = [
    { emoji: "🍓", title: "A snack date", text: "Get our favourite snacks and talk about everything and nothing." },
    { emoji: "🌅", title: "Sunset together", text: "Find a peaceful spot, watch the sky change colours, and take one photo." },
    { emoji: "🎶", title: "Our mini playlist", text: "Share three songs each and tell the stories behind them." },
    { emoji: "🍿", title: "A cosy movie date", text: "Choose a movie, make something tasty, and rate the funniest scene." },
    { emoji: "📸", title: "Silly photo challenge", text: "Take five funny photos and choose the one that makes us laugh most." },
    { emoji: "☕", title: "Tea and deep talks", text: "Put phones away for a while and ask each other random questions." },
    { emoji: "🚶", title: "A little walk", text: "Walk somewhere nice and notice five beautiful little things." },
    { emoji: "💌", title: "A handwritten note", text: "Write one thing you appreciate about each other and swap notes." }
  ];
  let lastDateIdea = -1;
  const pickDateBtn = byId("pickDateBtn");
  if (pickDateBtn) pickDateBtn.addEventListener("click", () => {
    let next = Math.floor(Math.random() * dateIdeas.length);
    if (dateIdeas.length > 1 && next === lastDateIdea) next = (next + 1) % dateIdeas.length;
    lastDateIdea = next;
    const idea = dateIdeas[next];
    if (byId("dateIdeaEmoji")) byId("dateIdeaEmoji").textContent = idea.emoji;
    if (byId("dateIdeaTitle")) byId("dateIdeaTitle").textContent = idea.title;
    if (byId("dateIdeaText")) byId("dateIdeaText").textContent = idea.text;
    const card = document.querySelector(".date-idea-card");
    if (card) { card.classList.remove("note-pop"); void card.offsetWidth; card.classList.add("note-pop"); }
  });

  const finalHeartsBtn = byId("finalHeartsBtn");
  if (finalHeartsBtn) finalHeartsBtn.addEventListener("click", () => {
    makeConfettiHearts();
    finalHeartsBtn.textContent = "A whole sky of love, just for you! 💗";
  });
});
