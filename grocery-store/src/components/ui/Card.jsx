/**
 * Reusable Card Component
 * 
 * Usage:
 * <Card>Content here</Card>
 * <Card variant="elevated" padding="lg">Content</Card>
 * <Card hoverable>Hoverable card</Card>
 */

export default function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
}) {
  // Variant styles
  const variants = {
    default: "bg-white shadow-md",
    elevated: "bg-white shadow-lg",
    flat: "bg-white border border-[#E5E5E5]",
    outlined: "bg-transparent border-2 border-[#E5E5E5]",
    colored: "bg-gradient-to-br from-[#4CAF50] to-[#45a049] text-white shadow-lg",
  };

  // Padding styles
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  // Hover effect
  const hoverStyle = hoverable ? "hover:shadow-xl transition" : "";

  return (
    <div
      className={`
        rounded-xl
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyle}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Card Header Component
export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

// Card Title Component
export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-2xl font-bold text-[#333333] ${className}`}>
      {children}
    </h2>
  );
}

// Card Description Component
export function CardDescription({ children, className = "" }) {
  return (
    <p className={`text-gray-600 mt-2 ${className}`}>
      {children}
    </p>
  );
}

// Card Body Component
export function CardBody({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card Footer Component
export function CardFooter({ children, className = "" }) {
  return (
    <div className={`mt-6 pt-6 border-t border-[#E5E5E5] ${className}`}>
      {children}
    </div>
  );
}
