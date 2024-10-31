export type LogMudancasStatus = {
  Row: {
    data_alteracao: string | null
    id: number
    status_anterior: string | null
    status_atual: string | null
    tipo_transacao: string
    transacao_id: number
    usuario_responsavel: string | null
  }
  Insert: {
    data_alteracao?: string | null
    id?: number
    status_anterior?: string | null
    status_atual?: string | null
    tipo_transacao: string
    transacao_id: number
    usuario_responsavel?: string | null
  }
  Update: {
    data_alteracao?: string | null
    id?: number
    status_anterior?: string | null
    status_atual?: string | null
    tipo_transacao?: string
    transacao_id?: number
    usuario_responsavel?: string | null
  }
  Relationships: []
}
