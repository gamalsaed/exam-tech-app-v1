import React from "react";
import Header from "@/components/layout/dashboard/header";
import SideBar from "@/components/layout/dashboard/sidebar";
import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <SidebarProvider>
        <SideBar />
        <main className="flex-grow  w-full">
          <Header />
          <Suspense
            fallback={<Spinner className="size-8 w-full flex justify-center" />}
          >
            <div className="bg-gray-50 p-6">
              <div className="">{children}</div>
            </div>
          </Suspense>
        </main>
      </SidebarProvider>
    </div>
  );
}
