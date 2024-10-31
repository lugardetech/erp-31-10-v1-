import { Database } from '@/lib/database.types';

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
export type Functions<T extends keyof Database['public']['Functions']> = Database['public']['Functions'][T];

// Commonly used types
export type Product = Tables<'produtos'>;
export type Supplier = Tables<'fornecedores'>;
export type CreditCard = Tables<'cartao_credito'>;
export type BankAccount = Tables<'contas_bancarias'>;
export type Purchase = Tables<'compras'>;
export type PurchaseItem = Tables<'itens_compras'>;