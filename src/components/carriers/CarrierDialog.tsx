import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { DataCard } from "@/components/ui/data-card";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CarrierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface Carrier {
  id: number;
  nome: string;
}

export function CarrierDialog({
  open,
  onOpenChange,
  onSuccess
}: CarrierDialogProps) {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [newCarrier, setNewCarrier] = useState("");
  const [editingCarrier, setEditingCarrier] = useState<Carrier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCarrier, setDeleteCarrier] = useState<Carrier | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchCarriers();
    }
  }, [open]);

  const fetchCarriers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('transportadoras')
        .select('*')
        .order('nome');

      if (error) throw error;
      setCarriers(data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar transportadoras",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCarrier = async () => {
    try {
      const { data, error } = await supabase
        .from('transportadoras')
        .insert([{ nome: newCarrier }])
        .select();

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Transportadora adicionada com sucesso",
      });

      setNewCarrier("");
      fetchCarriers();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao adicionar transportadora",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCarrier = async () => {
    if (!editingCarrier) return;

    try {
      const { error } = await supabase
        .from('transportadoras')
        .update({ nome: editingCarrier.nome })
        .eq('id', editingCarrier.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Transportadora atualizada com sucesso",
      });

      setEditingCarrier(null);
      fetchCarriers();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar transportadora",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCarrier = async () => {
    if (!deleteCarrier) return;

    try {
      const { error } = await supabase
        .from('transportadoras')
        .delete()
        .eq('id', deleteCarrier.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Transportadora removida com sucesso",
      });

      setDeleteCarrier(null);
      fetchCarriers();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao remover transportadora",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerenciar Transportadoras</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="new-carrier">Nova Transportadora</Label>
                <Input
                  id="new-carrier"
                  value={newCarrier}
                  onChange={(e) => setNewCarrier(e.target.value)}
                  placeholder="Nome da transportadora"
                />
              </div>
              <Button
                onClick={handleAddCarrier}
                disabled={!newCarrier || isLoading}
                className="mt-8"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </div>

            <DataCard title="Transportadoras Cadastradas">
              <div className="space-y-2">
                {carriers.map((carrier) => (
                  <div
                    key={carrier.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-muted/50 rounded-md"
                  >
                    {editingCarrier?.id === carrier.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editingCarrier.nome}
                          onChange={(e) =>
                            setEditingCarrier({
                              ...editingCarrier,
                              nome: e.target.value,
                            })
                          }
                        />
                        <Button
                          size="sm"
                          onClick={handleUpdateCarrier}
                          disabled={!editingCarrier.nome}
                        >
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingCarrier(null)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span>{carrier.nome}</span>
                        <div className="space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingCarrier(carrier)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteCarrier(carrier)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </DataCard>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteCarrier}
        onOpenChange={(open) => !open && setDeleteCarrier(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a transportadora "{deleteCarrier?.nome}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCarrier}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 