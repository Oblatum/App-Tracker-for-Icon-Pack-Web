<template>
  <div class="home">
    <t-banner>两分钟时间，下载 Android 客户端帮助我们丰富数据库 Github 酷安 </t-banner>
    <t-heading class="heading">App Tracker For Icon Pack</t-heading>
    <t-form class="form" />
    <main class="main" v-loading="loading">
      <t-breadcrumb class="breadcrumb" v-show="!loading" />
      <t-table @mounted="handleTable" :height="tableHeight" v-show="!loading" />
    </main>
  </div>
  <footer class="footer">©{{ year }}-2022  Indusy   Oblatum  反馈群：868795356</footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TForm from "@/components/form/t-form.vue";
import THeading from "@/components/base/t-heading.vue";
import TBanner from "@/components/base/t-banner.vue";
import TBreadcrumb from "@/components/base/t-breadcrumb.vue";
import TTable from "@/components/table/t-table.vue";
import emitter from "@/components/mitt";
import { ResultData } from "@/components/form/fetch";

export default defineComponent({
  components: {
    TForm,
    THeading,
    TBanner,
    TBreadcrumb,
    TTable
  },
  data() {
    return {
      tableHeight: 0,
      tableData: [],
      year: (new Date()).getFullYear()
    }
  },
  methods: {
    handleTable(value: number) {
      this.$data.tableHeight = value
    }
  },
  setup() {
    const loading = ref(false)
    emitter.on('update', (val) => {
      loading.value = true
      ;(val as Promise<ResultData>).then(() => {
        loading.value = false
      })
    })
    return {
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.heading {
  word-spacing: -0.5rem;
  font-size: 3.5rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.form {
  margin-bottom: 2rem;
}

.main {
  width: 100%;
  padding: 0 5rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
}

.breadcrumb {
  margin-bottom: 2rem;
}

.footer {
  text-align: center;
  color: rgb(75, 75, 75);
}
</style>