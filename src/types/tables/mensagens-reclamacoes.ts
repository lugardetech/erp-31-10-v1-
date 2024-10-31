import { Json } from "../json"

export type MensagensReclamacoes = {
  Row: {
    anexos: Json | null
    data_criacao: string | null
    data_leitura: string | null
    destinatario: string | null
    etapa: string | null
    id: number
    id_reclamacao_marketplace: string | null
    mensagem: string | null
    mensagem_repetida: boolean | null
    remetente: string | null
    status: string | null
  }
  Insert: {
    anexos?: Json | null
    data_criacao?: string | null
    data_leitura?: string | null
    destinatario?: string | null
    etapa?: string | null
    id?: number
    id_reclamacao_marketplace?: string | null
    mensagem?: string | null
    mensagem_repetida?: boolean | null
    remetente?: string | null
    status?: string | null
  }
  Update: {
    anexos?: Json | null
    data_criacao?: string | null
    data_leitura?: string | null
    destinatario?: string | null
    etapa?: string | null
    id?: number
    id_reclamacao_marketplace?: string | null
    mensagem?: string | null
    mensagem_repetida?: boolean | null
    remetente?: string | null
    status?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "mensagens_reclamacoes_id_reclamacao_marketplace_fkey"
      columns: ["id_reclamacao_marketplace"]
      isOneToOne: false
      referencedRelation: "reclamacoes_mercado_livre"
      referencedColumns: ["id_reclamacao_marketplace"]
    }
  ]
}
