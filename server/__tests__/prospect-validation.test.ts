import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("salary field validation", () => {
  test("accepts a valid salary string", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      targetSalary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts an empty salary string (field left blank)", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      targetSalary: "",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts null salary (field omitted)", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      targetSalary: null,
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts salary when targetSalary is undefined", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("rejects a salary string exceeding 100 characters", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      targetSalary: "x".repeat(101),
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Target salary must be 100 characters or fewer");
  });

  test("rejects a non-string salary value", () => {
    const result = validateProspect({
      companyName: "Acme",
      roleTitle: "Engineer",
      targetSalary: 120000,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Target salary must be a string");
  });
});
