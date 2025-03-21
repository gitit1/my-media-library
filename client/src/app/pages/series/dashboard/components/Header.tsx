'use client';

import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";
import Typography from "@/app/shared/components/Typography";
import ThemeToggle from "@/app/shared/theme/ThemeToggle";
import { Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800">
      <Typography type="h1">My Media Dashboard</Typography>
      
      <div className="flex items-center gap-4">
        <Input placeholder="Search Series..." />
        <Button icon={<Settings />} href="/pages/settings" />
        <ThemeToggle />
      </div>
    </header>
  );
}
