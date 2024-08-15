import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
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
    Component.TableOfContents(),
    Component.Comments(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
  ],
  right: [
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
      filter: (f) => f.slug!.startsWith("cards/") || f.slug!.startsWith("sources/"),
      linkToMore: "tags/seed" as SimpleSlug,
    }),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
