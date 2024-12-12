import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { items, Item } from "./sidebar-data";
import TypographyH2 from "@/components/typography/h2";
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from "@/components/ui/collapsible";

export default function DashboardSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 justify-center">
        <TypographyH2 className="text-2xl lg:text-3xl">Ubma-Cshub</TypographyH2>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return item.submenu ? (
                  <SidebarItemWithMenu item={item} key={item.title} />
                ) : (
                  <SidebarItem item={item} key={item.title} />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

interface SidebarItemWithMenuProps {
  item: Item;
}
function SidebarItemWithMenu({ item }: SidebarItemWithMenuProps) {
  return (
    <Collapsible>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((item) => {
              return (
                <SidebarMenuSubItem key={item.title}>
                  <SidebarMenuSubButton asChild>
                    <a href={item.link}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
            <SidebarMenuSubItem />
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
interface SidebarItemProps {
  item: Item;
}
function SidebarItem({ item }: SidebarItemProps) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.link}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
