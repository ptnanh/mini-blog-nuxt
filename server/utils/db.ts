import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../database/schema";

// Pool = nhóm kết nối được tái sử dụng, không mở kết nối mới cho mỗi request
let pool: Pool | undefined;

export function useDb() {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Thiếu biến môi trường DATABASE_URL");
    pool = new Pool({ connectionString: url });
  }
  return drizzle({ client: pool, schema });
}
