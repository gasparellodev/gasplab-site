import { createHmac } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import { verifyMetaSignature } from "./meta";

const originalSecret = process.env.META_APP_SECRET;

afterEach(() => {
  if (originalSecret === undefined) delete process.env.META_APP_SECRET;
  else process.env.META_APP_SECRET = originalSecret;
});

describe("verifyMetaSignature", () => {
  it("accepts an authentic webhook body", () => {
    process.env.META_APP_SECRET = "test-secret";
    const body = JSON.stringify({ object: "whatsapp_business_account" });
    const signature = `sha256=${createHmac("sha256", "test-secret").update(body).digest("hex")}`;

    expect(verifyMetaSignature(body, signature)).toBe(true);
  });

  it("rejects a changed body or an absent secret", () => {
    process.env.META_APP_SECRET = "test-secret";
    const signature = `sha256=${createHmac("sha256", "test-secret").update("original").digest("hex")}`;
    expect(verifyMetaSignature("changed", signature)).toBe(false);

    delete process.env.META_APP_SECRET;
    expect(verifyMetaSignature("original", signature)).toBe(false);
  });
});

