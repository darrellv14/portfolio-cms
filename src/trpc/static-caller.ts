import { cache } from "react";
import "server-only";
import { createCaller } from "~/server/api/root";
import { db } from "~/server/db";

const createStaticContext = cache(() => {
  return {
    db: db,
    session: null,
    headers: new Headers({ "x-trpc-source": "rsc-cached" }),
  };
});

export const staticCaller = createCaller(createStaticContext);

import { createQueryClient } from "./query-client";
export const getQueryClient = cache(createQueryClient);
