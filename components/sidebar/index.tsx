import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import Link  from "next/link"

export function AppSidebar() {
  return (
    
    <Sidebar className="text-center" >

      <SidebarHeader className="text-violet-500 mt-5">
        <h1>タイトル</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton>
            <Link href="/setting">設定</Link>
            
            
          </SidebarMenuButton>


        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}