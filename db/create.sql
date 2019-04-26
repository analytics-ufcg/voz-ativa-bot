CREATE TABLE IF NOT EXISTS "admins" (
    "id" SERIAL, 
    "username" VARCHAR(50),
    "chatid" VARCHAR(50),
PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "logs" (
    "id" SERIAL, 
    "timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "log" TEXT,
PRIMARY KEY ("id"));