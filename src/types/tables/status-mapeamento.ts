export type StatusMapeamento = {
  Row: {
    id: number
    mercado_livre_status: string
    status_geral_id: number
    tipo_contexto: string
  }
  Insert: {
    id?: number
    mercado_livre_status: string
    status_geral_id: number
    tipo_contexto: string
  }
  Update: {
    id?: number
    mercado_livre_status?: string
    status_geral_id?: number
    tipo_contexto?: string
  }
  Relationships: []
}
