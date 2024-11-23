const wishes = [
  "Hey, my special one 💖",
  "I just wanted to remind you 🌟",
  "how much you mean to me ✨.",
  "You’re not just my best friend 💫",
  "you’re like family 🤗",
  "You make the tough times easier 💪",
  "and the good times so much sweeter 🍭",
  "I want to give you a special gift 🎁..." 


  // "On this special day... ✨",
  // "I want to tell you something from my heart...",
  // "You bring so much joy to everyone around you! 🎉",
  // "Your smile brightens up even the darkest days! 💫",
  // "Your kindness makes this world a better place! 💖",
  // "Happy Birthday! 🎂",
  // "But before we continue...",
  // "I have a special question for you... 🤔"
];
//   const sisterChat = [
//     "Sister? 🤔",
//     "You know what Shalini...",
//     "I have something to confess... 💫",
//     "While sisters are precious...",
//     "I've always felt our bond is different... ✨",
//     "The way we understand each other...",
//     "The way we share everything...",
//     "It feels more like best friends! 💫",
//     "Would you like to be my Best Friend instead? 🌟"
//   ];
const bestFriendMessages = [
  "I know I am your special gift forever 💖",
  "I’ll never forget our journey together the memories, the growth 🌱",
  "and how much we’ve been through side by side 👯‍♂️.",
  "Every moment we’ve shared 🎉",
  "from the laughs to the deep chats 💬",
  "to the crazy adventures 🌍, has made",
  "my life richer and more beautiful 🌟",
  "You wished for me in your way 💭",
  "now see my way... 🚀"
];

function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";
  for (let i = 0; i < 200; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--duration", `${Math.random() * 3 + 1}s`);
    starsContainer.appendChild(star);
  }
  document.body.appendChild(starsContainer);
}

function createEmoji() {
  
  const emojis = ["💖", "⭐", "✨", "🎉", "🎂", "🎈"];
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.top = "-50px";
  document.body.appendChild(emoji);
  const animation = emoji.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
      },
      {
        transform: `translateY(${window.innerHeight + 50}px) rotate(${
          Math.random() * 360
        }deg)`,
      },
    ],
    {
      duration: 3000,
      easing: "linear",
    }
  );
  animation.onfinish = () => emoji.remove();
}

function stopAllMusic() {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function playAudio(audioId) {
  const audio = document.getElementById(audioId);
  if (audio) {
    audio.volume = 0.5;
    audio.play().catch((err) => console.log("Audio play failed:", err));
  }
}
let emojiInterval;
async function typeWriter(text) {
  const wishesElement = document.getElementById("wishes");
  wishesElement.style.opacity = 1;
  wishesElement.innerHTML = "";
  wishesElement.className = "wishes neon-text";
  for (let char of text) {
    wishesElement.innerHTML += char;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
let isMuted = false;
const muteButton = document.getElementById("muteButton");
muteButton.addEventListener("click", () => {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  isMuted = !isMuted;
  audios.forEach((id) => {
    const audio = document.getElementById(id);
    if (audio) {
      audio.muted = isMuted;
    }
  });
  // Update button text
  // muteButton.textContent = isMuted ? "🔇" : "🔊";
});
async function makeChoice(choice) {
  clearInterval(emojiInterval);
  const wishesElement = document.getElementById("wishes");
  document.getElementById("choices").style.display = "none";
  stopAllMusic();
  if (choice === "sister") {
    document.body.classList.add("sad-theme");
    const sisterAudio = document.getElementById("sisterMusic");
    sisterAudio.muted = isMuted;
    try {
      const playPromise = sisterAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    for (let message of sisterChat) {
      await typeWriter(message);
    }
    document.getElementById("choices").innerHTML = `
                      <button class="choice-btn" onclick="makeChoice('bestfriend')">Special Gift ⇨</button>
                  `;
    document.getElementById("choices").style.display = "block";
    document.querySelector(".choice-btn").style.opacity = 1;
  } else {
    document.body.classList.remove("sad-theme");
    const bestFriendAudio = document.getElementById("bestFriendMusic");
    bestFriendAudio.muted = isMuted;
    try {
      const playPromise = bestFriendAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Audio play failed:", error);
        });
      }
    } catch (err) {
      console.log("Audio play failed:", err);
    }
    emojiInterval = setInterval(createEmoji, 300);
    for (let message of bestFriendMessages) {
      await typeWriter(message);
    }
    setTimeout(() => {
      var wish = document.getElementById("wish");
      wish.setAttribute("class", "hide");
      var card = document.getElementById("card");
      card.classList.remove("hide");
      card.setAttribute("class", "show");
      wishesElement.innerHTML =
        "Check your Instagram, Chinni! 📱✨<br>💖I am there💖";
    }, 1000);
  }
}
document.getElementById("startBtn").addEventListener("click", async () => {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("wishesContainer").classList.remove("hidden");
  const bgAudio = document.getElementById("bgMusic");
  bgAudio.muted = isMuted;
  try {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Audio play failed:", error);
      });
    }
  } catch (err) {
    console.log("Audio play failed:", err);
  }
  emojiInterval = setInterval(createEmoji, 300);
  for (let wish of wishes) {
    await typeWriter(wish);
  }
  document.getElementById("choices").classList.remove("hidden");
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.style.opacity = 1;
  });
});
document.addEventListener("click", async function initAudio() {
  const audios = ["bgMusic", "sisterMusic", "bestFriendMusic"];
  for (let id of audios) {
    const audio = document.getElementById(id);
    try {
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
    } catch (err) {
      console.log("Audio initialization failed:", err);
    }
  }
  document.removeEventListener("click", initAudio);
});

