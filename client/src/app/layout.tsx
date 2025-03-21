import { ThemeProvider } from "./shared/theme/ThemeProvider";
import ThemeToggle from "./shared/theme/ThemeToggle";
import ThemeWrapper from "./shared/theme/ThemeWrapper";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            <ThemeToggle />
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
