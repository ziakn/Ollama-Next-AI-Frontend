import { PrismaClient } from '@/generated/prisma';
import { hasRole } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req) {
  const auth = req.headers.get('authorization');
  if (!auth) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const token = auth.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const allowed = await hasRole(decoded.id, 'admin');

  if (!allowed)
    return Response.json({ error: 'Forbidden' }, { status: 403 });

  const articles = await prisma.articles.findMany({
    include: { users: true, categories: true },
  });

  return Response.json(articles);
}
