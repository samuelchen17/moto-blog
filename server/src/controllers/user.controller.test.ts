import request from "supertest";
import express from "express";
import { test } from "./user.controller";

const app = express();
app.get("/test", test);

describe("User controller", () => {
  it("should return a JSON response with a message", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "API working" });
  });
});
