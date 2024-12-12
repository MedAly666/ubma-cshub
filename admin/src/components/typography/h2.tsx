import clsx from "clsx";

interface TypographyH2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export default function TypographyH2({
  children,
  className,
  ...props
}: TypographyH2Props) {
  return (
    <h1
      className={clsx("text-3xl font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
