function getGiscusTheme() {
  const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
  const currentTheme = localStorage.getItem("theme") ?? userPref
  return currentTheme
}

document.addEventListener("nav", () => {
  const targetDiv = document.getElementById("giscus-frame")
  if (!targetDiv) {
    return
  }

  const giscusAttributes = {
    src: "https://giscus.app/client.js",
    "data-repo": "keonly/keonly.github.io",
    "data-repo-id": "R_kgDOKwHh3A",
    "data-category": "Comments",
    "data-category-id": "DIC_kwDOKwHh3M4CbHnd",
    "data-mapping": "og:title",
    "data-strict": "0",
    "data-reactions-enabled": "1",
    "data-emit-metadata": "0",
    "data-input-position": "top",
    "data-theme": getGiscusTheme(),
    "data-lang": "en",
    crossorigin: "anonymous",
    async: "",
  }

  const giscusScript = document.createElement("script")
  Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value))
  document.body.appendChild(giscusScript)
})
