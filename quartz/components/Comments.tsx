import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function Comments({ cfg, fileData }: QuartzComponentProps) {
    if (fileData.frontmatter.comments === false) return null
    else
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
          data-theme="https://keonly.github.io/quartz/components/styles/comments.scss"
          data-lang="en"
          crossorigin="anonymous"
          async
        ></script>
      )
  }

  return Comments
}) satisfies QuartzComponentConstructor
