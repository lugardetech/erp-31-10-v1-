export type ContasBancarias = {
  Row: {
    banco: string
    id: number
    moeda: string | null
    numero_conta: string
    tipo_conta: string
  }
  Insert: {
    banco: string
    id?: number
    moeda?: string | null
    numero_conta: string
    tipo_conta: string
  }
  Update: {
    banco?: string
    id?: number
    moeda?: string | null
    numero_conta?: string
    tipo_conta?: string
  }
  Relationships: []
}
