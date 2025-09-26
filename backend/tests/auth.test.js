import { describe, it, beforeAll, afterAll, expect, afterEach } from "vitest";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import authRouter from "../routes/auth.js"; // your router
import User from "../models/User.js";

let mongoServer;
let app;

beforeAll(async () => {
  process.env.ACCESS_TOKEN_SECRET = "mySuperSecretKey123!@#";
  // start in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // setup Express app
  app = express();
  app.use(express.json());
  app.use("/api/auth", authRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Auth Routes", async () => {
  const testUser = { username: "testuser", password: "123456" };

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User registered successfull");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", pasword: "wrong" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid credencials");
  });

  it("should login with correct credentials", async () => {
    await request(app).post("/api/auth/register").send(testUser);
    const res = await request(app).post("/api/auth/login").send(testUser);
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
