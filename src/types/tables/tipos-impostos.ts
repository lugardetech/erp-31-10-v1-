export type TiposImpostos = {
  Row: {
    id: number
    nome: string
    percentual: number
  }
  Insert: {
    id?: number
    nome: string
    percentual: number
  }
  Update: {
    id?: number
    nome?: string
    percentual?: number
  }
  Relationships: []
}
