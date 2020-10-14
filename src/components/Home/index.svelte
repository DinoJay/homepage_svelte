
<script>
  import clsx from 'clsx';
  import SomethingAboutMe from './SomethingAboutMe.svelte';
  /* import AboutVis from './AboutVis.svelte' */
  import MyTable from './MyTable.svelte';

</script>

<style>
  .maxGraphHeight {
    height:500px;
  }

  @screens {
    .autoGraphHeight {
      height: 300px;

    }

  }


  .balloon {
      align-self: flex-start;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      color: #333;
      position: relative;
      display: inline-block;
      background-color: #fff;
      box-shadow: 0 -4px #fff, 0 -8px #212529, 4px 0 #fff, 4px -4px #212529, 8px 0 #212529, 0 4px #fff, 0 8px #212529, -4px 0 #fff, -4px 4px #212529, -8px 0 #212529, -4px -4px #212529, 4px 4px #212529;
  }


  .balloon.from-right::after {
      bottom: -18px;
      width: 18px;
      height: 3px;
      margin-left: 8px;
      background-color: #fff;
      box-shadow: -4px 0 #212529, 4px 0 #212529, 4px 4px #fff, 0 4px #212529, 8px 4px #212529, 4px 8px #212529, 8px 8px #212529;

  }

  .balloon.from-right::before, .balloon.from-right::after {
      right: 2rem;

  }

  .balloon::before, .balloon::after {
      position: absolute;
      content: "";

  }

  .balloon.from-right::before {
      bottom: -14px;
      width: 26px;
      height: 10px;
      background-color: #fff;
      border-right: 4px solid #212529;
      border-left: 4px solid #212529;
  }

  .bubble0 {
    border: 2px solid black;
    background: #fff;
    border-radius: 50px;
  }

  .polaroid {
    padding: 6px 6px 12px 6px;
    box-shadow: 5px 5px 5px #BDBDBA;
    border: 2px solid black;
    transform: rotate(5deg);
  }

  .centerTable {
    margin: auto;
    width: 100%;

    padding: 2px;
  }

  .myTable td, th {
    @apply .border .border-black;
  }

    .myTable td {
      @apply .p-1;
    }

    .myTable th {
      @apply .p-2 .text-xl .font-extrabold;
    }

</style>

<div class="flex flex-col overflow-y-auto overflow-x-hidden p-3">
  <div class={`block header`}>
    <div class={`branding font-mono lg:p-8 `}>
      <div class="lg:flex mb-12 sm:mb-0 flex-col justify-center items-center">
        <div
          style={`right=0;`}
          class={clsx(
            "portrait",
            `flex md:pr-8 justify-end items-center md:items-start block lg:absolute lg:mt-0 mb-6 lg:mb-0`,
          )}>
          Tooltip
          <div class={'polaroid'}>
            PixelPic
          </div>
        </div>
        <div class="flex flex-col items-center">
          <h2 class="mb-2 text-lg ">Vrije Universiteit Brussel</h2>
          <h1 class="mb-2 text-4xl p-1 border-black border-b-4 border-t-4 flex-no-grow">
            Jan Maushagen
          </h1>
        </div>
      </div>
    </div>
  </div>
  <div class="lg:flex flex-wrap  lg:flex-no-wrap flex-grow ">
    <div
      class="flex flex-col justify-between sm:w-full md:w-full"
      style={{flex: '0 0 50%'}}>
      <SomethingAboutMe class="text-base mb-5 /4 pr-4 md:w-full md:pr-0" />
      <MyTable class={`mb-auto `} />
    </div>
    <div class="">
      <h3 class="mt-3 text-lg sm:mt-0">Interests</h3>
    </div>
  </div>
</div>
