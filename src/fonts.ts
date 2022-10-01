const weightMap = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  Bold: 700,
} as const;

type Family = {
  name:
    | "GH Guardian Headline"
    | "GuardianTextEgyptian"
    | "GuardianTextSans"
    | "GT Guardian Titlepiece";
  weights: Array<keyof typeof weightMap>;
  italics: boolean;
};
export const families: Family[] = [
  {
    name: "GH Guardian Headline",
    weights: ["Light", "Medium", "Bold"],
    italics: true,
  },
  {
    name: "GuardianTextEgyptian",
    weights: ["Regular", "Bold"],
    italics: true,
  },
  {
    name: "GuardianTextSans",
    weights: ["Regular", "Bold"],
    italics: true,
  },
  {
    name: "GT Guardian Titlepiece",
    weights: ["Bold"],
    italics: false,
  },
];

type Font = {
  family: Family["name"];
  file: string;
  weight: typeof weightMap[keyof typeof weightMap];
  style: "normal" | "italic";
};

export const fonts: Font[] = families.flatMap(({ name, weights, italics }) => {
  return weights.flatMap((weight) => {
    const folder = (family: Family["name"]) => {
      switch (family) {
        case "GH Guardian Headline":
          return "guardian-headline";
        case "GT Guardian Titlepiece":
          return "guardian-titlepiece";
        case "GuardianTextEgyptian":
          return "guardian-textegyptian";
        case "GuardianTextSans":
          return "guardian-textsans";
      }
    };

    const fonts: Font[] = [
      {
        family: name,
        weight: weightMap[weight],
        file: `${folder(name)}/noalts-not-hinted/${name.replaceAll(
          /\W/g,
          ""
        )}-${weight}`,
        style: "normal",
      },
    ];

    if (italics) {
      fonts.push({
        family: name,
        weight: weightMap[weight],
        file: `${folder(name)}/noalts-not-hinted/${name.replaceAll(
          /\W/g,
          ""
        )}-${weight}Italic`,
        style: "italic",
      });
    }

    return fonts;
  });
});

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
