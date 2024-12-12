import {
  House,
  User,
  School,
  Package,
  Book,
  Calendar,
  ReceiptText,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Item {
  title: string;
  link: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  submenu: boolean;
  children?: Item[];
}
export const items = [
  { title: "Home", link: "/dashboard", icon: House, submenu: false },
  {
    title: "Admins",
    link: "/dashboard/admins",
    submenu: false,
    icon: User,
  },
  {
    title: "Degrees",
    link: "/dashboard/degrees",
    icon: School,
    submenu: false,
  },
  {
    title: "Majors",
    link: "/dashboard/majors",
    icon: Book,
    submenu: false,
  },
  {
    title: "Years",
    link: "/dashboard/years",
    icon: Calendar,
    submenu: false,
  },
  {
    title: "Semesters",
    link: "/dashboard/semesters",
    icon: ReceiptText,
    submenu: false,
  },
  {
    title: "Modules",
    link: "/dashboard/modules",
    icon: Package,
    submenu: false,
  },
  {
    title: "Resources",
    link: "/dashboard/resources",
    icon: Book,
    submenu: false,
  },
];
