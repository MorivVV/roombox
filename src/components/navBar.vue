<template>
  <div>
    <nav>
      <div class="nav-wrapper blue">
        <a href="" class="brand-logo">{{ Logo }}</a>
        <a href="" data-target="mobile-demo" class="sidenav-trigger"
          ><i class="material-icons">menu</i></a
        >
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/forum">Форум</router-link></li>
          <li><router-link to="/billing">Показания</router-link></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Главная</router-link></li>
      <li><router-link to="/forum">Форум</router-link></li>
      <li><router-link to="/billing">Показания</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    Logo: String,
  }
};
</script>