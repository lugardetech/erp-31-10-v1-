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

type CreditCard = {
  id: number;
  bandeira: string;
  numero_ultimos_4: string;
  titular: string;
  validade: string;
  limite: number | null;
  diaFechamento: number | null;
  diaVencimento: number | null;
};

export function CreditCards() {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from('cartao_credito')
        .select('*')
        .order('bandeira');

      if (error) throw error;
      setCards(data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar cartões',
        description: 'Não foi possível carregar os cartões de crédito.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cartões de Crédito</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cartão
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bandeira</TableHead>
              <TableHead>Final</TableHead>
              <TableHead>Titular</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Limite</TableHead>
              <TableHead>Fechamento</TableHead>
              <TableHead>Vencimento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Nenhum cartão de crédito cadastrado
                </TableCell>
              </TableRow>
            ) : (
              cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>{card.bandeira}</TableCell>
                  <TableCell>**** {card.numero_ultimos_4}</TableCell>
                  <TableCell>{card.titular}</TableCell>
                  <TableCell>{card.validade}</TableCell>
                  <TableCell>{card.limite ? formatCurrency(card.limite) : '-'}</TableCell>
                  <TableCell>Dia {card.diaFechamento || '-'}</TableCell>
                  <TableCell>Dia {card.diaVencimento || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}