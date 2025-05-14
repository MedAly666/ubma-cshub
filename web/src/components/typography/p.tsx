import clsx from "clsx";

interface TypographyPProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function TypographyP({
  children,
  className,
  ...props
}: TypographyPProps) {
  return (
    <p className={clsx("text-base lg:text-sm", className)} {...props}>
      {children}
    </p>
  );
}
