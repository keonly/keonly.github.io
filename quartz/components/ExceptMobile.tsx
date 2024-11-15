import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    const ExceptMobile: QuartzComponent = (props: QuartzComponentProps) => {
      return <Component displayClass="except-mobile" {...props} />
    }

    ExceptMobile.displayName = component.displayName
    ExceptMobile.afterDOMLoaded = component?.afterDOMLoaded
    ExceptMobile.beforeDOMLoaded = component?.beforeDOMLoaded
    ExceptMobile.css = component?.css
    return ExceptMobile
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
