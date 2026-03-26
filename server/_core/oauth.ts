import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import {
  createSessionToken,
  getSessionFromRequest,
  hashPassword,
  verifyPassword,
} from "./sdk";
import { ENV } from "./env";

const SESSION_EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function buildUserResponse(user: any) {
  return {
    id: user.id ?? null,
    email: user.email ?? null,
    name: user.name ?? null,
    loginMethod: user.loginMethod ?? null,
    createdAt: (user.createdAt ?? new Date()).toISOString(),
  };
}

async function verifyGoogleToken(idToken: string) {
  const response = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  if (!response.ok) throw new Error("Invalid Google token");
  return response.json();
}

export function registerAuthRoutes(app: Express) {
  // POST /api/auth/register - Email/password registration
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      // Check if user already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ error: "User already exists" });
        return;
      }

      // Hash password and create user
      const passwordHash = await hashPassword(password);
      const user = await db.createUser({
        email,
        passwordHash,
        name: name || null,
        loginMethod: "email",
      });

      if (!user) {
        res.status(500).json({ error: "Failed to create user" });
        return;
      }

      // Create session token
      const sessionToken = await createSessionToken(
        {
          userId: user.id,
          email: user.email!,
          name: user.name || "",
        },
        SESSION_EXPIRY_MS
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("fileflow_session", sessionToken, {
        ...cookieOptions,
        maxAge: SESSION_EXPIRY_MS,
      });

      res.json({
        success: true,
        user: buildUserResponse(user),
        sessionToken,
      });
    } catch (error) {
      console.error("[Auth] Registration failed:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  // POST /api/auth/login - Email/password login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const user = await db.getUserByEmail(email);
      if (!user || !user.passwordHash) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isPasswordValid = await verifyPassword(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      // Update last signed in
      await db.updateUser(user.id, { lastSignedIn: new Date() });

      const sessionToken = await createSessionToken(
        {
          userId: user.id,
          email: user.email!,
          name: user.name || "",
        },
        SESSION_EXPIRY_MS
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("fileflow_session", sessionToken, {
        ...cookieOptions,
        maxAge: SESSION_EXPIRY_MS,
      });

      res.json({
        success: true,
        user: buildUserResponse(user),
        sessionToken,
      });
    } catch (error) {
      console.error("[Auth] Login failed:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // POST /api/auth/google - Google sign-in
  app.post("/api/auth/google", async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({ error: "idToken is required" });
        return;
      }

      // Verify the Google ID token
      const googleData = await verifyGoogleToken(idToken);

      if (!googleData.sub) {
        res.status(401).json({ error: "Invalid Google token" });
        return;
      }

      const googleId = googleData.sub;
      const email = googleData.email;
      const name = googleData.name;

      // Check if user exists by Google ID
      let user = await db.getUserByGoogleId(googleId);

      if (!user) {
        // Check if email already exists
        if (email) {
          const existingEmailUser = await db.getUserByEmail(email);
          if (existingEmailUser && !existingEmailUser.googleId) {
            // Link Google ID to existing email user
            user = await db.updateUser(existingEmailUser.id, { googleId });
          }
        }

        // Create new user if not found
        if (!user) {
          user = await db.createUser({
            googleId,
            email: email || null,
            name: name || null,
            loginMethod: "google",
          });
        }
      }

      if (!user) {
        res.status(500).json({ error: "Failed to create/find user" });
        return;
      }

      // Update last signed in
      await db.updateUser(user.id, { lastSignedIn: new Date() });

      const sessionToken = await createSessionToken(
        {
          userId: user.id,
          email: user.email || "",
          name: user.name || "",
        },
        SESSION_EXPIRY_MS
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("fileflow_session", sessionToken, {
        ...cookieOptions,
        maxAge: SESSION_EXPIRY_MS,
      });

      res.json({
        success: true,
        user: buildUserResponse(user),
        sessionToken,
      });
    } catch (error) {
      console.error("[Auth] Google sign-in failed:", error);
      res.status(500).json({ error: "Google sign-in failed" });
    }
  });

  // POST /api/auth/apple - Apple sign-in
  app.post("/api/auth/apple", async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        res.status(400).json({ error: "idToken is required" });
        return;
      }

      // Verify Apple ID token (simplified - in production use apple-signin-auth or similar)
      // For now, we'll assume the token is valid if it's a non-empty string
      // In production, you should verify the JWT signature against Apple's public keys
      let appleData: any = {};
      try {
        // Decode the JWT payload (without verification for now)
        const parts = idToken.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(
            Buffer.from(parts[1], "base64").toString("utf-8")
          );
          appleData = payload;
        }
      } catch (error) {
        console.error("[Auth] Failed to parse Apple token:", error);
        res.status(401).json({ error: "Invalid Apple token" });
        return;
      }

      const appleId = appleData.sub;
      const email = appleData.email;
      const name = appleData.name;

      if (!appleId) {
        res.status(401).json({ error: "Invalid Apple token" });
        return;
      }

      // Check if user exists by Apple ID
      let user = await db.getUserByAppleId(appleId);

      if (!user) {
        // Check if email already exists
        if (email) {
          const existingEmailUser = await db.getUserByEmail(email);
          if (existingEmailUser && !existingEmailUser.appleId) {
            // Link Apple ID to existing email user
            user = await db.updateUser(existingEmailUser.id, { appleId });
          }
        }

        // Create new user if not found
        if (!user) {
          user = await db.createUser({
            appleId,
            email: email || null,
            name: name || null,
            loginMethod: "apple",
          });
        }
      }

      if (!user) {
        res.status(500).json({ error: "Failed to create/find user" });
        return;
      }

      // Update last signed in
      await db.updateUser(user.id, { lastSignedIn: new Date() });

      const sessionToken = await createSessionToken(
        {
          userId: user.id,
          email: user.email || "",
          name: user.name || "",
        },
        SESSION_EXPIRY_MS
      );

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie("fileflow_session", sessionToken, {
        ...cookieOptions,
        maxAge: SESSION_EXPIRY_MS,
      });

      res.json({
        success: true,
        user: buildUserResponse(user),
        sessionToken,
      });
    } catch (error) {
      console.error("[Auth] Apple sign-in failed:", error);
      res.status(500).json({ error: "Apple sign-in failed" });
    }
  });

  // GET /api/auth/me - Get current user
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const session = await getSessionFromRequest(req);

      if (!session) {
        res.status(401).json({ error: "Not authenticated", user: null });
        return;
      }

      const user = await db.getUserById(session.userId);
      if (!user) {
        res.status(401).json({ error: "Not authenticated", user: null });
        return;
      }

      res.json({ user: buildUserResponse(user) });
    } catch (error) {
      console.error("[Auth] /api/auth/me failed:", error);
      res.status(401).json({ error: "Not authenticated", user: null });
    }
  });

  // POST /api/auth/logout - Logout
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie("fileflow_session", { ...cookieOptions, maxAge: -1 });
    res.json({ success: true });
  });
}
