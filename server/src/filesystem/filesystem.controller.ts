import { Controller, Get, Query } from '@nestjs/common';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Controller('filesystem')
export class FilesystemController {
  // ...existing /folders route...

  @Get('drives')
  getDrives(): string[] {
    try {
      const stdout = execSync('wmic logicaldisk get name', {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      });

      const lines = stdout
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^[A-Z]:$/i.test(line)); // keep lines like "C:"

      const drives = lines.map((drive) => {
        const normalized = drive.endsWith('\\') ? drive : `${drive}\\`;
        return normalized;
      });

      return drives;
    } catch (error) {
      console.error('Failed to list drives:', error);
      return ['C:\\']; // fallback
    }
  }

  @Get('folders')
  getFolders(@Query('base') basePath: string): string[] {
    try {
      const contents = fs.readdirSync(basePath, { withFileTypes: true });
      const folders = contents
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(basePath, entry.name));
      return folders;
    } catch (err) {
      console.error(`Failed to list folders in ${basePath}:`, err);
      return [];
    }
  }
}
