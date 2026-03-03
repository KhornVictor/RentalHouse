/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { ConsoleMessageSuccess } from '../../common/messages/consoleMessage';
import { User } from 'src/interfaces/user.type';

async function loadUsersFromJson(): Promise<User[]> {
  const baseDir = process.cwd();
  const candidates = [
    path.resolve(baseDir, 'src', 'database', 'json', 'users.json'),
    path.resolve(baseDir, 'prisma', 'json', 'users.json'),
  ];

  let fileContent: string | undefined;

  for (const filePath of candidates) {
    try {
      fileContent = await readFile(filePath, 'utf-8');
      break;
    } catch {
      // try next candidate
    }
  }

  if (!fileContent) {
    throw new Error(`users.json not found. Checked: ${candidates.join(', ')}`);
  }

  return JSON.parse(fileContent) as User[];
}

export async function seedUsers(prisma: PrismaClient): Promise<void> {
  const users = await loadUsersFromJson();

  for (const user of users) {
    const password = user.password ?? '123456';

    await prisma.user.upsert({
      where: { username: user.username },
      update: {
        firstname: user.firstname,
        lastname: user.lastname,
        password,
        role: user.role,
        phonenumber: user.phonenumber,
        avatar: user.avatar,
        email: user.email,
        status: user.status,
      },
      create: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password,
        role: user.role,
        phonenumber: user.phonenumber,
        avatar: user.avatar,
        email: user.email,
        status: user.status,
      },
    });
  }

  ConsoleMessageSuccess(`Successfully Seeded ${users.length} users.`);
}
