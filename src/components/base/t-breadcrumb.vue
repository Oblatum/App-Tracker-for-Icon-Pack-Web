<template>
  <div class="breadcrumb">
    <span class="crumb-item">搜索结果</span>
    <span class="crumb-item">搜索</span>
    <span class="crumb-item">QQ</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
  .breadcrumb {
    width: 100%;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
    padding: 0.25rem 0;
    user-select: none;

    .crumb-item {
      display: inline-block;
      padding: 0.25rem 1rem;
      color: #707070;
      font-weight: lighter;
    }
  }
</style>