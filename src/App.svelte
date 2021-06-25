<script>
  import { timeAgo } from "@guardian/libs";
  import { data } from './data.js';
  export let name;
  let search;

  let results = data;

  const ENDPOINT = "https://content.guardianapis.com/search";
  const fetchResults = () => {
    if (!search) return;

    fetch(`${ENDPOINT}?q=${search}&api-key=test`)
      .then((raw) => raw.json())
      .then((response) => {
        console.log("raw results", response);

		console.log("raw results", JSON.stringify(response.response.results));
        results = response.response.results;
      });
  };
</script>

<main>
  <h1>Guardian Search</h1>

  <form on:submit|preventDefault={fetchResults}>
    <input bind:value={search} type="text" placeholder="coronavirus" />
    <button type="submit" disabled={!search}>Search</button>
  </form>
</main>

<ul>
  {#each results as result}
    <li>
      <a class="result" target="_blank" href={result.webUrl}>
        <h3>
          {result.webTitle}
        </h3>
        <h4>{result.sectionName}</h4>
		<h5>{timeAgo(new Date(result.webPublicationDate).getTime())}</h5>
      </a>
    </li>
  {/each}
</ul>

<style>
  main {
    text-align: left;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #052962;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 100;
  }

  .result {
	  display: flex;
	  flex-wrap: wrap;
	  margin-bottom: 1em;
	  color: #333;
  }

  h3 {
	  font-weight: 500;
	  color: #052962;
	  width: 100%;
	  margin: 0.25em;
  }

  h4, h5 {
	  font-weight: 400;
	  font-size: 1em;
	  margin: 0.25em;
	  text-decoration: none;
	  float: left
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
