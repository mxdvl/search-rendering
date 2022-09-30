import { timeAgo } from "https://esm.sh/@guardian/libs@8.0.5";
import {
  text,
  news,
  sport,
  culture,
  opinion,
  lifestyle,
  body,
  headline,
} from "https://esm.sh/@guardian/source-foundations@5.3.0";

let search;
let results = data;

const ENDPOINT = "https://content.guardianapis.com/search";
const fetchResults = () => {
  if (!search) return;

  fetch(`${ENDPOINT}?q=${search}&api-key=test`)
    .then((raw) => raw.json())
    .then((response) => {
      console.log("raw results", response.response.result);

      // console.log("raw results", JSON.stringify(response.response.results));
      results = response.response.results;
    });
};

const simplifyPillar = (pillarId) => {
  const [, cleanId] = (pillarId ?? "/news").split("/");
  return cleanId.replace(/(arts|books)/, "culture");
};

const style = `
    --primary: ${text.primary};
    --anchorPrimary: ${text.anchorPrimary};
    --news: ${news[400]};
    --sport: ${sport[400]};
    --culture: ${culture[400]};
    --opinion: ${opinion[400]};
    --lifestyle: ${lifestyle[400]};
    `.replaceAll(/\s+/g, " ");
