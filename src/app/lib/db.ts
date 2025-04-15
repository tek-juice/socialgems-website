
import { createPool } from '@vercel/postgres';

const DATABASE_URL= "postgres://neondb_owner:npg_ebG4mXjH1zfL@ep-late-feather-a40485x8-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
console.log(`createPoolInfo`,process.env.POSTGRES_URL,process.env.PORT)
export const db = createPool({

    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
});

//Test connection