<script>
  import Tailwindcss from './Tailwindcss.svelte'
  import clsx from 'clsx'
  import Nav from './Nav.svelte'
  import { location } from 'svelte-spa-router'
  import Home from './components/Home/index.svelte'
  import { afterUpdate } from 'svelte'

  let back = true

  const route = () => {
    if ($location === '/') return Home
    return Home
  }
  afterUpdate(() => {
    console.log('the component just updated')
    back = !back
  })
</script>

<style>
  a {
    @apply .text-black;
    font-style: italic;
  }

  .flipContainer {
    perspective: 1000px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* flip speed goes here */
  .flipper {
    width: 100%;
    height: 100%;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;

    background: white;
    box-shadow: 0 5px 5px hsla(0, 0%, 0%, 0.3),
      inset 0 0 5px hsla(0, 0%, 0%, 0.3);
    padding: 20px;
    font-size: 0.9em;
  }

  .back {
    transform: rotateX(-180deg);
  }

  .nav {
    background: white;
    box-shadow: 0 5px 5px hsla(0, 0%, 0%, 0.3),
      inset 0 0 5px hsla(0, 0%, 0%, 0.3);
  }

  .title {
    margin-bottom: 20px;
  }

  .socialMedia li {
    display: inline;
    text-align: center;
  }

  .socialMedia li a {
    text-decoration: none;
    padding: 0.2em 1em;
  }

  ::selection {
    color: #fff;
    color: rgba(255, 255, 255, 0.85);
    background: #d39995;
  }

  .passiveElement {
    z-index: -100;
  }

  .navCont {
    flex: 0 0 28%;
  }

  .mainCont {
    flex: 0 0 72%;
  }

  html,
  body {
    position: fixed;
    height: 100%;
    width: 100%;
  }
</style>

<Tailwindcss />
<main>
  <div class="flex flex-grow md:flex">
    <Nav style="max-width: 300px;" />
    <div
      class="flex-grow flex lg:mb-10 lg:mx-1 relative fixed"
      style="max-width: 800px; height: 500px">
      <div class="flipContainer flex flex-grow">
        <div
          class={`flipper flex-grow flex-col flex `}
          style="transform: {back ? 'rotateX(180deg)' : 'rotateX(0deg)'}">
          <div
            class="front flex flex-col flex-grow overflow-hidden pb-6"
            style={''}>
            PassiveElement
          </div>
          <div
            class={clsx('back flex flex-col h-full overflow-y-auto overflow-hidden', !back && 'pointer-events-none')}
            style="zIndex: {!back && -11}">
            <svelte:component this={route()} />
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
