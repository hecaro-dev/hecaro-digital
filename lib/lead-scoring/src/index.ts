export type LeadGrade = "A" | "B" | "C";

export function calculateLeadScore(
  _businessType: string,
  enquiryVolume: string,
  timeCost: string,
): number {
  const normalizedVolume = enquiryVolume.toLocaleLowerCase();
  const normalizedTimeCost = timeCost.toLocaleLowerCase();

  const volumeScore =
    normalizedVolume.includes("mehr als 15") ||
    normalizedVolume.includes("more than 15") ||
    normalizedVolume.includes("más de 15")
      ? 50
      : normalizedVolume.includes("5 bis 15") ||
          normalizedVolume.includes("5 to 15") ||
          normalizedVolume.includes("5 a 15")
        ? 25
        : 10;

  const problemScore =
    normalizedTimeCost.includes("unqualifizierte") ||
    normalizedTimeCost.includes("unqualified") ||
    normalizedTimeCost.includes("no cualificadas")
      ? 40
      : normalizedTimeCost.includes("nachfassen") ||
          normalizedTimeCost.includes("follow-up") ||
          normalizedTimeCost.includes("seguimiento")
        ? 25
        : 20;

  return volumeScore + problemScore;
}

export function determineLeadGrade(score: number): LeadGrade {
  return score >= 60 ? "A" : score >= 35 ? "B" : "C";
}