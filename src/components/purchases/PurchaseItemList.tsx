import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ItensCompras } from '@/types/tables/itens-compras';
import { Produtos } from '@/types/tables/produtos';

interface PurchaseItemListProps {
  items: ItensCompras['Row'][];
  products: Produtos['Row'][];
  onRemove: (index: number) => void;
}

export function PurchaseItemList({ items, products, onRemove }: PurchaseItemListProps) {
  if (items.length === 0) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Preço Unitário</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{products.find(p => p.id === item.produto_id)?.nome}</TableCell>
            <TableCell>{item.quantidade}</TableCell>
            <TableCell>{formatCurrency(item.preco_unitario)}</TableCell>
            <TableCell>{formatCurrency(item.quantidade * item.preco_unitario)}</TableCell>
            <TableCell>
              <Button variant="ghost" onClick={() => onRemove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
