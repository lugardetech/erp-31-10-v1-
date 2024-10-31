import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/theme";

interface StatusBadgeProps {
  status: string;
  tipo?: string;
}

export function StatusBadge({ status, tipo }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      style={{
        backgroundColor: getStatusColor(status),
        color: "white",
      }}
    >
      {status}
    </Badge>
  );
} 