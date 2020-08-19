<!-- App.svelte -->
<script>
  import Tailwindcss from "./Tailwindcss.svelte";
  import Router from 'svelte-spa-router'
  import Main from "./Main.svelte";

  const routes = {
      // Exact path
      '/*': Main,

      /* // Using named parameters, with last being optional */
      /* '/author/:first/:last?': Author, */
      /*  */
      /* // Wildcard parameter */
      /* '/book/*': Book, */

      // Catch-all
      // This is optional, but if present it must be the last
      /* '*': NotFound, */
  }

</script>

<Tailwindcss />
<Router {routes}/>
