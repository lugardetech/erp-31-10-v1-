import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CartaoCredito } from '@/types/tables/cartao-credito'
import { ContasBancarias } from '@/types/tables/contas-bancarias'
import { Loader2 } from "lucide-react"

interface PaymentMethodSectionProps {
  paymentSource: string;
  paymentId: string;
  creditCards: CartaoCredito['Row'][];
  bankAccounts: ContasBancarias['Row'][];
  isLoading: boolean;
  onPaymentSourceChange: (source: 'card' | 'account') => void;
  onPaymentIdChange: (id: string) => void;
}

export function PaymentMethodSection({
  paymentSource,
  paymentId,
  creditCards,
  bankAccounts,
  isLoading,
  onPaymentSourceChange,
  onPaymentIdChange
}: PaymentMethodSectionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="payment-source">Método de Pagamento</Label>
        <Select
          value={paymentSource}
          onValueChange={(value: 'card' | 'account') => onPaymentSourceChange(value)}
          disabled={isLoading}
        >
          <SelectTrigger id="payment-source">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SelectValue placeholder="Selecione o método de pagamento" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Cartão de Crédito</SelectItem>
            <SelectItem value="account">Conta Bancária</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paymentSource && (
        <div className="space-y-2">
          <Label htmlFor="payment-id">
            {paymentSource === 'card' ? 'Cartão de Crédito' : 'Conta Bancária'}
          </Label>
          <Select 
            value={paymentId} 
            onValueChange={onPaymentIdChange}
            disabled={isLoading}
          >
            <SelectTrigger id="payment-id">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SelectValue 
                  placeholder={`Selecione ${paymentSource === 'card' ? 'o cartão' : 'a conta'}`} 
                />
              )}
            </SelectTrigger>
            <SelectContent>
              {paymentSource === 'card' ? (
                creditCards.map((card) => (
                  <SelectItem key={card.id} value={card.id.toString()}>
                    {card.bandeira} - **** {card.numero_ultimos_4}
                  </SelectItem>
                ))
              ) : (
                bankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.banco} - {account.numero_conta}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
