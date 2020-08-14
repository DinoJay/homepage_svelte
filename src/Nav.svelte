<script>
  /* export let clickHandler; */
  /* export let isTopOffset; */
  export let path=null;
  /* export let class; */
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

</script>

<div
  class="fixed sm:static ml-3 lg:mt-2 lg:my-5 sm:mt-0 md:mr-6 z-10"
  style="transition: all 300ms">
  <div
    class={clsx(
      'z-40 md:p-3 pl-3 mb-2 p-2'
    )}
    style="transition: all 300ms"
    >
    <div class="flex items-center ">
      <button
        type="button"
        class={clsx(
          'btn rounded-full flex flex-shrink-0 '
        )}>
        MenuIcon

      </button>
      <h2 class={clsx('truncate text-2xl m-1 w-full md:text-2xl ml-2')}>
        <a
          class={clsx(
            path === JAN.path && 'underline',
            'marker text-gray-700',
          )}
          href={JAN.path}>
          Jan Maushagen
        </a>
      </h2>
    </div>
    <div class={clsx('list', 'text-xl')}>
      <ul
        class={clsx(
          'ml-6 overflow-hidden mb-6',
          'opacity-1',
        )}
        style="transition: all 700ms"
        >
        <li class="m-1">
          <a
            class={clsx(path === INDEX.path && 'underline')}
            href={INDEX.path}>
            Home
          </a>
        </li>
        <li class="m-1">
          <a
            href={CV.path}
            class={clsx(path === CV.path && 'underline')}>
            CV
          </a>
        </li>
        <li class="m-1">
          <a
            href={COLLAGE.path}
            class={clsx(path === COLLAGE.path && 'underline')}>
            Collage
          </a>
        </li>
        <li class="m-1">
          <a
            class={clsx(path === RECORDCOLLECTION.path && 'underline')}
            href={RECORDCOLLECTION.path}>
            Record Collection
          </a>
        </li>
        <li class="m-1">
          <a
            class={clsx(path === SCREENSHOTS.path && 'underline')}
            href={SCREENSHOTS.path}>
            Work in Progress
          </a>
        </li>
        <li class="m-1">
          <a
            class={clsx(path === QUOTES_AND_NOTES.path && 'underline')}
            href={QUOTES_AND_NOTES.path}>
            Quotes & Notes
          </a>
        </li>
        <li class="m-1">
          <a
            class={clsx(path === MIXTAPES.path && 'underline')}
            href={MIXTAPES.path}>
            Mixtapes
          </a>
        </li>
        <li class="m-1">
          <a
            class={clsx(path === MYPROJECTS.path && 'underline')}
            href={MYPROJECTS.path}>
            My Projects
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
