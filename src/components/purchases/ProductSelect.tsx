import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Produtos } from '@/types/tables/produtos'

interface ProductSelectProps {
  products: Produtos['Row'][];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ProductSelect({ products = [], selectedId, onSelect }: ProductSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  // Garantir que products é sempre um array
  const safeProducts = React.useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  // Encontrar o produto selecionado
  const selectedProduct = React.useMemo(() => {
    return safeProducts.find(
      (product) => product.id.toString() === selectedId
    );
  }, [safeProducts, selectedId]);

  // Filtrar produtos baseado na busca
  const filteredProducts = React.useMemo(() => {
    if (!searchValue.trim()) return safeProducts;
    
    const searchTerms = searchValue.toLowerCase().split(' ');
    
    return safeProducts.filter((product) => {
      const productName = product.nome.toLowerCase();
      const productSku = product.sku.toLowerCase();
      
      // Verifica se todos os termos da busca estão presentes no nome ou SKU do produto
      return searchTerms.every(term => 
        productName.includes(term) || productSku.includes(term)
      );
    });
  }, [safeProducts, searchValue]);

  // Ordenar produtos por relevância
  const sortedProducts = React.useMemo(() => {
    if (!searchValue.trim()) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const aName = a.nome.toLowerCase();
      const bName = b.nome.toLowerCase();
      const searchTerm = searchValue.toLowerCase();

      // Produtos que começam com o termo de busca vêm primeiro
      const aStartsWith = aName.startsWith(searchTerm);
      const bStartsWith = bName.startsWith(searchTerm);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;

      // Em seguida, ordenar por nome
      return aName.localeCompare(bName);
    });
  }, [filteredProducts, searchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProduct ? (
            <span className="flex items-center gap-2">
              <span className="font-medium">{selectedProduct.nome}</span>
              <span className="text-muted-foreground text-sm">
                (SKU: {selectedProduct.sku})
              </span>
            </span>
          ) : (
            "Selecione um produto..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Buscar por nome ou SKU..." 
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {sortedProducts.length === 0 ? (
              <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
            ) : (
              <CommandGroup>
                {sortedProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    value={product.id.toString()}
                    onSelect={(currentValue) => {
                      onSelect(currentValue)
                      setOpen(false)
                      setSearchValue("")
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedId === product.id.toString() ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="font-medium">{product.nome}</span>
                      </div>
                      <span className="text-muted-foreground text-sm ml-6">
                        SKU: {product.sku} {product.estoque !== null && `| Estoque: ${product.estoque}`}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}