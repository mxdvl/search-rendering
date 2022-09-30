export const fonts = [
  // GH Guardian Headline, with legacy family name of Guardian Egyptian Web
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Light",
    weight: 300,
    style: "normal",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Light",
    weight: 300,
    style: "normal",
  },
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-LightItalic",
    weight: 300,
    style: "italic",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-LightItalic",
    weight: 300,
    style: "italic",
  },
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Medium",
    weight: 500,
    style: "normal",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Medium",
    weight: 500,
    style: "normal",
  },
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-MediumItalic",
    weight: 500,
    style: "italic",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-MediumItalic",
    weight: 500,
    style: "italic",
  },
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "GH Guardian Headline",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-BoldItalic",
    weight: 700,
    style: "italic",
  },
  {
    family: "Guardian Egyptian Web",
    file: "guardian-headline/noalts-autohinted/GHGuardianHeadline-BoldItalic",
    weight: 700,
    style: "italic",
  },
  // GuardianTextEgyptian, with legacy family name of Guardian Text Egyptian Web
  {
    family: "GuardianTextEgyptian",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-Regular",
    weight: 400,
    style: "normal",
  },
  {
    family: "Guardian Text Egyptian Web",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-Regular",
    weight: 400,
    style: "normal",
  },
  {
    family: "GuardianTextEgyptian",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-RegularItalic",
    weight: 400,
    style: "italic",
  },
  {
    family: "Guardian Text Egyptian Web",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-RegularItalic",
    weight: 400,
    style: "italic",
  },
  {
    family: "GuardianTextEgyptian",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "Guardian Text Egyptian Web",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "GuardianTextEgyptian",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-BoldItalic",
    weight: 700,
    style: "italic",
  },
  {
    family: "Guardian Text Egyptian Web",
    file: "guardian-textegyptian/noalts-autohinted/GuardianTextEgyptian-BoldItalic",
    weight: 700,
    style: "italic",
  },
  // GuardianTextSans, with legacy family name of Guardian Text Sans Web
  {
    family: "GuardianTextSans",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-Regular",
    weight: 400,
    style: "normal",
  },
  {
    family: "Guardian Text Sans Web",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-Regular",
    weight: 400,
    style: "normal",
  },
  {
    family: "GuardianTextSans",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-RegularItalic",
    weight: 400,
    style: "italic",
  },
  {
    family: "Guardian Text Sans Web",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-RegularItalic",
    weight: 400,
    style: "italic",
  },
  {
    family: "GuardianTextSans",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "Guardian Text Sans Web",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-Bold",
    weight: 700,
    style: "normal",
  },
  {
    family: "GuardianTextSans",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-BoldItalic",
    weight: 700,
    style: "italic",
  },
  {
    family: "Guardian Text Sans Web",
    file: "guardian-textsans/noalts-autohinted/GuardianTextSans-BoldItalic",
    weight: 700,
    style: "italic",
  },
  {
    family: "GT Guardian Titlepiece",
    file: "guardian-titlepiece/noalts-autohinted/GTGuardianTitlepiece-Bold",
    weight: 700,
    style: "normal",
  },
] as const;

export const fontBase = "https://assets.guim.co.uk/static/frontend/fonts";

export const fontFaces = fonts.map(
  ({ family, file, weight, style }) => `
@font-face {
    font-family: "${family}";
    src: ${["woff2", "woff", "ttf"]
      .map((ext) => `url(${fontBase}/${file}.${ext}) format("${ext}")`)
      .join(",")};
    font-weight: ${weight};
    font-style: ${style};
    font-display: swap;
}
`
);
