import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CreditCard = {
  id: number;
  bandeira: string;
  numero_ultimos_4: string;
  titular: string;
  validade: string;
  limite: number | null;
  diaFechamento: number | null;
  diaVencimento: number | null;
  contaId: number | null;
};

type BankAccount = {
  id: number;
  banco: string;
  numero_conta: string;
};

interface CreditCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: CreditCard | null;
  accounts: BankAccount[];
  onSuccess: () => void;
}

export function CreditCardDialog({
  open,
  onOpenChange,
  card,
  accounts,
  onSuccess,
}: CreditCardDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isEditing = !!card;

  const [formData, setFormData] = useState<Partial<CreditCard>>(
    card || {
      bandeira: '',
      numero_ultimos_4: '',
      titular: '',
      validade: '',
      limite: null,
      diaFechamento: null,
      diaVencimento: null,
      contaId: null,
    }
  );

  useEffect(() => {
    if (card) {
      setFormData(card);
    } else {
      setFormData({
        bandeira: '',
        numero_ultimos_4: '',
        titular: '',
        validade: '',
        limite: null,
        diaFechamento: null,
        diaVencimento: null,
        contaId: null,
      });
    }
  }, [card]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('cartao_credito')
          .update(formData)
          .eq('id', card.id);

        if (error) throw error;

        toast({
          title: 'Cartão atualizado',
          description: 'O cartão de crédito foi atualizado com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('cartao_credito')
          .insert(formData);

        if (error) throw error;

        toast({
          title: 'Cartão criado',
          description: 'O cartão de crédito foi criado com sucesso.',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar o cartão de crédito.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Editar Cartão' : 'Novo Cartão'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bandeira">Bandeira</Label>
            <Select
              value={formData.bandeira}
              onValueChange={(value) =>
                setFormData({ ...formData, bandeira: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a bandeira" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VISA">Visa</SelectItem>
                <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                <SelectItem value="AMEX">American Express</SelectItem>
                <SelectItem value="ELO">Elo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numero_ultimos_4">Últimos 4 dígitos</Label>
            <Input
              id="numero_ultimos_4"
              value={formData.numero_ultimos_4}
              onChange={(e) =>
                setFormData({ ...formData, numero_ultimos_4: e.target.value })
              }
              maxLength={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="titular">Titular</Label>
            <Input
              id="titular"
              value={formData.titular}
              onChange={(e) =>
                setFormData({ ...formData, titular: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="validade">Validade</Label>
            <Input
              id="validade"
              value={formData.validade}
              onChange={(e) =>
                setFormData({ ...formData, validade: e.target.value })
              }
              placeholder="MM/AA"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limite">Limite</Label>
            <Input
              id="limite"
              type="number"
              step="0.01"
              value={formData.limite || ''}
              onChange={(e) =>
                setFormData({ ...formData, limite: parseFloat(e.target.value) })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diaFechamento">Dia do Fechamento</Label>
              <Input
                id="diaFechamento"
                type="number"
                min="1"
                max="31"
                value={formData.diaFechamento || ''}
                onChange={(e) =>
                  setFormData({ ...formData, diaFechamento: parseInt(e.target.value) })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diaVencimento">Dia do Vencimento</Label>
              <Input
                id="diaVencimento"
                type="number"
                min="1"
                max="31"
                value={formData.diaVencimento || ''}
                onChange={(e) =>
                  setFormData({ ...formData, diaVencimento: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contaId">Conta Vinculada</Label>
            <Select
              value={formData.contaId?.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, contaId: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Nenhuma</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.banco} - {account.numero_conta}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}