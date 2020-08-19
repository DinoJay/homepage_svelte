<script>
  import beerIcon from './pics/beer-icon.png';
  import coffeeIcon from './pics/take-away.svg';
  import jsLogo from './pics/js_logo.svg';
  import reactLogo from './pics/react_logo.svg';
  import d3Logo from './pics/d3_logo.svg';
  import vinylIcon from './pics/music.svg';
  import headphonesIcon from './pics/headphones.svg';
  import astroIcon from './pics/astro.png';
</script>
<table class={`text-sm lg:text-base`}>
  <tr>
    <th class="text-base w-1/2">
      <div>
        <div>__Day__ </div>
        <span role="img" aria-label="emoji">
          🌇
        </span>
      </div>
    </th>
    <th>
      <div>
        <div>**Night**</div>{' '}
        <span role="img" aria-label="emoji">
          🌃
        </span>
      </div>
    </th>
  </tr>
  <tr>
    <td>
      <div>
        <div>Gazing at </div>
        <div role="img" aria-label="emoji">
          💻
        </div>
      </div>
    </td>
    <td>
      <div>
        <span role="img" aria-label="emoji">
          🏃
        </span>{' '}
        <span>in park</span>
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div>
        <span class="mr-1">Visualizing data </span>
        <span role="img" aria-label="emoji">
          📊
        </span>
      </div>{' '}
    </td>
    <td>
      <div>
        <img
          class="mr-1"
          alt="headphones"
          style={{width: '33px', height: '33px'}}
          src={headphonesIcon}
        />{' '}
        <img
          class="mr-1"
          alt="mixing"
          style={{width: '33px', height: '33px'}}
          src={vinylIcon}
        />
        <div class="pl-1 pr-1">music</div>
        <span role="img" aria-label="emoji">
          😎
        </span>
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div>
        lost in hyperspace
        <img
          style={{width: '33px', height: '33px'}}
          alt="astro"
          src={astroIcon}
        />
      </div>
    </td>
    <td>scratching my head about real life </td>
  </tr>
  <tr>
    <td>
      <div class="">
        <span>fiddling with </span>
        <img
          alt="js"
          src={jsLogo}
          style={{
            width: '22px',
            height: '22px',
            verticalAlign: 'top'
          }}
        />
        <img
          alt="react"
          src={reactLogo}
          style={{
            width: '22px',
            height: '22px',
            verticalAlign: 'top'
          }}
        />
        <span>and</span>
        <img
          src={d3Logo}
          alt="d3"
          style={{
            width: '22px',
            height: '22px',
            verticalAlign: 'top'
          }}
        />
      </div>
    </td>
    <td>learning French and Dutch, forgetting German</td>
  </tr>
  <tr>
    <td>
      <div>
        <img
          style={{width: '33px', height: '33px'}}
          alt="coffee"
          src={coffeeIcon}
        />{' '}
        <span>Bonjour</span>
      </div>
    </td>
    <td>
      <div>
        <img
          style={{width: '33px', height: '33px'}}
          alt="beer"
          src={beerIcon}
        />{' '}
        <span>Prost!</span>
      </div>
    </td>
  </tr>
</table>
