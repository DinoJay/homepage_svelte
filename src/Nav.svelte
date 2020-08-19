<script>
  /* export let clickHandler; */
  /* export let isTopOffset; */
  export let style;
  import {location} from 'svelte-spa-router'
  import clsx from 'clsx';
  import {
    INDEX,
    CV,
    COLLAGE,
    RECORDCOLLECTION,
    MYPROJECTS,
    SCREENSHOTS,
    QUOTES_AND_NOTES,
    MIXTAPES,
    JAN
  } from './routePaths';

  const onClick = d => {
    clickHandler(d);
  };
  const makeLink = url => `#${url}`;
  $: path = $location;
  /* console.log('path', path); */

</script>

<style>
  a {
    @apply .text-black;
  }
</style>

<div
  class="z-10 inline-block"
  style={style}>
  <div
    class={clsx(
      'z-40  pl-3 mb-2 p-2 '
    )}
    style=""
    >
    <div class="flex items-center ">
      <button
        type="button"
        class={clsx(
          'flex flex-shrink-0 text-4xl border-0'
        )}>
        ≡
      </button>
      <h2 class={'truncate text-2xl m-1 md:text-2xl ml-2'}>
          Jan Maushagen
      </h2>
    </div>
    <div class={'list text-xl '}>
        <div class="m-1">
          <a
            class={clsx(path === INDEX.path && 'underline')}
            href={makeLink(INDEX.path)}>
            Home
          </a>
        </div>
        <div class="m-1">
          <a
            href={makeLink(CV.path)}
            class={clsx(path === CV.path && 'underline')}>
            CV
          </a>
        </div>
        <div class="m-1">
          <a
            href={makeLink(COLLAGE.path)}
            class={clsx(path === COLLAGE.path && 'underline')}>
            Collage
          </a>
        </div>
        <div class="m-1">
          <a
            class={clsx(path === RECORDCOLLECTION.path && 'underline')}
            href={makeLink(RECORDCOLLECTION.path)}>
            Record Collection
          </a>
        </div>
        <div class="m-1">
          <a
            class={clsx(path === SCREENSHOTS.path && 'underline')}
            href={makeLink(SCREENSHOTS.path)}>
            Work in Progress
          </a>
        </div>
        <div class="m-1">
          <a
            class={clsx(path === MIXTAPES.path && 'underline')}
            href={makeLink(MIXTAPES.path)}>
            Mixtapes
          </a>
        </div>
        <div class="m-1">
          <a
            class={clsx(path === MYPROJECTS.path && 'underline')}
            href={makeLink(MYPROJECTS.path)}>
            My Projects
          </a>
        </div>
    </div>
  </div>
</div>
