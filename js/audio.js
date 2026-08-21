// MVP text-to-speech via the Web Speech API (SpeechSynthesis).
// Best supported in Google Chrome, which ships a networked "lt-LT" Google voice.
// Other browsers may have no Lithuanian voice at all — this degrades silently
// rather than mispronouncing loudly in the wrong language.

const LTSpeech = (function () {
  const supported = "speechSynthesis" in window;
  let cachedVoice = null;

  function pickVoice() {
    if (!supported) return;
    const voices = window.speechSynthesis.getVoices();
    cachedVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith("lt")) || null;
  }

  if (supported) {
    pickVoice();
    // Voice list loads asynchronously in Chrome; re-pick once it's ready.
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  function speak(text) {
    if (!supported || !text) return;
    window.speechSynthesis.cancel(); // stop any overlapping utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "lt-LT";
    if (cachedVoice) utterance.voice = cachedVoice;
    utterance.rate = 0.85; // slightly slower, easier for kids to follow
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (supported) window.speechSynthesis.cancel();
  }

  return {
    isSupported: supported,
    hasLithuanianVoice: () => !!cachedVoice,
    speak,
    stop
  };
})();
