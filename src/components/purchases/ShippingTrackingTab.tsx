import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Package, Truck } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RastreioCompras } from '@/types/tables/rastreio-compras';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CarrierSelect } from "@/components/ui/carrier-select";
import { CarrierDialog } from "@/components/carriers/CarrierDialog";
import { ShippingItemSelect } from './ShippingItemSelect';

interface ShippingTrackingTabProps {
  purchaseId: number;
}

interface ItensRastreio {
  id: number;
  rastreio_id: number;
  item_compra_id: number;
}

interface SelectedItem {
  id: number;
  quantidade: number;
}

interface PurchaseItem {
  id: number;
  compra_id: number | null;
  produto_id: number | null;
  quantidade: number;
  preco_unitario: number;
  produto: {
    nome: string;
    sku: string;
  } | null;
}

interface FormData extends Omit<RastreioCompras['Row'], 'id'> {
  itens_enviados: SelectedItem[];
}

// Função helper para inserção na tabela itens_rastreio
async function insertItensRastreio(data: {
  rastreio_id: number;
  item_compra_id: number;
  quantidade: number;
}[]) {
  return await (supabase
    .from('itens_rastreio') as any)
    .insert(data);
}

export function ShippingTrackingTab({ purchaseId }: ShippingTrackingTabProps) {
  const [trackings, setTrackings] = useState<RastreioCompras['Row'][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCarrierDialogOpen, setIsCarrierDialogOpen] = useState(false);
  const { toast } = useToast();
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([]);

  const [formData, setFormData] = useState<FormData>({
    compra_id: purchaseId,
    codigo_rastreamento: '',
    data_atualizacao: new Date().toISOString(),
    data_estimada_entrega: null,
    frete: null,
    imposto_importacao: null,
    localizacao: null,
    status_id: null,
    transportadora_id: null,
    itens_enviados: []
  });

  const fetchPurchaseItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('itens_compras')
        .select(`
          id,
          compra_id,
          produto_id,
          quantidade,
          preco_unitario,
          produto:produtos (
            nome,
            sku
          )
        `)
        .eq('compra_id', purchaseId);

      if (error) throw error;
      
      setPurchaseItems(data as unknown as PurchaseItem[]);
    } catch (error) {
      console.error('Erro ao buscar itens da compra:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os itens da compra.',
        variant: 'destructive',
      });
    }
  }, [purchaseId, toast]);

  useEffect(() => {
    fetchPurchaseItems();
  }, [fetchPurchaseItems]);

  useEffect(() => {
    fetchTrackings();
  }, [purchaseId]);

  async function fetchTrackings() {
    try {
      const { data, error } = await supabase
        .from('rastreio_compras')
        .select('*')
        .eq('compra_id', purchaseId)
        .order('data_estimada_entrega', { ascending: false });

      if (error) throw error;
      setTrackings(data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar rastreamentos',
        description: 'Não foi possível carregar os dados de rastreamento.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: rastreio, error: rastreioError } = await supabase
        .from('rastreio_compras')
        .insert({
          compra_id: purchaseId,
          codigo_rastreamento: formData.codigo_rastreamento,
          data_atualizacao: formData.data_atualizacao,
          data_estimada_entrega: formData.data_estimada_entrega,
          frete: formData.frete,
          imposto_importacao: formData.imposto_importacao,
          localizacao: formData.localizacao,
          status_id: formData.status_id,
          transportadora_id: formData.transportadora_id
        })
        .select()
        .single();

      if (rastreioError) throw rastreioError;

      if (formData.itens_enviados.length > 0) {
        const itensRastreio = formData.itens_enviados.map(item => ({
          rastreio_id: rastreio.id,
          item_compra_id: item.id,
          quantidade: item.quantidade
        }));

        const { error: itensError } = await insertItensRastreio(itensRastreio);

        if (itensError) throw itensError;
      }

      toast({
        title: 'Rastreamento adicionado',
        description: 'O rastreamento foi adicionado com sucesso.',
      });

      setIsDialogOpen(false);
      fetchTrackings();
      setFormData({
        compra_id: purchaseId,
        codigo_rastreamento: '',
        data_atualizacao: new Date().toISOString(),
        data_estimada_entrega: null,
        frete: null,
        imposto_importacao: null,
        localizacao: null,
        status_id: null,
        transportadora_id: null,
        itens_enviados: []
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao adicionar o rastreamento.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function getStatusLabel(statusId: number | null): string {
    switch (statusId) {
      case 1:
        return 'Aguardando Coleta';
      case 2:
        return 'Em Trânsito';
      case 3:
        return 'Entregue';
      case 4:
        return 'Atrasado';
      default:
        return 'Status Desconhecido';
    }
  }

  function getStatusBadgeColor(statusId: number | null) {
    switch (statusId) {
      case 1:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      case 3:
        return 'bg-green-100 text-green-800';
      case 4:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Rastreamento de Envios</h2>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Package className="mr-2 h-4 w-4" />
            Novo Rastreamento
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Transportadora</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Estimada</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Frete</TableHead>
                <TableHead>Imposto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : trackings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <div className="flex flex-col items-center gap-2 py-4">
                      <Truck className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Nenhum rastreamento cadastrado
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                trackings.map((tracking) => (
                  <TableRow key={tracking.id}>
                    <TableCell className="font-medium">
                      {tracking.codigo_rastreamento}
                    </TableCell>
                    <TableCell>{tracking.transportadora_id}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                          tracking.status_id
                        )}`}
                      >
                        {getStatusLabel(tracking.status_id)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {tracking.data_estimada_entrega
                        ? new Date(tracking.data_estimada_entrega).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell>{tracking.localizacao || '-'}</TableCell>
                    <TableCell>{tracking.frete ? `R$ ${tracking.frete.toFixed(2)}` : '-'}</TableCell>
                    <TableCell>
                      {tracking.imposto_importacao 
                        ? `R$ ${tracking.imposto_importacao.toFixed(2)}` 
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Rastreamento</DialogTitle>
            </DialogHeader>
            <ErrorBoundary>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo_rastreamento">Código de Rastreamento</Label>
                  <Input
                    id="codigo_rastreamento"
                    value={formData.codigo_rastreamento || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, codigo_rastreamento: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transportadora_id">Transportadora ID</Label>
                  <CarrierSelect
                    value={formData.transportadora_id?.toString() || ''}
                    onValueChange={(value) =>
                      setFormData({ ...formData, transportadora_id: parseInt(value) })
                    }
                    onEdit={() => setIsCarrierDialogOpen(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status_id">Status</Label>
                  <Select
                    value={formData.status_id?.toString() || ''}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status_id: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Aguardando Coleta</SelectItem>
                      <SelectItem value="2">Em Trânsito</SelectItem>
                      <SelectItem value="3">Entregue</SelectItem>
                      <SelectItem value="4">Atrasado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="data_estimada_entrega">Data Estimada</Label>
                    <Input
                      id="data_estimada_entrega"
                      type="date"
                      value={formData.data_estimada_entrega || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          data_estimada_entrega: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localizacao">Localização</Label>
                    <Input
                      id="localizacao"
                      value={formData.localizacao || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, localizacao: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frete">Frete (R$)</Label>
                    <Input
                      id="frete"
                      type="number"
                      step="0.01"
                      value={formData.frete || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, frete: parseFloat(e.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imposto_importacao">Imposto (R$)</Label>
                    <Input
                      id="imposto_importacao"
                      type="number"
                      step="0.01"
                      value={formData.imposto_importacao || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, imposto_importacao: parseFloat(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Itens Enviados</Label>
                  <ShippingItemSelect
                    items={purchaseItems.map(item => ({
                      id: item.id,
                      quantidade: item.quantidade,
                      produto: item.produto
                    }))}
                    selectedItems={formData.itens_enviados}
                    onSelectItems={(items) => 
                      setFormData({ ...formData, itens_enviados: items })
                    }
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Salvando...' : 'Adicionar'}
                  </Button>
                </div>
              </form>
            </ErrorBoundary>
          </DialogContent>
        </Dialog>

        <CarrierDialog
          open={isCarrierDialogOpen}
          onOpenChange={setIsCarrierDialogOpen}
          onSuccess={fetchTrackings}
        />
      </div>
    </ErrorBoundary>
  );
}
