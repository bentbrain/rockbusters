vi.mock("@/lib/env", () => ({
  env: {
    FETCH_SELF_URL: "https://rockbusters.lol",
  },
}));

describe("SEO helpers", () => {
  test("builds absolute URLs from site-relative paths", async () => {
    const { getAbsoluteUrl } = await import("./seo");

    expect(getAbsoluteUrl("/sitemap.xml")).toBe(
      "https://rockbusters.lol/sitemap.xml"
    );
  });

  test("selects the default Karl image unless the clue mentions Jamaican", async () => {
    const { getKarlImagePath } = await import("./seo");

    expect(getKarlImagePath("This group thinks of lots of things.")).toBe(
      "/assets/karl.png"
    );
    expect(getKarlImagePath("This Jamaican fella sings one.")).toBe(
      "/assets/karl-jamaican.png"
    );
  });
});
