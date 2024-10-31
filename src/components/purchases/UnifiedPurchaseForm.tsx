import { useState, useEffect } from 'react'
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { Produtos } from '@/types/tables/produtos'
import { Fornecedores } from '@/types/tables/fornecedores'
import { CartaoCredito } from '@/types/tables/cartao-credito'
import { ContasBancarias } from '@/types/tables/contas-bancarias'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PurchaseFormHeader } from './PurchaseFormHeader'
import { PaymentMethodSection } from './PaymentMethodSection'
import { PurchaseItemsSection } from './PurchaseItemsSection'
import { PurchaseFormFooter } from './PurchaseFormFooter'

interface PurchaseFormItem {
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
}

interface UnifiedPurchaseFormProps {
  suppliers?: Fornecedores['Row'][] | null;
  products?: Produtos['Row'][] | null;
  onSubmit: (data: {
    data: string;
    fornecedor_id: string;
    payment_source: 'card' | 'account';
    payment_id: string;
    imposto_nacional?: number;
    outros_gastos?: number;
    observacoes?: string;
    items: PurchaseFormItem[];
  }) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export function UnifiedPurchaseForm({ 
  suppliers = [], 
  products = [], 
  onSubmit, 
  isLoading, 
  onCancel 
}: UnifiedPurchaseFormProps) {
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    fornecedor_id: '',
    metodo_pagamento: '',
    payment_source: '' as 'card' | 'account' | '',
    payment_id: '',
    imposto_nacional: 0,
    outros_gastos: 0,
    observacoes: '',
  });

  const [items, setItems] = useState<PurchaseFormItem[]>([]);
  const [newItem, setNewItem] = useState<PurchaseFormItem>({
    produto_id: '',
    quantidade: 1,
    preco_unitario: 0,
  });

  const [creditCards, setCreditCards] = useState<CartaoCredito['Row'][]>([]);
  const [bankAccounts, setBankAccounts] = useState<ContasBancarias['Row'][]>([]);
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  async function fetchPaymentMethods() {
    setIsLoadingPaymentMethods(true);
    setError(null);
    try {
      const [cardsResponse, accountsResponse] = await Promise.all([
        supabase.from('cartao_credito').select('*').order('bandeira'),
        supabase.from('contas_bancarias').select('*').order('banco')
      ]);

      if (cardsResponse.error) throw cardsResponse.error;
      if (accountsResponse.error) throw accountsResponse.error;

      setCreditCards(cardsResponse.data || []);
      setBankAccounts(accountsResponse.data || []);
    } catch (error) {
      console.error('Erro ao buscar métodos de pagamento:', error);
      setError('Não foi possível carregar os métodos de pagamento. Por favor, tente novamente.');
    } finally {
      setIsLoadingPaymentMethods(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.payment_source !== 'card' && formData.payment_source !== 'account') {
      return;
    }
    
    onSubmit({
      data: formData.data,
      fornecedor_id: formData.fornecedor_id,
      payment_source: formData.payment_source,
      payment_id: formData.payment_id,
      imposto_nacional: formData.imposto_nacional,
      outros_gastos: formData.outros_gastos,
      observacoes: formData.observacoes,
      items
    });
  };

  const addItem = () => {
    if (newItem.produto_id && newItem.quantidade > 0 && newItem.preco_unitario > 0) {
      setItems([...items, newItem]);
      setNewItem({ produto_id: '', quantidade: 1, preco_unitario: 0 });
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantidade * item.preco_unitario, 0) +
      formData.imposto_nacional + formData.outros_gastos;
  };

  const isFormValid = () => {
    return (
      formData.fornecedor_id &&
      formData.payment_source &&
      formData.payment_id &&
      items.length > 0
    );
  };

  // Garantir que as props são arrays válidos
  const safeSuppliers = suppliers ?? [];
  const safeProducts = products ?? [];

  if (!safeSuppliers.length || !safeProducts.length) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>Erro ao carregar dados necessários para o formulário.</AlertDescription>
      </Alert>
    );
  }

  const handlePaymentSourceChange = (source: 'card' | 'account') => {
    setFormData({
      ...formData,
      payment_source: source,
      payment_id: '',
      metodo_pagamento: source === 'card' ? 'cartao' : 'conta_corrente'
    });
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <PurchaseFormHeader
          date={formData.data}
          supplierId={formData.fornecedor_id}
          suppliers={safeSuppliers}
          onDateChange={(date) => setFormData({ ...formData, data: date })}
          onSupplierChange={(id) => setFormData({ ...formData, fornecedor_id: id })}
        />

        <PaymentMethodSection
          paymentSource={formData.payment_source}
          paymentId={formData.payment_id}
          creditCards={creditCards}
          bankAccounts={bankAccounts}
          isLoading={isLoadingPaymentMethods}
          onPaymentSourceChange={handlePaymentSourceChange}
          onPaymentIdChange={(id) => setFormData({ ...formData, payment_id: id })}
        />

        <PurchaseItemsSection
          products={safeProducts}
          items={items}
          newItem={newItem}
          onNewItemChange={setNewItem}
          onAddItem={addItem}
          onRemoveItem={removeItem}
        />

        <PurchaseFormFooter
          impostoNacional={formData.imposto_nacional}
          outrosGastos={formData.outros_gastos}
          observacoes={formData.observacoes}
          total={calculateTotal()}
          isLoading={isLoading}
          onImpostoChange={(value) => setFormData({ ...formData, imposto_nacional: value })}
          onGastosChange={(value) => setFormData({ ...formData, outros_gastos: value })}
          onObservacoesChange={(value) => setFormData({ ...formData, observacoes: value })}
          onCancel={onCancel}
          isSubmitDisabled={!isFormValid()}
        />
      </form>
    </ErrorBoundary>
  );
}