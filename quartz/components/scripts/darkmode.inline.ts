function changeGiscusTheme(theme?: string) {
  function sendMessage(message: any) {
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

const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

document.addEventListener("nav", () => {
  const switchTheme = (e: any) => {
    const newTheme = e.target.checked ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    changeGiscusTheme(newTheme)
  }

  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  toggleSwitch.removeEventListener("change", switchTheme)
  toggleSwitch.addEventListener("change", switchTheme)
  if (currentTheme === "dark") {
    toggleSwitch.checked = true
  }

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", (e) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    toggleSwitch.checked = e.matches
    changeGiscusTheme(newTheme)
  })
})
