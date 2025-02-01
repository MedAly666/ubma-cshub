import clsx from "clsx";

interface TypographyH4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
export default function TypographyH4({
  children,
  className,
  ...props
}: TypographyH4Props) {
  return (
    <h4
      className={clsx(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
