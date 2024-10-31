import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart, TrendingUp, TrendingDown, Package } from 'lucide-react';

type MercadoLivreSale = {
  order_id_ml: string;
  data: string | null;
  SKU: string | null;
  id_anuncio: string | null;
  unidades_vendidas: number | null;
  receita_unitaria: number | null;
  total: number | null;
  frete: number | null;
  taxa_ml: number | null;
  reembolsos: number | null;
  reembolso_frete: number | null;
  status: string | null;
};

export default function Sales() {
  const [sales, setSales] = useState<MercadoLivreSale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Estatísticas
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchSales();
  }, []);

  async function fetchSales() {
    try {
      const { data, error } = await supabase
        .from('vendas_mercado_livre')
        .select('*')
        .order('data', { ascending: false });

      if (error) throw error;

      setSales(data);

      // Calcular estatísticas
      const stats = data.reduce((acc, sale) => {
        acc.revenue += sale.total || 0;
        acc.refunds += (sale.reembolsos || 0) + (sale.reembolso_frete || 0);
        acc.items += sale.unidades_vendidas || 0;
        return acc;
      }, { revenue: 0, refunds: 0, items: 0 });

      setTotalSales(data.length);
      setTotalRevenue(stats.revenue);
      setTotalRefunds(stats.refunds);
      setTotalItems(stats.items);

    } catch (error) {
      toast({
        title: 'Erro ao carregar vendas',
        description: 'Não foi possível carregar as vendas do Mercado Livre.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const filteredSales = sales.filter((sale) => {
    const matchesSearch = 
      sale.order_id_ml.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sale.SKU?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      sale.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pedidos de Venda</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reembolsos</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRefunds)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Itens Vendidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar por ID ou SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Qtd.</TableHead>
              <TableHead>Valor Unit.</TableHead>
              <TableHead>Frete</TableHead>
              <TableHead>Taxa ML</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredSales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  Nenhuma venda encontrada
                </TableCell>
              </TableRow>
            ) : (
              filteredSales.map((sale) => (
                <TableRow key={sale.order_id_ml}>
                  <TableCell className="font-medium">{sale.order_id_ml}</TableCell>
                  <TableCell>
                    {sale.data ? new Date(sale.data).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell>{sale.SKU || '-'}</TableCell>
                  <TableCell>{sale.unidades_vendidas || 0}</TableCell>
                  <TableCell>{sale.receita_unitaria ? formatCurrency(sale.receita_unitaria) : '-'}</TableCell>
                  <TableCell>{sale.frete ? formatCurrency(sale.frete) : '-'}</TableCell>
                  <TableCell>{sale.taxa_ml ? formatCurrency(sale.taxa_ml) : '-'}</TableCell>
                  <TableCell>{sale.total ? formatCurrency(sale.total) : '-'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      sale.status === 'paid' ? 'bg-green-100 text-green-800' :
                      sale.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      sale.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      sale.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sale.status || 'Pendente'}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}