export type Auditoria = {
  Row: {
    acao: string
    data_acao: string | null
    detalhes: string | null
    id: number
    registro_id: number | null
    tabela_afetada: string | null
    usuario_id: string | null
  }
  Insert: {
    acao: string
    data_acao?: string | null
    detalhes?: string | null
    id?: number
    registro_id?: number | null
    tabela_afetada?: string | null
    usuario_id?: string | null
  }
  Update: {
    acao?: string
    data_acao?: string | null
    detalhes?: string | null
    id?: number
    registro_id?: number | null
    tabela_afetada?: string | null
    usuario_id?: string | null
  }
  Relationships: []
}
