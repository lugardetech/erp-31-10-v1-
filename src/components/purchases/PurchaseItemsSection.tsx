import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProductSelect } from './ProductSelect'
import { formatCurrency } from "@/lib/utils"
import { Produtos } from '@/types/tables/produtos'

interface PurchaseFormItem {
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
}

interface PurchaseItemsSectionProps {
  products: Produtos['Row'][];
  items: PurchaseFormItem[];
  newItem: PurchaseFormItem;
  onNewItemChange: (item: PurchaseFormItem) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function PurchaseItemsSection({
  products = [],
  items,
  newItem,
  onNewItemChange,
  onAddItem,
  onRemoveItem,
}: PurchaseItemsSectionProps) {
  const safeProducts = products ?? [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <Label htmlFor="product-select">Produto</Label>
          <div id="product-select">
            <ProductSelect
              products={safeProducts}
              selectedId={newItem.produto_id}
              onSelect={(id) => onNewItemChange({ ...newItem, produto_id: id })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="quantidade">Quantidade</Label>
          <Input
            id="quantidade"
            type="number"
            min="1"
            value={newItem.quantidade}
            onChange={(e) =>
              onNewItemChange({
                ...newItem,
                quantidade: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
        <div>
          <Label htmlFor="preco">Preço Unitário</Label>
          <Input
            id="preco"
            type="number"
            step="0.01"
            min="0"
            value={newItem.preco_unitario}
            onChange={(e) =>
              onNewItemChange({
                ...newItem,
                preco_unitario: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={onAddItem}
        disabled={!newItem.produto_id || newItem.quantidade <= 0 || newItem.preco_unitario <= 0}
      >
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Item
      </Button>

      {items.length > 0 && (
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
            {items.map((item, index) => {
              const product = safeProducts.find(p => p.id.toString() === item.produto_id);
              return (
                <TableRow key={index}>
                  <TableCell>{product?.nome || 'Produto não encontrado'}</TableCell>
                  <TableCell>{item.quantidade}</TableCell>
                  <TableCell>{formatCurrency(item.preco_unitario)}</TableCell>
                  <TableCell>
                    {formatCurrency(item.quantidade * item.preco_unitario)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}