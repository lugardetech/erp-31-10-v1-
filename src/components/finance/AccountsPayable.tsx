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
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/utils';

type AccountPayable = {
  id: number;
  valor: number;
  data_vencimento: string;
  data_pagamento: string | null;
  fornecedor_id: number | null;
  status_id: number | null;
};

export function AccountsPayable() {
  const [accounts, setAccounts] = useState<AccountPayable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const { data, error } = await supabase
        .from('contas_pagar')
        .select('*')
        .order('data_vencimento');

      if (error) throw error;
      setAccounts(data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar contas',
        description: 'Não foi possível carregar as contas a pagar.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contas a Pagar</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data Pagamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : accounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhuma conta a pagar cadastrada
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{formatCurrency(account.valor)}</TableCell>
                  <TableCell>{new Date(account.data_vencimento).toLocaleDateString()}</TableCell>
                  <TableCell>{account.status_id || 'Pendente'}</TableCell>
                  <TableCell>
                    {account.data_pagamento 
                      ? new Date(account.data_pagamento).toLocaleDateString()
                      : '-'}
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