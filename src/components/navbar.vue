<template>
  <div class="navbar">
    <div class="left">
      <router-link to="/">xx面板</router-link>
      <router-link to="/">图标查询</router-link>
      <router-link to="/">不知道</router-link>
    </div>
    <div class="right">
      <router-link to="/">登录</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  box-shadow: 0 2px 5px var(--color-gray-shadow);
  background-color: var(--color-brown-light);

  .item {
    color: black;
    display: block;
    text-decoration: none;
    padding: 0 20px;

    &.active {
      border-bottom: 1.5px solid var(--color-primary);
    }
  }
}
</style>
