import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getSessionFromRequest } from "./sdk";
import type { SessionPayload } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: SessionPayload | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  const user = await getSessionFromRequest(opts.req);

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
