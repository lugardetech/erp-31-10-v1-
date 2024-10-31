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

type BankAccount = {
  id: number;
  banco: string;
  numero_conta: string;
  tipo_conta: string;
  moeda: string | null;
};

interface BankAccountListProps {
  accounts: BankAccount[];
  isLoading: boolean;
  onEdit: (account: BankAccount) => void;
}

export function BankAccountList({ accounts, isLoading, onEdit }: BankAccountListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banco</TableHead>
            <TableHead>Número da Conta</TableHead>
            <TableHead>Tipo de Conta</TableHead>
            <TableHead>Moeda</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Carregando...
              </TableCell>
            </TableRow>
          ) : accounts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhuma conta bancária cadastrada
              </TableCell>
            </TableRow>
          ) : (
            accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.banco}</TableCell>
                <TableCell>{account.numero_conta}</TableCell>
                <TableCell>{account.tipo_conta}</TableCell>
                <TableCell>{account.moeda || 'BRL'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(account)}
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