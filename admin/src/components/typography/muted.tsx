import clsx from "clsx";

interface TypographyMutedProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
export default function TypographyMuted({
  children,
  className,
  ...props
}: TypographyMutedProps) {
  return (
    <p className={clsx("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
