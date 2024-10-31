export type ComunicacoesAtendimento = {
  Row: {
    anexos: string | null
    atendimento_id: number | null
    conteudo: string
    data_comunicacao: string | null
    id: number
    remetente: string
    tipo_comunicacao: string
  }
  Insert: {
    anexos?: string | null
    atendimento_id?: number | null
    conteudo: string
    data_comunicacao?: string | null
    id?: number
    remetente: string
    tipo_comunicacao: string
  }
  Update: {
    anexos?: string | null
    atendimento_id?: number | null
    conteudo?: string
    data_comunicacao?: string | null
    id?: number
    remetente?: string
    tipo_comunicacao?: string
  }
  Relationships: [
    {
      foreignKeyName: "comunicacoes_atendimento_atendimento_id_fkey"
      columns: ["atendimento_id"]
      isOneToOne: false
      referencedRelation: "atendimentos_clientes"
      referencedColumns: ["id"]
    }
  ]
}
