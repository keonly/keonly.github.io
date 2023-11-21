import { QuartzComponentConstructor } from "./types"

export default (() => {
  function Footer() {
    return (
      <script
        src="https://giscus.app/client.js"
        data-repo="keonly/keonly.github.io"
        data-repo-id="R_kgDOKwHh3A"
        data-category="Comments"
        data-category-id="DIC_kwDOKwHh3M4CbHnd"
        data-mapping="og:title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="https://giscus.app/themes/custom_example.css"
        data-lang="en"
        crossorigin="anonymous"
        async
      ></script>
    )
  }

  return Footer
}) satisfies QuartzComponentConstructor
