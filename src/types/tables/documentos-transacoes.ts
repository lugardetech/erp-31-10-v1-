export type DocumentosTransacoes = {
  Row: {
    data_upload: string | null
    id: number
    tipo_documento: string
    tipo_transacao: string
    transacao_id: number
    url_documento: string
    usuario_responsavel: string | null
  }
  Insert: {
    data_upload?: string | null
    id?: number
    tipo_documento: string
    tipo_transacao: string
    transacao_id: number
    url_documento: string
    usuario_responsavel?: string | null
  }
  Update: {
    data_upload?: string | null
    id?: number
    tipo_documento?: string
    tipo_transacao?: string
    transacao_id?: number
    url_documento?: string
    usuario_responsavel?: string | null
  }
  Relationships: []
}
