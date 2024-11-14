import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.RecentNotes({
      title: "Recent Writings",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("logs/") && f.slug! !== "logs/index" && !f.frontmatter?.noindex,
      linkToMore: "logs/" as SimpleSlug,
    }),
    Component.RecentNotes({
      title: "Recent Notes",
      limit: 3,
      filter: (f) => f.slug!.startsWith("cards/"),
      linkToMore: "cards" as SimpleSlug,
    }),
    Component.Comments({
      provider: "giscus",
      options: {
        repo: "keonly/keonly.github.io",
        repoId: "R_kgDOKwHh3A",
        category: "Comments",
        categoryId: "DIC_kwDOKwHh3M4CbHnd",
      },
    }),
    Component.Graph(),
    Component.Backlinks(),
  ],
  footer: Component.Footer({
    links: {
      github: "https://github.com/keonly",
      linkedin: "https://www.linkedin.com/in/keonly",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [Component.Spacer(), Component.Darkmode(), Component.Search()],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.Graph()),
    Component.MobileOnly(Component.Backlinks()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [Component.Spacer(), Component.Darkmode(), Component.Search()],
  right: [],
  afterBody: [],
}
