import { cn } from "@/app/lib/utils"; 
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariants = "primary" | "secondary" | "danger" | "outline";
type ButtonSizes = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    isLoading = false,
    className,
    ...rest
  } = props;

  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const content = (
    <>
      {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : leftIcon}
      {children}
      {rightIcon}
    </>
  );

  
  if ("href" in props) {
    const { href, external, ...anchorProps } = rest as ButtonAsLink;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          {...anchorProps}>
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        { [disabledStyles]: disabled || isLoading },
        className
      )}
      disabled={disabled || isLoading}
      {...buttonProps}>
      {content}
    </button>
  );
};

export default Button;
