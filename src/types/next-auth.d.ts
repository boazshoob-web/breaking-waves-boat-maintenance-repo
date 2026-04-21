import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      role: 'superAdmin' | 'user';
      isSuperAdmin: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    role: 'superAdmin' | 'user';
    isSuperAdmin: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'superAdmin' | 'user';
    isSuperAdmin: boolean;
  }
}
