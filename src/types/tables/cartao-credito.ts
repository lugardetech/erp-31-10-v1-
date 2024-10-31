export type CartaoCredito = {
  Row: {
    bandeira: string
    contaId: number | null
    diaFechamento: number | null
    diaVencimento: number | null
    id: number
    limite: number | null
    numero_ultimos_4: string
    titular: string
    validade: string
  }
  Insert: {
    bandeira: string
    contaId?: number | null
    diaFechamento?: number | null
    diaVencimento?: number | null
    id: number
    limite?: number | null
    numero_ultimos_4: string
    titular: string
    validade: string
  }
  Update: {
    bandeira?: string
    contaId?: number | null
    diaFechamento?: number | null
    diaVencimento?: number | null
    id?: number
    limite?: number | null
    numero_ultimos_4?: string
    titular?: string
    validade?: string
  }
  Relationships: [
    {
      foreignKeyName: "cartao_credito_contaId_fkey"
      columns: ["contaId"]
      isOneToOne: false
      referencedRelation: "contas_bancarias"
      referencedColumns: ["id"]
    }
  ]
}
