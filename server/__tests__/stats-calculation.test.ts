import { computeStats } from "../prospect-helpers";

const makeProspect = (status: string, interestLevel = "Medium") => ({ status, interestLevel });

describe("computeStats", () => {
  test("returns all zeros for an empty list", () => {
    const result = computeStats([]);
    expect(result).toEqual({ total: 0, active: 0, advanced: 0, highInterest: 0 });
  });

  test("counts total correctly", () => {
    const prospects = [
      makeProspect("Bookmarked"),
      makeProspect("Applied"),
      makeProspect("Rejected"),
    ];
    expect(computeStats(prospects).total).toBe(3);
  });

  test("active excludes Rejected and Withdrawn", () => {
    const prospects = [
      makeProspect("Bookmarked"),
      makeProspect("Applied"),
      makeProspect("Interviewing"),
      makeProspect("Rejected"),
      makeProspect("Withdrawn"),
    ];
    expect(computeStats(prospects).active).toBe(3);
  });

  test("active includes all non-terminal statuses including Offer", () => {
    const prospects = [
      makeProspect("Offer"),
      makeProspect("Phone Screen"),
      makeProspect("Withdrawn"),
    ];
    expect(computeStats(prospects).active).toBe(2);
  });

  test("advanced counts only Interviewing and Offer", () => {
    const prospects = [
      makeProspect("Bookmarked"),
      makeProspect("Interviewing"),
      makeProspect("Offer"),
      makeProspect("Applied"),
      makeProspect("Rejected"),
    ];
    expect(computeStats(prospects).advanced).toBe(2);
  });

  test("advanced is zero when no Interviewing or Offer jobs", () => {
    const prospects = [makeProspect("Applied"), makeProspect("Rejected")];
    expect(computeStats(prospects).advanced).toBe(0);
  });

  test("highInterest counts only High interest level", () => {
    const prospects = [
      makeProspect("Applied", "High"),
      makeProspect("Interviewing", "High"),
      makeProspect("Offer", "Medium"),
      makeProspect("Rejected", "Low"),
    ];
    expect(computeStats(prospects).highInterest).toBe(2);
  });

  test("highInterest is zero when no High interest jobs", () => {
    const prospects = [makeProspect("Applied", "Medium"), makeProspect("Offer", "Low")];
    expect(computeStats(prospects).highInterest).toBe(0);
  });

  test("all stats correct for a mixed dataset", () => {
    const prospects = [
      makeProspect("Bookmarked", "High"),
      makeProspect("Applied", "Medium"),
      makeProspect("Phone Screen", "High"),
      makeProspect("Interviewing", "Low"),
      makeProspect("Offer", "High"),
      makeProspect("Rejected", "Medium"),
      makeProspect("Withdrawn", "High"),
    ];
    const result = computeStats(prospects);
    expect(result.total).toBe(7);
    expect(result.active).toBe(5);
    expect(result.advanced).toBe(2);
    expect(result.highInterest).toBe(4);
  });
});
