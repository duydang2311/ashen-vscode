<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { flip } from "svelte/animate";

  // props (new syntax, inferred reactive)
  export let name = $state("Svelte Tester");

  // state runes
  let count = $state(0);
  let items = $state(["alpha", "beta", "gamma"]);
  let inputValue = $state("");
  let checkbox = $state(false);

  // derived state
  let double = $derived(count * 2);

  // effect (replaces $: console.log(...))
  $effect(() => {
    console.log("count changed:", count);
  });

  // effect with cleanup
  $effect(() => {
    console.log("Effect with cleanup");
    return () => console.log("cleanup!");
  });

  // async effect
  $effect.root(async () => {
    console.log("Root async effect start");
    await new Promise(r => setTimeout(r, 200));
    console.log("Root async effect end");
  });

  // reference to DOM
  let divEl = $state<HTMLDivElement | null>(null);

  // promises for #await
  let promise = $state<Promise<string>>(
    new Promise(res => setTimeout(() => res("Data loaded! ✅"), 1000))
  );

  // actions
  function addItem() {
    items.push(`new-${Math.random().toString(36).slice(2, 5)}`);
  }

  async function increment() {
    count++;
  }
</script>

<svelte:options tag="syntax-playground" />

<svelte:head>
  <title>Svelte 5 Syntax Playground</title>
</svelte:head>

<svelte:window on:resize={(e) => console.log("Window resized", e)} />
<svelte:body on:click={() => console.log("Body clicked")} />

<main bind:this={divEl} {@attach (node) => {
    console.log("Main element attached:", node);
}}>
  <h1 class:highlighted={count > 2}>Hello {name} 👋</h1>
  <p>Count: {count} | Double: {double}</p>

  <button on:click={increment}>Increment</button>

  <!-- bind -->
  <input placeholder="Type here" bind:value={inputValue} />
  <label>
    <input type="checkbox" bind:checked={checkbox} /> Checkbox: {checkbox}
  </label>

  <!-- if / else -->
  {#if count === 0}
    <p>Nothing yet...</p>
  {:else if count < 5}
    <p>Keep clicking! 🔥</p>
  {:else}
    <p>You're on fire! 🚀</p>
  {/if}

  <!-- each -->
  <ul>
    {#each items as item, i (item)}
      <li animate:flip transition:fly>{{i}}: {item}</li>
    {/each}
  </ul>
  <button on:click={addItem}>Add Item</button>

  <!-- key -->
  {#key count}
    <p transition:fade>Keyed block for count: {count}</p>
  {/key}

  <!-- await -->
  {#await promise}
    <p>Loading...</p>
  {:then data}
    <p>{data}</p>
  {:catch err}
    <p style="color: red;">Error: {err}</p>
  {/await}

  <!-- slot demo -->
  <Card>
    <p slot="title">Card Title</p>
    <p>Default slot content</p>
  </Card>

  <svelte:fragment slot="extra">
    <p>Extra slot content via fragment</p>
  </svelte:fragment>

  <!-- svelte:element -->
  <svelte:element this="section" style="border:1px solid #ccc; padding:0.5rem">
    <p>I'm a dynamic svelte:element!</p>
  </svelte:element>
</main>

<!-- component with slots -->
<script lang="ts">
  export let Card: any;
</script>

{#snippet testSnippet()}
<p>Hello world </p>
{/snippet}

{@render testSnippet()}
<Card let:slot>
  <slot name="title"></slot>
  <div><slot /></div>
</Card>

<style>
  h1 {
    color: teal;
  }
  .highlighted {
    color: orange;
  }
</style>
