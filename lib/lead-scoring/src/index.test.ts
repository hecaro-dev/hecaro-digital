import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { calculateLeadScore, determineLeadGrade } from "./index.js";

describe("determineLeadGrade", () => {
  it("keeps the traffic-light boundaries stable", () => {
    assert.equal(determineLeadGrade(34), "C");
    assert.equal(determineLeadGrade(35), "B");
    assert.equal(determineLeadGrade(59), "B");
    assert.equal(determineLeadGrade(60), "A");
  });
});

describe("calculateLeadScore", () => {
  const detailedBottleneck =
    "Our team repeatedly spends hours qualifying conversations that lead nowhere.";

  it("scores equivalent German, English, and Spanish daily options equally", () => {
    const options = [
      ["Täglich – kostet mich enorm viel Zeit", "10+ Mitarbeiter"],
      ["Daily – it costs me a lot of time", "10+ employees"],
      ["A diario – me cuesta mucho tiempo", "10+ empleados"],
    ] as const;

    for (const [impact, companySize] of options) {
      assert.equal(calculateLeadScore(detailedBottleneck, impact, companySize), 100);
    }
  });

  it("scores equivalent German, English, and Spanish several-times options equally", () => {
    const options = [
      ["Mehrmals pro Woche – ist ein echtes Problem", "2–10 Mitarbeiter"],
      ["Several times a week – it's a real problem", "2–10 employees"],
      ["Varias veces a la semana – es un problema real", "2–10 empleados"],
    ] as const;

    for (const [impact, companySize] of options) {
      assert.equal(calculateLeadScore("A sufficiently specific issue", impact, companySize), 70);
    }
  });
});