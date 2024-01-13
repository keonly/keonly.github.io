import commentsScript from "./scripts/comments.inline"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function Comments({ cfg, fileData, theme }: QuartzComponentProps) {
    if (fileData.frontmatter.comments === false) return null
    else
      return (
        <div></div>
      )
  }

  Comments.afterDOMLoaded = commentsScript
  return Comments
}) satisfies QuartzComponentConstructor
