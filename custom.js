const input = document.getElementById("textInput"),
  $ = (id) => document.getElementById(id);
function analyze() {
  const t = input.value,
    trimmed = t.trim();
  $("characters").textContent = t.length.toLocaleString();
  $("charFoot").textContent = t.length.toLocaleString();
  $("words").textContent = trimmed
    ? trimmed.split(/\s+/).length.toLocaleString()
    : "0";
  $("sentences").textContent = trimmed
    ? (t.match(/[.!?]+(?=\s|$)/g) || []).length.toLocaleString()
    : "0";
  const sec = Math.ceil((trimmed ? trimmed.split(/\s+/).length : 0) / 3.3);
  $("reading").textContent =
    sec < 60 ? `${sec} sec` : `${Math.ceil(sec / 60)} min`;
  $("letters").textContent = (
    t.match(/[A-Za-z]/g) || []
  ).length.toLocaleString();
  $("numbers").textContent = (t.match(/\d/g) || []).length.toLocaleString();
  $("spaces").textContent = (t.match(/\s/g) || []).length.toLocaleString();
  $("paragraphs").textContent = trimmed ? trimmed.split(/\n\s*\n/).length : "0";
  const pct = Math.min(100, (t.length / 10000) * 100);
  $("meterFill").style.width = pct + "%";
  $("meterText").textContent = Math.round(pct) + "%";
  $("status").textContent = t.length
    ? "Analyzing live · " +
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Ready to analyze";
}
input.addEventListener("input", analyze);
$("clearBtn").onclick = () => {
  input.value = "";
  analyze();
  input.focus();
};
$("sampleBtn").onclick = () => {
  input.value =
    "Great products are built through small improvements. Write clearly, measure what matters, and keep refining your ideas until the experience feels effortless.";
  analyze();
};
$("copyBtn").onclick = async () => {
  if (!input.value) return;
  await navigator.clipboard.writeText(input.value);
  $("copyBtn").innerHTML = "Copied ✓";
  setTimeout(() => ($("copyBtn").innerHTML = "Copy text <span>↗</span>"), 1200);
};
