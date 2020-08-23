<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import clsx from 'clsx';
  import Nav from './Nav.svelte';
  import {location} from 'svelte-spa-router'
  import Home from './components/Home/index.svelte';

  let back = true;
  const clickHandler = () => {
      back = !back

    }

    /* const route = () => { */
    /*   if($location === '/') return Home; */
    /*  */
    /* } */

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

  }

  /* hide back of pane during swap */
  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;

    background: white;
    box-shadow: 0 5px 5px hsla(0, 0%, 0%, 0.3), inset 0 0 5px hsla(0, 0%, 0%, 0.3);
    padding: 20px;
    font-size: .9em;

  }

  .back {
    transform: rotateX(-180deg);
  }

  .nav {
    background: white;
    box-shadow: 0 5px 5px hsla(0, 0%, 0%, 0.3), inset 0 0 5px hsla(0, 0%, 0%, 0.3);
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
    padding: .2em 1em;

  }

  ::selection {
    color: #fff;
    color: rgba(255, 255, 255, 0.85);
    background: #D39995;
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


  html, body {
    position: fixed;
    height: 100%;
    width: 100%;
  }


</style>

<Tailwindcss />
<main>
  <div class="flex flex-grow md:flex"
    on:click={clickHandler}
  >
  <Nav style="max-width: 300px;"/>
    <div
      class="flex-grow relative flex lg:mb-10 lg:mx-1 relative fixed"

      style="">
      <div class={`flipContainer flex flex-grow `} >
        <div
          class={`flipper flex-grow flex-col flex `}
          style="transform:
          { back ? 'rotateX(180deg)' : 'rotateX(0deg)' }"
          >
          <div
            class="front flex flex-col flex-grow overflow-hidden pb-6"
            style={''}>
          </div>
          <div
            class={clsx(
              'back flex flex-col overflow-y-auto overflow-hidden',
              !back && 'pointer-events-none',
            )}
            style={{zIndex: !back && -11}}>
            ActiveElement
          </div>
        </div>
      </div>
    </div>
    </div>
</main>
