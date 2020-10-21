<script>
  const beerIcon = '/pics/beer-icon.png'
  const coffeeIcon = '/pics/take-away.svg'
  const jsLogo = '/pics/js_logo.svg'
  const reactLogo = '/pics/react_logo.svg'
  const d3Logo = '/pics/d3_logo.svg'
  const vinylIcon = '/pics/music.svg'
  const headphonesIcon = '/pics/headphones.svg'
  const astroIcon = '/pics/astro.png'
</script>

<style>
  table {
    @apply .table-auto;
  }
  td {
    @apply .flex .items-center .border .p-1;
    min-width: 50%;
  }
  tr,
  thead {
    @apply .w-full .flex .justify-between;
  }
  th {
    @apply .w-1/2 .flex .items-center .justify-center .border;
  }

  /* span { */
  /*   height: 12px; */
  /*   width: 12px; */
  /* } */
</style>

<table class={`text-sm lg:text-base`}>
  <thead>
    <th class="text-base w-1/2">
      <div>__Day__</div>
      <span role="img" aria-label="emoji">🌇</span>
    </th>
    <th>
      <div>**Night**</div>
      <span role="img" aria-label="emoji">🌃</span>
    </th>
  </thead>
  <tbody>
    <tr>
      <td>
        <div>Gazing at</div>
        <div role="img" aria-label="emoji">💻</div>
      </td>
      <td>
        <span role="img" aria-label="emoji">🏃</span>
        {' '}
        <span>in park</span>
      </td>
    </tr>
    <tr class="flex justify-between">
      <td>
        <span class="mr-1">Visualizing data</span>
        <span role="img" aria-label="emoji">📊</span>
      </td>
      <td>
        <img
          class="mr-1"
          alt="headphones"
          style="width:33px;height:33px"
          src={headphonesIcon} />
        {' '}
        <img
          class="mr-1"
          alt="mixing"
          style="width:33px;height:33px"
          src={vinylIcon} />
        <div class="pl-1 pr-1">music</div>
        <span role="img" aria-label="emoji">😎</span>
      </td>
    </tr>
    <tr>
      <td>
        <div>lost in hyperspace</div>
        <img style="width: 33px; height: 33px" alt="astro" src={astroIcon} />
      </td>
      <td>scratching my head about real life</td>
    </tr>
    <tr>
      <td>
        <span>fiddling with</span>
        <img
          alt="js"
          src={jsLogo}
          style=" width: 22px; height: 22px; verticalAlign: top; " />
        <img
          alt="react"
          src={reactLogo}
          style="width: 22px; height: 22px; verticalAlign: top " />
        <span>and</span>
        <img
          src={d3Logo}
          alt="d3"
          style=" width:22px; height: 22px; verticalAlign: top; " />
      </td>
      <td>learning French and Dutch, forgetting German</td>
    </tr>
    <tr>
      <td>
        <img style="width:33px;height:33px" alt="coffee" src={coffeeIcon} />
        {' '}
        <span>Bonjour</span>
      </td>
      <td>
        <img style="width: 33px; height: 33px" alt="beer" src={beerIcon} />
        {' '}
        <span>Prost!</span>
      </td>
    </tr>

  </tbody>
</table>
