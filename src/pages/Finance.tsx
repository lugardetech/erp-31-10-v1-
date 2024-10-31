import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CreditCard, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { BankAccounts } from '@/components/finance/BankAccounts';
import { CreditCards } from '@/components/finance/CreditCards';
import { AccountsPayable } from '@/components/finance/AccountsPayable';
import { AccountsReceivable } from '@/components/finance/AccountsReceivable';
import { formatCurrency } from '@/lib/utils';

export default function Finance() {
  const [totalBalance] = useState(25000);
  const [totalReceivable] = useState(15000);
  const [totalPayable] = useState(8000);
  const [availableCredit] = useState(30000);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Finanças</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo em Contas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total disponível em contas bancárias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite de Crédito</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(availableCredit)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Limite total disponível
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Receber</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalReceivable)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total a receber nos próximos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">A Pagar</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPayable)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total a pagar nos próximos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bank-accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bank-accounts">Contas Bancárias</TabsTrigger>
          <TabsTrigger value="credit-cards">Cartões de Crédito</TabsTrigger>
          <TabsTrigger value="accounts-payable">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="accounts-receivable">Contas a Receber</TabsTrigger>
        </TabsList>

        <TabsContent value="bank-accounts">
          <BankAccounts />
        </TabsContent>

        <TabsContent value="credit-cards">
          <CreditCards />
        </TabsContent>

        <TabsContent value="accounts-payable">
          <AccountsPayable />
        </TabsContent>

        <TabsContent value="accounts-receivable">
          <AccountsReceivable />
        </TabsContent>
      </Tabs>
    </div>
  );
}