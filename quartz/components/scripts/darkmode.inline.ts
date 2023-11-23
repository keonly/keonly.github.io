const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("data-theme", currentTheme)

function changeGiscusTheme() {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"

  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame")
    if (!iframe) return
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app")
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  })
}

document.addEventListener("nav", () => {
  const switchTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    changeGiscusTheme()
  }

  changeGiscusTheme()

  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchTheme)
    toggleSwitch.checked = currentTheme === "dark"
  }

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    toggleSwitch.checked = e.matches
    changeGiscusTheme()
  })
})
