<template>
  <div>
    <h2 id="site-name">movieroom</h2>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/scss/style.scss';

#site-name {
  margin-bottom: 96px;
}

#app {
  height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
