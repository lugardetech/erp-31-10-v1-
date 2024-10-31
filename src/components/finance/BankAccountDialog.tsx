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

type BankAccount = {
  id: number;
  banco: string;
  numero_conta: string;
  tipo_conta: string;
  moeda: string | null;
};

interface BankAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: BankAccount | null;
  onSuccess: () => void;
}

export function BankAccountDialog({
  open,
  onOpenChange,
  account,
  onSuccess,
}: BankAccountDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isEditing = !!account;

  const [formData, setFormData] = useState<Partial<BankAccount>>(
    account || {
      banco: '',
      numero_conta: '',
      tipo_conta: 'corrente',
      moeda: 'BRL',
    }
  );

  useEffect(() => {
    if (account) {
      setFormData(account);
    } else {
      setFormData({
        banco: '',
        numero_conta: '',
        tipo_conta: 'corrente',
        moeda: 'BRL',
      });
    }
  }, [account]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('contas_bancarias')
          .update(formData)
          .eq('id', account.id);

        if (error) throw error;

        toast({
          title: 'Conta atualizada',
          description: 'A conta bancária foi atualizada com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('contas_bancarias')
          .insert(formData);

        if (error) throw error;

        toast({
          title: 'Conta criada',
          description: 'A conta bancária foi criada com sucesso.',
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar a conta bancária.',
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
            {isEditing ? 'Editar Conta' : 'Nova Conta'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="banco">Banco</Label>
            <Input
              id="banco"
              value={formData.banco}
              onChange={(e) =>
                setFormData({ ...formData, banco: e.target.value })
              }
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="numero_conta">Número da Conta</Label>
            <Input
              id="numero_conta"
              value={formData.numero_conta}
              onChange={(e) =>
                setFormData({ ...formData, numero_conta: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_conta">Tipo de Conta</Label>
            <Select
              value={formData.tipo_conta}
              onValueChange={(value) =>
                setFormData({ ...formData, tipo_conta: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corrente">Conta Corrente</SelectItem>
                <SelectItem value="poupanca">Conta Poupança</SelectItem>
                <SelectItem value="investimento">Conta Investimento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moeda">Moeda</Label>
            <Select
              value={formData.moeda || 'BRL'}
              onValueChange={(value) =>
                setFormData({ ...formData, moeda: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a moeda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BRL">Real (BRL)</SelectItem>
                <SelectItem value="USD">Dólar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
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