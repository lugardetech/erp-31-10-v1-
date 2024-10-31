import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
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

interface CreditCardListProps {
  cards: CreditCard[];
  isLoading: boolean;
  onEdit: (card: CreditCard) => void;
}

export function CreditCardList({ cards, isLoading, onEdit }: CreditCardListProps) {
  return (
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
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : cards.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Nenhum cartão de crédito cadastrado
              </TableCell>
            </TableRow>
          ) : (
            cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell className="font-medium">{card.bandeira}</TableCell>
                <TableCell>**** {card.numero_ultimos_4}</TableCell>
                <TableCell>{card.titular}</TableCell>
                <TableCell>{card.validade}</TableCell>
                <TableCell>{card.limite ? formatCurrency(card.limite) : '-'}</TableCell>
                <TableCell>Dia {card.diaFechamento || '-'}</TableCell>
                <TableCell>Dia {card.diaVencimento || '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(card)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}