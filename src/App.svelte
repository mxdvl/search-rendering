<script>
  import { timeAgo } from "@guardian/libs";
  import { data } from "./data.js";
  import {
    text,
    news,
    sport,
    culture,
    opinion,
    lifestyle,
  } from "@guardian/src-foundations/palette";
  import { body, headline } from "@guardian/src-foundations/typography";

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
</script>

<main style={body.medium() + style}>
  <h1>Guardian Search</h1>

  <form on:submit|preventDefault={fetchResults}>
    <input bind:value={search} type="text" placeholder="coronavirus" />
    <button type="submit" disabled={!search}>Search</button>
  </form>

  <ul>
    {#each results as result}
      <li>
        <a class="result" target="_blank" href={result.webUrl}>
          <h3 style={headline.xsmall()}>
            <span style="color: var(--{simplifyPillar(result.pillarId)})"
              >{result.sectionName} /</span
            >
            {result.webTitle}
          </h3>
          <h5 style={body.small()}>
            {timeAgo(new Date(result.webPublicationDate).getTime())}
          </h5>
        </a>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: left;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  ul {
    padding: 0;
    list-style-type: none;
  }

  h1 {
    color: var(--blue);
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 100;
  }

  .result {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1em;
    color: var(--primary);
  }

  h3 {
    line-height: 1.15;
    font-weight: 500;
    width: 100%;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  h4,
  h5 {
    font-weight: 400;
    font-size: 1em;
    margin: 0;
    text-decoration: none;
  }

  h4 {
    width: 6em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
