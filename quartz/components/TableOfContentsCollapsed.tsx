import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import modernStyle from "./styles/tocCollapsed.scss"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/tocCollapsed.inline"
import { i18n } from "../i18n"

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

let tocCount = 0;

const TableOfContentsCollapsed: QuartzComponent = ({
  fileData,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
  if (!fileData.toc) {
    return null
  }

  tocCount += 1;
  const uniqueTocId = `collapsed-toc-${tocCount}`
  const uniqueContentId = `collapsed-toc-content-${tocCount}`

  return (
    <div class={classNames(displayClass, "toc")}>
      <button
        type="button"
        id={uniqueTocId}
        class={fileData.isCollapsedToc ? "collapsed" : ""}
        aria-controls={uniqueContentId}
        aria-expanded={!fileData.isCollapsedToc}
      >
        <h3>{i18n(cfg.locale).components.tableOfContents.title}</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="fold"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div id={uniqueContentId} class={fileData.isCollapsedToc ? "collapsed" : ""}>
        <ul class="overflow">
          {fileData.toc.map((tocEntry) => (
            <li key={tocEntry.slug} class={`depth-${tocEntry.depth}`}>
              <a href={`#${tocEntry.slug}`} data-for={tocEntry.slug}>
                {tocEntry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
TableOfContentsCollapsed.css = modernStyle
TableOfContentsCollapsed.afterDOMLoaded = script

export default ((opts?: Partial<Options>) => {
  return TableOfContentsCollapsed
}) satisfies QuartzComponentConstructor
