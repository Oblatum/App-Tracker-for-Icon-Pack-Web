<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue';
import { FormInstance } from 'element-plus';
import { keySearch, regSearch, sigSearch, viewSearch } from '@/services';
const { t } = useI18n();

type DefaultFormType = 'default' | 'signature';

const selectRef = ref(null);
const currentPlaceholder = ref('search_placeholder_default');
const currentFormType = ref<DefaultFormType>('default');

const form = reactive({
  keyword: '',
  signature: '',
});

const formRef = ref(null);

const opts = reactive([
  {
    label: 'search_opt_default',
    value: 'search_opt_default',
    placeholder: 'search_placeholder_default',
  },
  {
    label: 'search_opt_regex',
    value: 'search_opt_regex',
    placeholder: 'search_placeholder_regex',
  },
  {
    label: 'search_opt_view',
    value: 'search_opt_view',
    placeholder: 'search_placeholder_view',
  },
  {
    label: 'search_opt_sig',
    value: 'search_opt_sig',
    placeholder: 'search_placeholder_default',
  },
]);

const handleSelectionChange = (value: string) => {
  for (const item of opts) {
    if (value === item.value) {
      currentFormType.value = 'default';
      currentPlaceholder.value = item.placeholder;
      inputDisabled.value = false;
      if (value === 'search_opt_sig') {
        currentFormType.value = 'signature';
      } else {
        if (value === 'search_opt_view') {
          inputDisabled.value = true;
        }
      }
    }
  }
};

const handleClickSubmit = (formEl: FormInstance) => {
  formEl.validate(async (valid) => {
    if (valid) {
      switch (selectedValue.value) {
        case 'search_opt_default':
          var res = await keySearch(form.keyword);
          console.log(res);
          break;
        case 'search_opt_regex':
          var res = await regSearch(form.keyword);
          console.log(res);
          
          break;
        case 'search_opt_view':
          var res = await viewSearch();
          console.log(res);
          
          break;
        case 'search_opt_sig':
          var res = await sigSearch(form.signature, form.keyword)
          console.log(res);
          
          break;
        default:
          break;
      }
    }
  });
};

const selectedValue = ref('search_opt_default');
const inputDisabled = ref(false);
const ruleRequired = computed(() => selectedValue.value === 'search_opt_sig' || 'search_opt_view' ? false : true)
onMounted(() => {
  handleSelectionChange(selectedValue.value);
});
</script>

<template>
  <el-form :model="form" ref="formRef">
    <el-row>
      <el-col>
        <el-form-item prop="keyword" :rules="[{ required: ruleRequired }]">
          <el-input
            :placeholder="t(currentPlaceholder)"
            :disabled="inputDisabled"
            v-model="form.keyword"
          />
        </el-form-item>
        <el-form-item
          v-if="currentFormType === 'signature'"
          prop="signature"
          :rules="[{ required: true }]"
        >
          <el-input
            :placeholder="t('search_placeholder_sig')"
            v-model="form.signature"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item>
          <el-select
            class="select"
            ref="selectRef"
            v-model="selectedValue"
            @change="handleSelectionChange"
          >
            <el-option
              v-for="option in opts"
              :key="option.value"
              :label="t(option.label)"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item>
          <el-button
            class="submit"
            :icon="Search"
            @click="handleClickSubmit(formRef!)"
          ></el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.select {
  width: 120px;
}
.submit {
  padding: 8px;
}
</style>
