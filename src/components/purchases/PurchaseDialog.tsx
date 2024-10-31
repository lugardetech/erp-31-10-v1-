import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnifiedPurchaseForm } from './UnifiedPurchaseForm';
import { ShippingTrackingTab } from './ShippingTrackingTab';
import { PurchaseItemList } from './PurchaseItemList';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Fornecedores } from '@/types/tables/fornecedores';
import { Produtos } from '@/types/tables/produtos';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle, Loader2 } from 'lucide-react';
import { DataCard } from "@/components/ui/data-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PurchaseItem {
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
}

interface PurchaseDetails {
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

interface PurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase?: PurchaseDetails | null;
}

export function PurchaseDialog({
  open,
  onOpenChange,
  purchase,
}: PurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Fornecedores['Row'][]>([]);
  const [products, setProducts] = useState<Produtos['Row'][]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [purchaseDetails, setPurchaseDetails] = useState<PurchaseDetails | null>(null);

  const fetchSuppliers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('fornecedores')
        .select('*')
        .order('nome');

      if (error) throw error;

      setSuppliers(data || []);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      setError('Não foi possível carregar os fornecedores. Por favor, tente novamente.');
      toast({
        title: 'Erro',
        description: 'Erro ao carregar fornecedores',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('nome');

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Não foi possível carregar os produtos. Por favor, tente novamente.');
      toast({
        title: 'Erro',
        description: 'Erro ao carregar produtos',
        variant: 'destructive',
      });
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const fetchPurchaseDetails = useCallback(async (purchaseId: number) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('compras')
        .select(`
          *,
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
            compra_id,
            produto_id,
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
        .eq('id', purchaseId)
        .single();

      if (error) throw error;
      setPurchaseDetails(data as unknown as PurchaseDetails);
    } catch (error) {
      console.error('Erro ao buscar detalhes da compra:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar detalhes da compra',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (open) {
      fetchSuppliers();
      fetchProducts();
    }
  }, [open, fetchSuppliers, fetchProducts]);

  useEffect(() => {
    if (open && purchase?.id) {
      fetchPurchaseDetails(purchase.id);
    } else {
      setPurchaseDetails(null);
    }
  }, [open, purchase, fetchPurchaseDetails]);

  async function handleCreatePurchase(formData: {
    items: PurchaseItem[];
    data: string;
    fornecedor_id: string;
    payment_source: 'card' | 'account';
    payment_id: string;
    imposto_nacional?: number;
    outros_gastos?: number;
  }) {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calcula o valor total da compra
      const valorTotal = formData.items.reduce(
        (total: number, item: PurchaseItem) => total + (item.quantidade * item.preco_unitario),
        0
      ) + (formData.imposto_nacional || 0) + (formData.outros_gastos || 0);

      const purchaseData = {
        data: formData.data,
        fornecedor_id: parseInt(formData.fornecedor_id),
        valor: valorTotal,
        cartao_credito_id: formData.payment_source === 'card' ? parseInt(formData.payment_id) : null,
        conta_bancaria_id: formData.payment_source === 'account' ? parseInt(formData.payment_id) : null,
        metodo_pagamento: formData.payment_source === 'card' ? 'cartao' : 'conta_corrente',
        imposto_nacional: formData.imposto_nacional || 0,
        outros_gastos: formData.outros_gastos || 0,
        status_id: 1, // Status padrão para novas compras
        data_criacao: new Date().toISOString(),
      };

      const { data: compra, error: compraError } = await supabase
        .from('compras')
        .insert(purchaseData)
        .select()
        .single();

      if (compraError) throw compraError;

      // Insere os itens da compra
      if (compra) {
        const itensCompra = formData.items.map((item: PurchaseItem) => ({
          compra_id: compra.id,
          produto_id: parseInt(item.produto_id),
          quantidade: item.quantidade,
          preco_unitario: item.preco_unitario,
        }));

        const { error: itensError } = await supabase
          .from('itens_compras')
          .insert(itensCompra);

        if (itensError) throw itensError;
      }

      toast({
        title: 'Sucesso',
        description: 'Ordem de compra criada com sucesso.',
      });
      
      onOpenChange(false);
    } catch (error: unknown) {
      console.error('Erro ao salvar compra:', error);
      setError('Ocorreu um erro ao salvar a ordem de compra.');
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao salvar a ordem de compra.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '-';
      return format(date, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return '-';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {purchase ? `Detalhes da Compra #${purchase.id}` : 'Nova Ordem de Compra'}
          </DialogTitle>
        </DialogHeader>

        <ErrorBoundary>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : purchase ? (
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="items" className="flex-1">
                  Itens
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">
                  Envios
                </TabsTrigger>
              </TabsList>
              <TabsContent value="items">
                <div className="grid gap-4">
                  <DataCard title="Informações da Compra">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Data:</span>{' '}
                          {formatDate(purchaseDetails?.data)}
                        </div>
                        <div>
                          <span className="font-medium">Fornecedor:</span>{' '}
                          {purchaseDetails?.fornecedor?.nome || '-'}
                        </div>
                        <div>
                          <span className="font-medium">Valor Total:</span>{' '}
                          {formatCurrency(purchaseDetails?.valor || 0)}
                        </div>
                        <div>
                          <span className="font-medium">Método de Pagamento:</span>{' '}
                          {purchaseDetails?.metodo_pagamento || '-'}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Status:</span>
                          <div className="mt-1">
                            {purchaseDetails?.status && (
                              <StatusBadge 
                                status={purchaseDetails.status.descricao}
                                tipo={purchaseDetails.status.tipo_contexto}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DataCard>

                  <DataCard title="Itens">
                    <PurchaseItemList
                      items={purchaseDetails?.itens_compras || []}
                      products={products}
                      onRemove={() => {}}
                    />
                  </DataCard>
                </div>
              </TabsContent>
              <TabsContent value="shipping">
                <ShippingTrackingTab purchaseId={purchase.id} />
              </TabsContent>
            </Tabs>
          ) : (
            <UnifiedPurchaseForm
              suppliers={suppliers}
              products={products}
              onSubmit={handleCreatePurchase}
              isLoading={isLoading}
              onCancel={() => onOpenChange(false)}
            />
          )}
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
