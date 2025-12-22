/**
 * Reusable Badge Component
 * 
 * Usage:
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" size="lg">Pending</Badge>
 * <Badge variant="danger" icon="❌">Cancelled</Badge>
 */

export default function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
}) {
  // Variant styles
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-[#4CAF50] text-white",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    orange: "bg-orange-100 text-orange-800",
    dark: "bg-gray-800 text-white",
  };

  // Size styles
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        rounded-full font-semibold
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

// Status Badge Component (for order/product statuses)
export function StatusBadge({ status, className = "" }) {
  const statusConfig = {
    active: { variant: "success", icon: "✓", label: "Active" },
    inactive: { variant: "default", icon: "●", label: "Inactive" },
    pending: { variant: "warning", icon: "⏳", label: "Pending" },
    processing: { variant: "warning", icon: "⚙️", label: "Processing" },
    shipped: { variant: "info", icon: "🚚", label: "Shipped" },
    delivered: { variant: "success", icon: "✅", label: "Delivered" },
    cancelled: { variant: "danger", icon: "❌", label: "Cancelled" },
    "low stock": { variant: "warning", icon: "⚠️", label: "Low Stock" },
    "out of stock": { variant: "danger", icon: "🚫", label: "Out of Stock" },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.active;

  return (
    <Badge variant={config.variant} icon={config.icon} className={className}>
      {config.label}
    </Badge>
  );
}

// Count Badge (for notifications, cart items, etc.)
export function CountBadge({ count, variant = "danger", max = 99, className = "" }) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        min-w-[1.5rem] h-6 px-2
        rounded-full font-bold text-xs
        ${variant === "danger" ? "bg-red-500 text-white" : ""}
        ${variant === "primary" ? "bg-[#4CAF50] text-white" : ""}
        ${variant === "info" ? "bg-blue-500 text-white" : ""}
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
}

// Dot Badge (small indicator)
export function DotBadge({ variant = "success", className = "" }) {
  const variants = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    default: "bg-gray-500",
  };

  return (
    <span
      className={`
        inline-block w-2 h-2 rounded-full
        ${variants[variant]}
        ${className}
      `}
    />
  );
}