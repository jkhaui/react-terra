declare function useLiveBalances(options: {
  showLuna: boolean
  showTokenList: string[]
  refetchInterval: number

  onBalanceChange?: (data: any) => void
}): any

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.png' {
  const value: any
  export = value
}

declare module '*.svg' {
  import { FunctionComponent, SVGAttributes } from 'react'

  interface SvgrComponent
    extends FunctionComponent<SVGAttributes<SVGElement>> {}

  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

declare module 'rxjs'
declare module '@webreflection/json-map'
