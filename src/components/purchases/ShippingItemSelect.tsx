import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface ShippingItem {
  id: number;
  quantidade: number;
  produto: {
    nome: string;
    sku: string;
  } | null;
}

interface SelectedItem {
  id: number;
  quantidade: number;
}

interface ShippingItemSelectProps {
  items: ShippingItem[];
  selectedItems: SelectedItem[];
  onSelectItems: (items: SelectedItem[]) => void;
}

export function ShippingItemSelect({
  items = [],
  selectedItems = [],
  onSelectItems,
}: ShippingItemSelectProps) {
  const [open, setOpen] = React.useState(false)

  const safeItems = React.useMemo(() => Array.isArray(items) ? items : [], [items]);
  const safeSelectedItems = React.useMemo(() => Array.isArray(selectedItems) ? selectedItems : [], [selectedItems]);

  const selectedItemsDetails = React.useMemo(() => 
    safeItems.filter(item => safeSelectedItems.some(selected => selected.id === item.id))
  , [safeItems, safeSelectedItems]);

  const handleQuantityChange = (itemId: number, quantidade: number) => {
    const newSelectedItems = safeSelectedItems.map(item => 
      item.id === itemId ? { ...item, quantidade } : item
    );
    onSelectItems(newSelectedItems);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedItemsDetails.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedItemsDetails.map((item) => {
                const selectedItem = safeSelectedItems.find(si => si.id === item.id);
                return (
                  <Badge
                    key={item.id}
                    variant="secondary"
                  >
                    {item.produto?.nome} ({selectedItem?.quantidade || 1} un.)
                  </Badge>
                );
              })}
            </div>
          ) : (
            "Selecione os itens..."
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Buscar item..." />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {safeItems.map((item) => {
                const isSelected = safeSelectedItems.some(si => si.id === item.id);
                const selectedItem = safeSelectedItems.find(si => si.id === item.id);
                
                return (
                  <CommandItem
                    key={item.id}
                    value={item.id.toString()}
                    onSelect={() => {
                      if (isSelected) {
                        onSelectItems(safeSelectedItems.filter(si => si.id !== item.id));
                      } else {
                        onSelectItems([...safeSelectedItems, { id: item.id, quantidade: 1 }]);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{item.produto?.nome}</span>
                          <span className="text-sm text-muted-foreground">
                            SKU: {item.produto?.sku} | Disponível: {item.quantidade}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Input
                          type="number"
                          min="1"
                          max={item.quantidade}
                          value={selectedItem?.quantidade || 1}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-20"
                        />
                      )}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 