<template>
  <div class="loading">
    <div class="loading-content">
      <img width="30" height="30" src="./loading.gif" alt="">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading-content {
  text-align: center;
}
</style>