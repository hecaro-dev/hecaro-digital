export type LeadGrade = "A" | "B" | "C";

export function calculateLeadScore(
  bottleneck: string,
  impact: string,
  companySize: string,
): number {
  const normalizedImpact = impact.toLocaleLowerCase();
  const normalizedCompanySize = companySize.toLocaleLowerCase();

  const bottleneckScore =
    bottleneck.trim().length >= 60 ? 20 : bottleneck.trim().length >= 25 ? 15 : 5;

  const impactScore =
    normalizedImpact.includes("täglich") ||
    normalizedImpact.includes("daily") ||
    normalizedImpact.includes("a diario")
      ? 45
      : normalizedImpact.includes("mehrmals") ||
          normalizedImpact.includes("several") ||
          normalizedImpact.includes("varias")
        ? 30
        : 15;

  const companyScore = normalizedCompanySize.includes("10+")
    ? 35
    : normalizedCompanySize.includes("2–10") ||
        normalizedCompanySize.includes("2-10")
      ? 25
      : 10;

  return bottleneckScore + impactScore + companyScore;
}

export function determineLeadGrade(score: number): LeadGrade {
  return score >= 60 ? "A" : score >= 35 ? "B" : "C";
}