export interface PostType {
  id: string
  shortDescription: string
  title: string
  category?: {
    text: string
    id: string
  }
  date: string
  alias: string
}


export interface PostDetailType {
  [key: string] : any
}