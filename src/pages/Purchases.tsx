import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Package, FileText, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PurchaseDialog } from '@/components/purchases/PurchaseDialog';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { ActionBar } from "@/components/layout/ActionBar";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchInput } from "@/components/ui/search-input";
import { DataCard } from "@/components/ui/data-card";
import { StatusBadge } from "@/components/ui/status-badge";

interface Purchase {
  id: number;
  data: string;
  valor: number;
  fornecedor_id: number | null;
  conta_bancaria_id: number | null;
  cartao_credito_id: number | null;
  metodo_pagamento: string;
  status_id: number | null;
  imposto_nacional: number | null;
  outros_gastos: number | null;
  data_criacao: string | null;
  data_atualizacao: string | null;
  tipo_imposto_id: number | null;
  status_pedido_id: number | null;
  fornecedor?: {
    id: number;
    nome: string;
  } | null;
  status?: {
    id: number;
    descricao: string;
    tipo_contexto: string;
  } | null;
  status_pedido?: {
    id: number;
    descricao: string;
    tipo_contexto: string;
  } | null;
  itens_compras?: {
    id: number;
    quantidade: number;
    preco_unitario: number;
    compra_id: number | null;
    produto_id: number | null;
    produto?: {
      id: number;
      nome: string;
      sku: string;
    } | null;
  }[];
  rastreio_compras?: {
    id: number;
    codigo_rastreamento: string;
    status?: {
      descricao: string;
      tipo_contexto: string;
    } | null;
  }[];
}

export default function Purchases() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const { toast } = useToast();

  const fetchPurchases = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('compras')
        .select(`
          id,
          data,
          valor,
          fornecedor_id,
          status_id,
          status_pedido_id,
          fornecedor:fornecedores (
            id,
            nome
          ),
          status:status_geral!compras_status_id_fkey (
            id,
            descricao,
            tipo_contexto
          ),
          status_pedido:status_geral!compras_status_pedido_id_fkey (
            id,
            descricao,
            tipo_contexto
          ),
          itens_compras (
            id,
            quantidade,
            preco_unitario,
            produto:produtos (
              id,
              nome,
              sku
            )
          ),
          rastreio_compras (
            id,
            codigo_rastreamento,
            status:status_geral!rastreio_compras_status_id_fkey (
              descricao,
              tipo_contexto
            )
          )
        `)
        .order('data', { ascending: false });

      if (error) throw error;

      const typedData = data as unknown as Purchase[];
      setPurchases(typedData || []);
    } catch (error) {
      console.error('Erro ao buscar compras:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar compras',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const filteredPurchases = purchases.filter((purchase) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      purchase.fornecedor?.nome?.toLowerCase().includes(searchLower) ||
      purchase.id.toString().includes(searchLower) ||
      purchase.rastreio_compras?.some(rastreio => 
        rastreio.codigo_rastreamento?.toLowerCase().includes(searchLower)
      )
    );
  });

  const getStatusColor = (tipo_contexto: string, descricao: string) => {
    // Status de Compra
    if (tipo_contexto === 'compra') {
      switch (descricao.toLowerCase()) {
        case 'pendente': return '#FFA500';
        case 'em processamento': return '#2196F3';
        case 'aprovado': return '#4CAF50';
        case 'cancelado': return '#FF0000';
        default: return '#666666';
      }
    }
    
    // Status de Rastreamento
    if (tipo_contexto === 'rastreamento') {
      switch (descricao.toLowerCase()) {
        case 'aguardando envio': return '#FFA500';
        case 'em trânsito': return '#2196F3';
        case 'entregue': return '#4CAF50';
        case 'extraviado': return '#FF0000';
        case 'cancelado': return '#FF0000';
        default: return '#666666';
      }
    }

    return '#666666';
  };

  const handleOpenDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsDialogOpen(true);
  };

  return (
    <BaseLayout>
      <PageHeader
        title="Compras"
        action={
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Compra
          </Button>
        }
      />

      <Section>
        <ActionBar>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por fornecedor, número da compra ou código de rastreio..."
          />
        </ActionBar>

        <Tabs defaultValue="purchases" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="purchases" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Compras
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex-1">
              <Package className="mr-2 h-4 w-4" />
              Envios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            <DataCard title="Lista de Compras">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.id}</TableCell>
                      <TableCell>
                        {format(new Date(purchase.data), 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                      <TableCell>{purchase.fornecedor?.nome}</TableCell>
                      <TableCell>{formatCurrency(purchase.valor)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge 
                            variant="outline" 
                            style={{ 
                              backgroundColor: purchase.status 
                                ? getStatusColor(purchase.status.tipo_contexto, purchase.status.descricao) 
                                : '#666666',
                              color: 'white'
                            }}
                          >
                            {purchase.status?.descricao || 'Status não definido'}
                          </Badge>
                          {purchase.status_pedido && (
                            <Badge 
                              variant="outline" 
                              style={{ 
                                backgroundColor: getStatusColor(
                                  purchase.status_pedido.tipo_contexto, 
                                  purchase.status_pedido.descricao
                                ),
                                color: 'white'
                              }}
                            >
                              {purchase.status_pedido.descricao}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {purchase.itens_compras?.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.produto?.nome} ({item.quantidade} un. x {formatCurrency(item.preco_unitario)})
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDetails(purchase)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DataCard>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="grid gap-4">
              {filteredPurchases
                .filter(purchase => Array.isArray(purchase.rastreio_compras) && purchase.rastreio_compras.length > 0)
                .map((purchase) => (
                  <DataCard
                    key={purchase.id}
                    title={`Compra #${purchase.id} - ${purchase.fornecedor?.nome}`}
                  >
                    <div className="space-y-2">
                      {purchase.rastreio_compras?.map((rastreio) => (
                        <div 
                          key={rastreio.id}
                          className="flex items-center justify-between p-2 border rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>{rastreio.codigo_rastreamento}</span>
                          </div>
                          <StatusBadge 
                            status={rastreio.status?.descricao || 'Status não definido'}
                            tipo={rastreio.status?.tipo_contexto}
                          />
                        </div>
                      ))}
                    </div>
                  </DataCard>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <PurchaseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        purchase={selectedPurchase}
      />
    </BaseLayout>
  );
}