createStars();

let fireworksStarted = false;

function createFireWorks() {

  var card = document.getElementById("card");
  card.style.display = 'none';  

  document.getElementById("wishes").style.display = 'none';
  document.getElementById("choices").style.display = 'none';
  document.getElementById("startBtn").style.display = 'none';

  clearInterval(emojiInterval);
  if (fireworksStarted) return; // Prevent re-triggering if already started

  fireworksStarted = true; // Set flag to true indicating the animation has started

  let chars, particles, canvas, ctx, w, h, current;
  let duration = 3500; // Total duration of the animation for each string
  let str = ["Happy", "Birthday", "Priya"];
  let startTime = null; // To track the start time of the animation
  let totalDuration = str.length * duration; // Total duration for all strings

  init();
  resize();

  function init() {
    // Create canvas and append to body
    canvas = document.createElement("canvas");
    document.body.append(canvas);
    document.body.style.margin = 0;
    document.body.style.overflow = "hidden";
    document.body.style.background = "black";
    ctx = canvas.getContext("2d");
  }

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    particles = innerWidth < 400 ? 55 : 99;
  }

  function makeChar(c) {
    let tmp = document.createElement("canvas");
    let size = (tmp.width = tmp.height = w < 400 ? 200 : 300);
    let tmpCtx = tmp.getContext("2d");
    tmpCtx.font = "bold " + size + "px Arial";
    tmpCtx.fillStyle = "white";
    tmpCtx.textBaseline = "middle";
    tmpCtx.textAlign = "center";
    tmpCtx.fillText(c, size / 2, size / 2);
    let char2 = tmpCtx.getImageData(0, 0, size, size);
    let char2particles = [];
    for (var i = 0; char2particles.length < particles; i++) {
      let x = size * Math.random();
      let y = size * Math.random();
      let offset = parseInt(y) * size * 4 + parseInt(x) * 4;
      if (char2.data[offset]) char2particles.push([x - size / 2, y - size / 2]);
    }
    return char2particles;
  }

  function makeChars(t) {
    // Determine which string to use based on elapsed time
    let actual = Math.floor(t / duration) % str.length;
    if (current === actual) return;
    current = actual;
    chars = [...str[actual]].map(makeChar);
  }

  function render(t) {
    if (!startTime) startTime = t; // Initialize start time

    let elapsedTime = t - startTime; // Calculate elapsed time
    makeChars(elapsedTime);

    ctx.fillStyle = "#00000010"; // Fade out effect
    ctx.fillRect(0, 0, w, h);

    // Render fireworks for each character
    chars.forEach((pts, i) => firework(elapsedTime, i, pts));

    // Stop the animation after the total duration (all strings)
    if (elapsedTime > totalDuration) {
      fireworksStarted = false; // Reset the flag so it can be triggered again
      return; // Stop the animation loop
    }

    // Continue requesting the next frame
    requestAnimationFrame(render);
  }

  function firework(t, i, pts) {
    t -= i * 200;
    let id = i + chars.length * parseInt(t - (t % duration));
    t = (t % duration) / duration;
    let dx = ((i + 1) * w) / (1 + chars.length);
    dx += Math.min(0.33, t) * 100 * Math.sin(id);
    let dy = h * 0.5;
    dy += Math.sin(id * 4547.411) * h * 0.1;
    if (t < 0.33) {
      rocket(dx, dy, id, t * 3);
    } else {
      explosion(pts, dx, dy, id, Math.min(1, Math.max(0, t - 0.33) * 2));
    }
  }

  function rocket(x, y, id, t) {
    ctx.fillStyle = "white";
    let r = 2 - 2 * t + Math.pow(t, 15 * t) * 16;
    y = h - y * t;
    circle(x, y, r);
  }

  function explosion(pts, x, y, id, t) {
    let dy = t * t * t * 20;
    let r = Math.sin(id) * 1 + 3;
    r = t < 0.5 ? (t + 0.5) * t * r : r - t * r;
    ctx.fillStyle = `hsl(${id * 55}, 55%, 55%)`;
    pts.forEach((xy, i) => {
      if (i % 20 === 0)
        ctx.fillStyle = `hsl(${id * 55}, 55%, ${
          55 + t * Math.sin(t * 55 + i) * 45
        }%)`;
      circle(t * xy[0] + x, h - y + t * xy[1] + dy, r);
    });
  }

  function circle(x, y, r) {
    ctx.beginPath();
    ctx.ellipse(x, y, r, r, 0, 0, 6.283);
    ctx.fill();
  }

  // Start the animation by calling render
  requestAnimationFrame(render);
}

(function () {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $("card"),
    openB = $("open"),
    closeB = $("close"),
    timer = null;
  console.log("wat", card);
  openB.addEventListener("click", function () {
    card.setAttribute("class", "open-half");
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "open-fully");
      timer = null;
    }, 1000);
  });

  closeB.addEventListener("click", function () {
    card.setAttribute("class", "close-half");
    if (timer) clearTimerout(timer);
    timer = setTimeout(function () {
      card.setAttribute("class", "");
      timer = null;
    }, 1000);
  });
})();
