import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Helper function to safely serialize BigInt fields
function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Find user
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return Response.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 2️⃣ Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 3️⃣ Generate JWT
    const token = jwt.sign(
      { id: user.id.toString(), email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4️⃣ Clean user object for response
    const safeUser = serializeBigInt(user);
    delete safeUser.password; // never expose password

    return Response.json({
      success: true,
      message: 'Login successful',
      token,
      user: safeUser,
    });
  } catch (e) {
    console.error('Login error:', e);
    return Response.json(
      { success: false, message: 'Server error', error: e.message },
      { status: 500 }
    );
  }
}
