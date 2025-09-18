import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/server";

describe("GET /api/health", () => {
    it("should return status ok", async () => {
        const res = await request(app).get("/api/health");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
});

describe("GET /api/nonexistent", () => {
    it("should return 404 and error message", async () => {
        const res = await request(app).get("/api/nonexistent");
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("error");
        expect(res.body).toHaveProperty("message");
    });
});