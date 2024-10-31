import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

interface Carrier {
  id: number;
  nome: string;
}

interface CarrierSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  onEdit: () => void;
  className?: string;
}

export function CarrierSelect({
  value,
  onValueChange,
  onEdit,
  className
}: CarrierSelectProps) {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCarriers() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('transportadoras')
          .select('id, nome')
          .order('nome');

        if (error) throw error;
        setCarriers(data || []);
      } catch (error) {
        console.error('Erro ao carregar transportadoras:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCarriers();
  }, []);

  return (
    <div className="flex gap-2">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={isLoading}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder="Selecione a transportadora" />
        </SelectTrigger>
        <SelectContent>
          {carriers.map((carrier) => (
            <SelectItem key={carrier.id} value={carrier.id.toString()}>
              {carrier.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={onEdit}
        type="button"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
} 