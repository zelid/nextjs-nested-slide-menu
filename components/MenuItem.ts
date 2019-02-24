
export interface MenuItem {
  label?: string
  url?: string
  level?: number
  children?: MenuItem[]
  active?: boolean
  command?(e: { originalEvent: Event; item: MenuItem }): void
}
