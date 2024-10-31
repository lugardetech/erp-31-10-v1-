export type Marketplaces = {
  Row: {
    api_key: string | null
    api_secret: string | null
    id: number
    nome: string
    url_api: string | null
  }
  Insert: {
    api_key?: string | null
    api_secret?: string | null
    id?: number
    nome: string
    url_api?: string | null
  }
  Update: {
    api_key?: string | null
    api_secret?: string | null
    id?: number
    nome?: string
    url_api?: string | null
  }
  Relationships: []
}
