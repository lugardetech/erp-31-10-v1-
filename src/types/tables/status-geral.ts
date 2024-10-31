export type StatusGeral = {
  Row: {
    descricao: string
    id: number
    tipo_contexto: string
  }
  Insert: {
    descricao: string
    id?: never
    tipo_contexto: string
  }
  Update: {
    descricao?: string
    id?: never
    tipo_contexto?: string
  }
  Relationships: []
}
