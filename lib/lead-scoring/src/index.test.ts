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
  it("scores high-volume unqualified calls as green in every language", () => {
    const options = [
      ["Mehr als 15", "Unqualifizierte Erstgespräche"],
      ["More than 15", "Unqualified initial calls"],
      ["Más de 15", "Primeras conversaciones no cualificadas"],
    ] as const;

    for (const [volume, problem] of options) {
      const score = calculateLeadScore("Service business", volume, problem);
      assert.equal(score, 90);
      assert.equal(determineLeadGrade(score), "A");
    }
  });

  it("scores medium combinations as yellow in every language", () => {
    const options = [
      ["5 bis 15", "Manuelles Nachfassen"],
      ["5 to 15", "Manual follow-ups"],
      ["5 a 15", "Seguimiento manual"],
    ] as const;

    for (const [volume, problem] of options) {
      const score = calculateLeadScore("Service business", volume, problem);
      assert.equal(score, 50);
      assert.equal(determineLeadGrade(score), "B");
    }
  });

  it("scores low-volume weak problems as red in every language", () => {
    const options = [
      ["Weniger als 5", "Zu langsame Rückmeldungen"],
      ["Fewer than 5", "Slow response times"],
      ["Menos de 5", "Respuestas demasiado lentas"],
    ] as const;

    for (const [volume, problem] of options) {
      const score = calculateLeadScore("Service business", volume, problem);
      assert.equal(score, 30);
      assert.equal(determineLeadGrade(score), "C");
    }
  });
});