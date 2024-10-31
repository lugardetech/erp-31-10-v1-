export const theme = {
  colors: {
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))",
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))",
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))",
    },
  },
  status: {
    pending: "#FFA500",
    processing: "#2196F3",
    approved: "#4CAF50",
    cancelled: "#FF0000",
    shipped: "#2196F3",
    delivered: "#4CAF50",
    returned: "#FF0000",
  }
};

export const getStatusColor = (status: string) => {
  const statusColors: Record<string, string> = {
    pendente: theme.status.pending,
    "em processamento": theme.status.processing,
    aprovado: theme.status.approved,
    cancelado: theme.status.cancelled,
    "aguardando envio": theme.status.pending,
    "em trânsito": theme.status.shipped,
    entregue: theme.status.delivered,
    extraviado: theme.status.returned,
  };

  return statusColors[status.toLowerCase()] || "#666666";
}; 