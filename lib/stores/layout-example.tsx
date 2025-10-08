/**
 * Example of how to integrate the new Zustand stores into the existing layout
 * This shows a gradual migration approach where both old and new systems coexist
 */

import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Old providers (keep during migration)
import { ToolsProvider } from '@/lib/tools-context';
import { ActivityProvider } from '@/lib/activity-tracker';

// New Zustand store provider
import { StoreProvider } from '@/lib/stores';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: 'astrah - Utility Tools Suite',
  description: 'A collection of helpful utility tools for developers and creators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={workSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* New Zustand store provider */}
          <StoreProvider>
            {/* Keep old providers during migration for backward compatibility */}
            <ToolsProvider>
              <ActivityProvider>
                <div className="min-h-screen flex flex-col">
                  <Navigation />
                  <main className="container mx-auto px-4 py-8 animate-in flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
                <Toaster />
              </ActivityProvider>
            </ToolsProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

/**
 * Alternative: Full migration layout (use this after all components are updated)
 */
export function NewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={workSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Only the new Zustand store provider */}
          <StoreProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="container mx-auto px-4 py-8 animate-in flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}