import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Fornecedores } from '@/types/tables/fornecedores'

interface PurchaseFormHeaderProps {
  date: string;
  supplierId: string;
  suppliers: Fornecedores['Row'][];
  onDateChange: (date: string) => void;
  onSupplierChange: (id: string) => void;
}

export function PurchaseFormHeader({
  date,
  supplierId,
  suppliers = [],
  onDateChange,
  onSupplierChange
}: PurchaseFormHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="data">Data</Label>
        <Input
          id="data"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fornecedor">Fornecedor</Label>
        <Select
          value={supplierId}
          onValueChange={onSupplierChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione um fornecedor" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier) => (
              <SelectItem key={supplier.id} value={supplier.id.toString()}>
                {supplier.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
