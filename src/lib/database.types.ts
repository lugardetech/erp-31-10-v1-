export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ajustes_estoque: {
        Row: {
          data_ajuste: string | null
          id: number
          motivo: string
          produto_id: number | null
          quantidade_ajuste: number
          usuario_responsavel: string | null
        }
        Insert: {
          data_ajuste?: string | null
          id?: number
          motivo: string
          produto_id?: number | null
          quantidade_ajuste: number
          usuario_responsavel?: string | null
        }
        Update: {
          data_ajuste?: string | null
          id?: number
          motivo?: string
          produto_id?: number | null
          quantidade_ajuste?: number
          usuario_responsavel?: string | null
        }
        Relationships: []
      }
      anuncios_marketplace: {
        Row: {
          descricao: string | null
          id: number
          marketplace_anuncio_id: string | null
          marketplace_id: number | null
          preco: number | null
          sku: string | null
          sku_produto: string | null
          status: string | null
        }
        Insert: {
          descricao?: string | null
          id?: never
          marketplace_anuncio_id?: string | null
          marketplace_id?: number | null
          preco?: number | null
          sku?: string | null
          sku_produto?: string | null
          status?: string | null
        }
        Update: {
          descricao?: string | null
          id?: never
          marketplace_anuncio_id?: string | null
          marketplace_id?: number | null
          preco?: number | null
          sku?: string | null
          sku_produto?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anuncios_marketplace_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "anuncios_marketplace_sku_produto_fkey"
            columns: ["sku_produto"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["sku"]
          },
        ]
      }
      atendimentos_clientes: {
        Row: {
          cliente_id: number | null
          data_atendimento: string | null
          descricao: string
          id: number
          id_reclamacao_marketplace: string | null
          id_venda_marketplace: string | null
          marketplace_id: number | null
          status: string
          tipo_atendimento: string
        }
        Insert: {
          cliente_id?: number | null
          data_atendimento?: string | null
          descricao: string
          id?: number
          id_reclamacao_marketplace?: string | null
          id_venda_marketplace?: string | null
          marketplace_id?: number | null
          status: string
          tipo_atendimento: string
        }
        Update: {
          cliente_id?: number | null
          data_atendimento?: string | null
          descricao?: string
          id?: number
          id_reclamacao_marketplace?: string | null
          id_venda_marketplace?: string | null
          marketplace_id?: number | null
          status?: string
          tipo_atendimento?: string
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_clientes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_clientes_id_venda_marketplace_fkey"
            columns: ["id_venda_marketplace"]
            isOneToOne: false
            referencedRelation: "vendas"
            referencedColumns: ["marketplace_order_id"]
          },
          {
            foreignKeyName: "atendimentos_clientes_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      auditoria: {
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
      cartao_credito: {
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
          },
        ]
      }
      clientes: {
        Row: {
          bairro: string | null
          cep: string | null
          cidade: string | null
          cpf: string | null
          email: string | null
          estado: string | null
          id: number
          marketplace_cliente_id: string | null
          marketplace_id: number | null
          nome: string
          numero_rua: string | null
          rua: string | null
          telefone: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          email?: string | null
          estado?: string | null
          id?: number
          marketplace_cliente_id?: string | null
          marketplace_id?: number | null
          nome: string
          numero_rua?: string | null
          rua?: string | null
          telefone?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cidade?: string | null
          cpf?: string | null
          email?: string | null
          estado?: string | null
          id?: number
          marketplace_cliente_id?: string | null
          marketplace_id?: number | null
          nome?: string
          numero_rua?: string | null
          rua?: string | null
          telefone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clientes_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      compras: {
        Row: {
          cartao_credito_id: number | null
          conta_bancaria_id: number | null
          data: string
          data_atualizacao: string | null
          data_criacao: string | null
          fornecedor_id: number | null
          id: number
          imposto_nacional: number | null
          metodo_pagamento: string
          outros_gastos: number | null
          status_id: number | null
          status_pedido_id: number | null
          tipo_imposto_id: number | null
          valor: number
        }
        Insert: {
          cartao_credito_id?: number | null
          conta_bancaria_id?: number | null
          data: string
          data_atualizacao?: string | null
          data_criacao?: string | null
          fornecedor_id?: number | null
          id?: number
          imposto_nacional?: number | null
          metodo_pagamento: string
          outros_gastos?: number | null
          status_id?: number | null
          status_pedido_id?: number | null
          tipo_imposto_id?: number | null
          valor: number
        }
        Update: {
          cartao_credito_id?: number | null
          conta_bancaria_id?: number | null
          data?: string
          data_atualizacao?: string | null
          data_criacao?: string | null
          fornecedor_id?: number | null
          id?: number
          imposto_nacional?: number | null
          metodo_pagamento?: string
          outros_gastos?: number | null
          status_id?: number | null
          status_pedido_id?: number | null
          tipo_imposto_id?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "compras_cartao_credito_id_fkey"
            columns: ["cartao_credito_id"]
            isOneToOne: false
            referencedRelation: "cartao_credito"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_conta_bancaria_id_fkey"
            columns: ["conta_bancaria_id"]
            isOneToOne: false
            referencedRelation: "contas_bancarias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status_geral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_status_pedido_id_fkey"
            columns: ["status_pedido_id"]
            isOneToOne: false
            referencedRelation: "status_geral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_tipo_imposto_id_fkey"
            columns: ["tipo_imposto_id"]
            isOneToOne: false
            referencedRelation: "tipos_impostos"
            referencedColumns: ["id"]
          },
        ]
      }
      comunicacoes_atendimento: {
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
          },
        ]
      }
      contas_bancarias: {
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
      contas_pagar: {
        Row: {
          compra_id: number | null
          data_pagamento: string | null
          data_vencimento: string
          fornecedor_id: number | null
          id: number
          metodo_pagamento_id: number | null
          status_id: number | null
          valor: number
        }
        Insert: {
          compra_id?: number | null
          data_pagamento?: string | null
          data_vencimento: string
          fornecedor_id?: number | null
          id?: number
          metodo_pagamento_id?: number | null
          status_id?: number | null
          valor: number
        }
        Update: {
          compra_id?: number | null
          data_pagamento?: string | null
          data_vencimento?: string
          fornecedor_id?: number | null
          id?: number
          metodo_pagamento_id?: number | null
          status_id?: number | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "contas_pagar_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_pagar_metodo_pagamento_id_fkey"
            columns: ["metodo_pagamento_id"]
            isOneToOne: false
            referencedRelation: "metodos_pagamento"
            referencedColumns: ["id"]
          },
        ]
      }
      contas_receber: {
        Row: {
          cliente_id: number | null
          data_recebimento: string | null
          data_vencimento: string
          id: number
          metodo_recebimento_id: number | null
          status_id: number | null
          valor: number
          venda_id: number | null
        }
        Insert: {
          cliente_id?: number | null
          data_recebimento?: string | null
          data_vencimento: string
          id?: number
          metodo_recebimento_id?: number | null
          status_id?: number | null
          valor: number
          venda_id?: number | null
        }
        Update: {
          cliente_id?: number | null
          data_recebimento?: string | null
          data_vencimento?: string
          id?: number
          metodo_recebimento_id?: number | null
          status_id?: number | null
          valor?: number
          venda_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contas_receber_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contas_receber_metodo_recebimento_id_fkey"
            columns: ["metodo_recebimento_id"]
            isOneToOne: false
            referencedRelation: "metodos_pagamento"
            referencedColumns: ["id"]
          },
        ]
      }
      devolucoes_vendas: {
        Row: {
          id: number
          motivo: string
          produto_id: number | null
          quantidade: number
          status_id: number | null
          venda_id: number | null
        }
        Insert: {
          id?: number
          motivo: string
          produto_id?: number | null
          quantidade: number
          status_id?: number | null
          venda_id?: number | null
        }
        Update: {
          id?: number
          motivo?: string
          produto_id?: number | null
          quantidade?: number
          status_id?: number | null
          venda_id?: number | null
        }
        Relationships: []
      }
      documentos_transacoes: {
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
      fornecedores: {
        Row: {
          contato: string | null
          email: string | null
          endereco: string | null
          id: number
          nome: string
          telefone: string | null
        }
        Insert: {
          contato?: string | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome: string
          telefone?: string | null
        }
        Update: {
          contato?: string | null
          email?: string | null
          endereco?: string | null
          id?: number
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      historico_precos: {
        Row: {
          data_alteracao: string | null
          id: number
          preco_anterior: number
          preco_novo: number
          produto_id: number | null
          usuario_responsavel: string | null
        }
        Insert: {
          data_alteracao?: string | null
          id?: number
          preco_anterior: number
          preco_novo: number
          produto_id?: number | null
          usuario_responsavel?: string | null
        }
        Update: {
          data_alteracao?: string | null
          id?: number
          preco_anterior?: number
          preco_novo?: number
          produto_id?: number | null
          usuario_responsavel?: string | null
        }
        Relationships: []
      }
      historico_status_vendas: {
        Row: {
          data_alteracao: string | null
          id: number
          observacao: string | null
          status: string
          usuario_responsavel: string | null
          venda_id: number | null
        }
        Insert: {
          data_alteracao?: string | null
          id?: number
          observacao?: string | null
          status: string
          usuario_responsavel?: string | null
          venda_id?: number | null
        }
        Update: {
          data_alteracao?: string | null
          id?: number
          observacao?: string | null
          status?: string
          usuario_responsavel?: string | null
          venda_id?: number | null
        }
        Relationships: []
      }
      itens_compras: {
        Row: {
          compra_id: number | null
          id: number
          preco_unitario: number
          produto_id: number | null
          quantidade: number
        }
        Insert: {
          compra_id?: number | null
          id?: number
          preco_unitario: number
          produto_id?: number | null
          quantidade: number
        }
        Update: {
          compra_id?: number | null
          id?: number
          preco_unitario?: number
          produto_id?: number | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_compras_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_compras_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_rastreio: {
        Row: {
          created_at: string | null
          id: number
          item_compra_id: number
          quantidade: number
          rastreio_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_compra_id: number
          quantidade?: number
          rastreio_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_compra_id?: number
          quantidade?: number
          rastreio_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_rastreio_item_compra_id_fkey"
            columns: ["item_compra_id"]
            isOneToOne: false
            referencedRelation: "itens_compras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_rastreio_rastreio_id_fkey"
            columns: ["rastreio_id"]
            isOneToOne: false
            referencedRelation: "rastreio_compras"
            referencedColumns: ["id"]
          },
        ]
      }
      itens_vendas: {
        Row: {
          data_criacao: string | null
          desconto: number | null
          id: number
          marketplace_anuncio_id: string | null
          marketplace_order_id: string | null
          preco_unitario: number
          produto_id: number | null
          quantidade: number
        }
        Insert: {
          data_criacao?: string | null
          desconto?: number | null
          id?: number
          marketplace_anuncio_id?: string | null
          marketplace_order_id?: string | null
          preco_unitario: number
          produto_id?: number | null
          quantidade: number
        }
        Update: {
          data_criacao?: string | null
          desconto?: number | null
          id?: number
          marketplace_anuncio_id?: string | null
          marketplace_order_id?: string | null
          preco_unitario?: number
          produto_id?: number | null
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "itens_vendas_marketplace_anuncio_id_fkey"
            columns: ["marketplace_anuncio_id"]
            isOneToOne: false
            referencedRelation: "anuncios_marketplace"
            referencedColumns: ["marketplace_anuncio_id"]
          },
          {
            foreignKeyName: "itens_vendas_marketplace_order_id_fkey"
            columns: ["marketplace_order_id"]
            isOneToOne: true
            referencedRelation: "vendas_mercado_livre"
            referencedColumns: ["order_id_ml"]
          },
          {
            foreignKeyName: "itens_vendas_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      log_mudancas_status: {
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
      marketplaces: {
        Row: {
          api_key: string | null
          api_secret: string | null
          id: number
          nome: string
          url_api: string | null
        }
        Insert: {
          api_key?: string | null
          api_secret?: string | null
          id?: number
          nome: string
          url_api?: string | null
        }
        Update: {
          api_key?: string | null
          api_secret?: string | null
          id?: number
          nome?: string
          url_api?: string | null
        }
        Relationships: []
      }
      mensagens_reclamacoes: {
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
          },
        ]
      }
      metodos_pagamento: {
        Row: {
          descricao: string
          id: number
        }
        Insert: {
          descricao: string
          id?: number
        }
        Update: {
          descricao?: string
          id?: number
        }
        Relationships: []
      }
      movimentacoes_estoque: {
        Row: {
          data_movimentacao: string | null
          id: number
          produto_id: number | null
          quantidade: number
          tipo_movimentacao: string
        }
        Insert: {
          data_movimentacao?: string | null
          id?: number
          produto_id?: number | null
          quantidade: number
          tipo_movimentacao: string
        }
        Update: {
          data_movimentacao?: string | null
          id?: number
          produto_id?: number | null
          quantidade?: number
          tipo_movimentacao?: string
        }
        Relationships: []
      }
      notificacoes: {
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
      pagamentos_vendas: {
        Row: {
          data_pagamento: string
          id: number
          metodo_pagamento_id: number | null
          status_pagamento_id: number | null
          valor_pagamento: number
          venda_id: string | null
        }
        Insert: {
          data_pagamento: string
          id?: number
          metodo_pagamento_id?: number | null
          status_pagamento_id?: number | null
          valor_pagamento: number
          venda_id?: string | null
        }
        Update: {
          data_pagamento?: string
          id?: number
          metodo_pagamento_id?: number | null
          status_pagamento_id?: number | null
          valor_pagamento?: number
          venda_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagamentos_vendas_metodo_pagamento_id_fkey"
            columns: ["metodo_pagamento_id"]
            isOneToOne: false
            referencedRelation: "metodos_pagamento"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          categoria: string | null
          data_atualizacao: string | null
          data_criacao: string | null
          descricao: string | null
          estoque: number | null
          fornecedor_id: number | null
          id: number
          imagem: string | null
          nome: string
          preco: number | null
          sku: string
        }
        Insert: {
          categoria?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          estoque?: number | null
          fornecedor_id?: number | null
          id?: number
          imagem?: string | null
          nome: string
          preco?: number | null
          sku: string
        }
        Update: {
          categoria?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          descricao?: string | null
          estoque?: number | null
          fornecedor_id?: number | null
          id?: number
          imagem?: string | null
          nome?: string
          preco?: number | null
          sku?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_fornecedor_id_fkey"
            columns: ["fornecedor_id"]
            isOneToOne: false
            referencedRelation: "fornecedores"
            referencedColumns: ["id"]
          },
        ]
      }
      promocoes: {
        Row: {
          ativo: boolean | null
          data_fim: string
          data_inicio: string
          id: number
          produto_id: number | null
          valor_desconto: number | null
        }
        Insert: {
          ativo?: boolean | null
          data_fim: string
          data_inicio: string
          id?: number
          produto_id?: number | null
          valor_desconto?: number | null
        }
        Update: {
          ativo?: boolean | null
          data_fim?: string
          data_inicio?: string
          id?: number
          produto_id?: number | null
          valor_desconto?: number | null
        }
        Relationships: []
      }
      rastreio_compras: {
        Row: {
          codigo_rastreamento: string | null
          compra_id: number | null
          data_atualizacao: string
          data_estimada_entrega: string | null
          frete: number | null
          id: number
          imposto_importacao: number | null
          localizacao: string | null
          status_id: number | null
          transportadora_id: number | null
        }
        Insert: {
          codigo_rastreamento?: string | null
          compra_id?: number | null
          data_atualizacao: string
          data_estimada_entrega?: string | null
          frete?: number | null
          id?: number
          imposto_importacao?: number | null
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
        }
        Update: {
          codigo_rastreamento?: string | null
          compra_id?: number | null
          data_atualizacao?: string
          data_estimada_entrega?: string | null
          frete?: number | null
          id?: number
          imposto_importacao?: number | null
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rastreio_compras_compra_id_fkey"
            columns: ["compra_id"]
            isOneToOne: false
            referencedRelation: "compras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rastreio_compras_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status_geral"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rastreio_compras_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
        ]
      }
      rastreio_devolucoes: {
        Row: {
          codigo_rastreamento: string | null
          data_atualizacao: string
          data_estimada_entrega: string | null
          devolucao_id: number | null
          id: number
          localizacao: string | null
          status_id: number | null
          transportadora_id: number | null
        }
        Insert: {
          codigo_rastreamento?: string | null
          data_atualizacao: string
          data_estimada_entrega?: string | null
          devolucao_id?: number | null
          id?: number
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
        }
        Update: {
          codigo_rastreamento?: string | null
          data_atualizacao?: string
          data_estimada_entrega?: string | null
          devolucao_id?: number | null
          id?: number
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rastreio_devolucoes_devolucao_id_fkey"
            columns: ["devolucao_id"]
            isOneToOne: false
            referencedRelation: "devolucoes_vendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rastreio_devolucoes_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
        ]
      }
      rastreio_vendas: {
        Row: {
          codigo_rastreamento: string | null
          data_atualizacao: string
          data_estimada_entrega: string | null
          id: number
          localizacao: string | null
          status_id: number | null
          transportadora_id: number | null
          venda_id: number | null
        }
        Insert: {
          codigo_rastreamento?: string | null
          data_atualizacao: string
          data_estimada_entrega?: string | null
          id?: number
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
          venda_id?: number | null
        }
        Update: {
          codigo_rastreamento?: string | null
          data_atualizacao?: string
          data_estimada_entrega?: string | null
          id?: number
          localizacao?: string | null
          status_id?: number | null
          transportadora_id?: number | null
          venda_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rastreio_vendas_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
        ]
      }
      reclamacoes_mercado_livre: {
        Row: {
          acoes_disponiveis: Json | null
          cliente_id: number | null
          data_atendimento: string | null
          descricao: string | null
          etapa: string | null
          id: number
          id_reclamacao_marketplace: string | null
          id_venda_marketplace: string | null
          marketplace_id: number | null
          motivo_id: string | null
          resolucao: string | null
          status: string | null
          tipo: string | null
          tipo_atendimento: string | null
          tipo_quantidade: string | null
        }
        Insert: {
          acoes_disponiveis?: Json | null
          cliente_id?: number | null
          data_atendimento?: string | null
          descricao?: string | null
          etapa?: string | null
          id?: number
          id_reclamacao_marketplace?: string | null
          id_venda_marketplace?: string | null
          marketplace_id?: number | null
          motivo_id?: string | null
          resolucao?: string | null
          status?: string | null
          tipo?: string | null
          tipo_atendimento?: string | null
          tipo_quantidade?: string | null
        }
        Update: {
          acoes_disponiveis?: Json | null
          cliente_id?: number | null
          data_atendimento?: string | null
          descricao?: string | null
          etapa?: string | null
          id?: number
          id_reclamacao_marketplace?: string | null
          id_venda_marketplace?: string | null
          marketplace_id?: number | null
          motivo_id?: string | null
          resolucao?: string | null
          status?: string | null
          tipo?: string | null
          tipo_atendimento?: string | null
          tipo_quantidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reclamacoes_mercado_livre_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      status_geral: {
        Row: {
          descricao: string
          id: number
          tipo_contexto: string
        }
        Insert: {
          descricao: string
          id?: never
          tipo_contexto: string
        }
        Update: {
          descricao?: string
          id?: never
          tipo_contexto?: string
        }
        Relationships: []
      }
      status_mapeamento: {
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
      taxas_marketplace: {
        Row: {
          descricao: string | null
          id: number
          tipo_taxa: string
          valor_taxa: number
          venda_id: number | null
        }
        Insert: {
          descricao?: string | null
          id?: number
          tipo_taxa: string
          valor_taxa: number
          venda_id?: number | null
        }
        Update: {
          descricao?: string | null
          id?: number
          tipo_taxa?: string
          valor_taxa?: number
          venda_id?: number | null
        }
        Relationships: []
      }
      tipos_impostos: {
        Row: {
          id: number
          nome: string
          percentual: number
        }
        Insert: {
          id?: number
          nome: string
          percentual: number
        }
        Update: {
          id?: number
          nome?: string
          percentual?: number
        }
        Relationships: []
      }
      transportadoras: {
        Row: {
          contato: string | null
          id: number
          nome: string
          telefone: string | null
        }
        Insert: {
          contato?: string | null
          id?: number
          nome: string
          telefone?: string | null
        }
        Update: {
          contato?: string | null
          id?: number
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      vendas: {
        Row: {
          cliente_marketplace_id: string | null
          data_atualizacao: string | null
          data_criacao: string | null
          data_venda: string | null
          desconto: number | null
          id: number
          id_envio_mercado_livre: string | null
          id_seq: number | null
          lucro: number | null
          marketplace_id: number | null
          marketplace_order_id: string
          metodo_pagamento_id: number | null
          status_pedido: number | null
          taxa_marketplace: number | null
          valor_frete: number | null
          valor_total: number
        }
        Insert: {
          cliente_marketplace_id?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          data_venda?: string | null
          desconto?: number | null
          id: number
          id_envio_mercado_livre?: string | null
          id_seq?: number | null
          lucro?: number | null
          marketplace_id?: number | null
          marketplace_order_id: string
          metodo_pagamento_id?: number | null
          status_pedido?: number | null
          taxa_marketplace?: number | null
          valor_frete?: number | null
          valor_total: number
        }
        Update: {
          cliente_marketplace_id?: string | null
          data_atualizacao?: string | null
          data_criacao?: string | null
          data_venda?: string | null
          desconto?: number | null
          id?: number
          id_envio_mercado_livre?: string | null
          id_seq?: number | null
          lucro?: number | null
          marketplace_id?: number | null
          marketplace_order_id?: string
          metodo_pagamento_id?: number | null
          status_pedido?: number | null
          taxa_marketplace?: number | null
          valor_frete?: number | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "vendas_cliente_marketplace_id_fkey"
            columns: ["cliente_marketplace_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["marketplace_cliente_id"]
          },
          {
            foreignKeyName: "vendas_marketplace_id_fkey"
            columns: ["marketplace_id"]
            isOneToOne: false
            referencedRelation: "marketplaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendas_metodo_pagamento_id_fkey"
            columns: ["metodo_pagamento_id"]
            isOneToOne: false
            referencedRelation: "metodos_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendas_status_pedido_fkey"
            columns: ["status_pedido"]
            isOneToOne: false
            referencedRelation: "status_geral"
            referencedColumns: ["id"]
          },
        ]
      }
      vendas_mercado_livre: {
        Row: {
          data: string | null
          frete: number | null
          id_anuncio: string | null
          order_id_ml: string
          receita_unitaria: number | null
          reembolso_frete: number | null
          reembolsos: number | null
          SKU: string | null
          status: string | null
          taxa_ml: number | null
          total: number | null
          unidades_vendidas: number | null
        }
        Insert: {
          data?: string | null
          frete?: number | null
          id_anuncio?: string | null
          order_id_ml: string
          receita_unitaria?: number | null
          reembolso_frete?: number | null
          reembolsos?: number | null
          SKU?: string | null
          status?: string | null
          taxa_ml?: number | null
          total?: number | null
          unidades_vendidas?: number | null
        }
        Update: {
          data?: string | null
          frete?: number | null
          id_anuncio?: string | null
          order_id_ml?: string
          receita_unitaria?: number | null
          reembolso_frete?: number | null
          reembolsos?: number | null
          SKU?: string | null
          status?: string | null
          taxa_ml?: number | null
          total?: number | null
          unidades_vendidas?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
