import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"

interface PurchaseFormFooterProps {
  impostoNacional: number;
  outrosGastos: number;
  observacoes: string;
  total: number;
  isLoading: boolean;
  onImpostoChange: (value: number) => void;
  onGastosChange: (value: number) => void;
  onObservacoesChange: (value: string) => void;
  onCancel: () => void;
  isSubmitDisabled: boolean;
}

export function PurchaseFormFooter({
  impostoNacional,
  outrosGastos,
  observacoes,
  total,
  isLoading,
  onImpostoChange,
  onGastosChange,
  onObservacoesChange,
  onCancel,
  isSubmitDisabled
}: PurchaseFormFooterProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="imposto_nacional">Imposto Nacional</Label>
          <Input
            id="imposto_nacional"
            type="number"
            step="0.01"
            min="0"
            value={impostoNacional}
            onChange={(e) => onImpostoChange(parseFloat(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outros_gastos">Outros Gastos</Label>
          <Input
            id="outros_gastos"
            type="number"
            step="0.01"
            min="0"
            value={outrosGastos}
            onChange={(e) => onGastosChange(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Input
          id="observacoes"
          value={observacoes}
          onChange={(e) => onObservacoesChange(e.target.value)}
        />
      </div>

      <div className="text-right font-semibold">
        Total da Compra: {formatCurrency(total)}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading || isSubmitDisabled}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Finalizar Compra'
          )}
        </Button>
      </div>
    </div>
  )
}
