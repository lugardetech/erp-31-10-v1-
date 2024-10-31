export type ItensRastreio = {
  Row: {
    id: number;
    rastreio_id: number;
    item_compra_id: number;
    created_at?: string;
  };
  Insert: {
    id?: number;
    rastreio_id: number;
    item_compra_id: number;
    created_at?: string;
  };
  Update: {
    id?: number;
    rastreio_id?: number;
    item_compra_id?: number;
    created_at?: string;
  };
  Relationships: [
    {
      foreignKeyName: "itens_rastreio_rastreio_id_fkey";
      columns: ["rastreio_id"];
      isOneToOne: false;
      referencedRelation: "rastreio_compras";
      referencedColumns: ["id"];
    },
    {
      foreignKeyName: "itens_rastreio_item_compra_id_fkey";
      columns: ["item_compra_id"];
      isOneToOne: false;
      referencedRelation: "itens_compras";
      referencedColumns: ["id"];
    }
  ];
}; 