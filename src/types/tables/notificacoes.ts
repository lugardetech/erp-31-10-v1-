export type Notificacoes = {
  Row: {
    data_notificacao: string | null
    id: number
    lida: boolean | null
    mensagem: string
    usuario_id: string | null
  }
  Insert: {
    data_notificacao?: string | null
    id?: number
    lida?: boolean | null
    mensagem: string
    usuario_id?: string | null
  }
  Update: {
    data_notificacao?: string | null
    id?: number
    lida?: boolean | null
    mensagem?: string
    usuario_id?: string | null
  }
  Relationships: []
}
