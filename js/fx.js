// Visual effects for correct answers.
const FX = {
  celebrate(sourceEl) {
    if (!sourceEl) return;
    const rect = sourceEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    sourceEl.classList.add("success-burst");
    setTimeout(() => sourceEl.classList.remove("success-burst"), 500);

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className = "success-particle";
      particle.style.left = cx + "px";
      particle.style.top = cy + "px";
      const angle = (Math.PI * 2 * i) / 8;
      const dist = 40 + Math.random() * 30;
      particle.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      particle.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 700);
    }
  }
};
