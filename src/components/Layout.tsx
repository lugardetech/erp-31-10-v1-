import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Globe,
  Box,
  DollarSign,
  RotateCcw,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  ChevronDown,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: 'VISÃO GERAL',
    items: [
      { path: '/', label: 'Painel', icon: LayoutDashboard },
      { path: '/products', label: 'Produtos', icon: Package },
      { path: '/customers', label: 'Clientes', icon: Users },
      { path: '/sales', label: 'Pedidos de Venda', icon: ShoppingCart },
      { path: '/purchases', label: 'Ordens de Compra', icon: ShoppingBag },
      { path: '/analytics', label: 'Análises', icon: ChevronDown },
    ],
  },
  {
    title: 'MARKETPLACES',
    items: [
      { path: '/marketplace', label: 'Mercado Livre', icon: Globe },
    ],
  },
  {
    title: 'GESTÃO',
    items: [
      { path: '/suppliers', label: 'Fornecedores', icon: Users },
      { path: '/inventory', label: 'Estoque', icon: Box },
      { path: '/finance', label: 'Finanças', icon: DollarSign },
    ],
  },
  {
    title: 'ATENDIMENTO AO CLIENTE',
    items: [
      { path: '/complaints', label: 'Reclamações', icon: RotateCcw },
      { path: '/returns', label: 'Devoluções', icon: RotateCcw },
    ],
  },
  {
    title: 'CONTA',
    items: [
      { path: '/settings', label: 'Configurações', icon: Settings },
      { path: '/help', label: 'Ajuda', icon: HelpCircle },
      { path: '/logout', label: 'Sair', icon: LogOut },
    ],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [currentDate] = useState('27 de agosto');
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r">
        <div className="flex h-full w-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <span className="text-lg font-semibold">Admin Dashboard</span>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-6 p-4">
              {menuItems.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground tracking-wider">
                    {section.title}
                  </h4>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                          location.pathname === item.path
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <div className="pl-64 w-full">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-14 items-center justify-between px-6">
            <h1 className="text-2xl font-semibold">Painel</h1>
            <div className="flex items-center gap-4">
              <Select defaultValue={currentDate}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={currentDate} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentDate}>{currentDate}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}