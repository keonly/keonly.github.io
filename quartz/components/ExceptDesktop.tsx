import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    const ExceptDesktop: QuartzComponent = (props: QuartzComponentProps) => {
      return <Component displayClass="except-desktop" {...props} />
    }

    ExceptDesktop.displayName = component.displayName
    ExceptDesktop.afterDOMLoaded = component?.afterDOMLoaded
    ExceptDesktop.beforeDOMLoaded = component?.beforeDOMLoaded
    ExceptDesktop.css = component?.css
    return ExceptDesktop
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
