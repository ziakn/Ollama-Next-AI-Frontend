import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Helper: safely handle BigInt values
function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) {
      return Response.json(
        { success: false, message: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: { name, email, password: hashed },
    });

    // Serialize to handle BigInt fields
    const safeUser = serializeBigInt(user);

    return Response.json({
      success: true,
      message: 'User registered successfully',
      user: safeUser,
    });
  } catch (e) {
    console.error('Registration error:', e);
    return Response.json(
      { success: false, message: 'Server error', error: e.message },
      { status: 500 }
    );
  }
}
