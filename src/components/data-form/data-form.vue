<script lang="ts" setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { defaultForm, signatureForm } from './form-types';
import type { ElSelect } from 'element-plus';
const { t } = useI18n();

const selectRef = ref(null);
const currentPlaceholder = ref('');

const opts = reactive([
  {
    label: t('search_opt_default'),
    value: 'search_opt_default',
    placeholder: t('search_placeholder_default'),
  },
  {
    label: t('search_opt_regex'),
    value: 'search_opt_regex',
    placeholder: t('search_placeholder_regex'),
  },
  {
    label: t('search_opt_view'),
    value: 'search_opt_view',
    placeholder: t('search_placeholder_view'),
  },
  {
    label: t('search_opt_sig'),
    value: 'search_opt_sig',
    placeholder: t('search_placeholder_sig'),
  },
]);

const currentComponent = shallowRef(defaultForm);

const handleSelectionChange = (value: string) => {
  for (const item of opts) {
    if (value === item.value) {
      currentPlaceholder.value = item.placeholder;
      if (value === 'search_opt_sig') {
        inputDisabled.value = false;
        currentComponent.value = signatureForm;
      } else {
        if (value === 'search_opt_view') {
          inputDisabled.value = true;
        } else {
          inputDisabled.value = false;
        }
        currentComponent.value = defaultForm;
      }
    }
  }
};

const selectedValue = ref('search_opt_default');
const inputDisabled = ref(false);
onMounted(() => {
  handleSelectionChange(
    (selectRef.value as unknown as typeof ElSelect).selected.value
  );
});
</script>

<template>
  <el-form>
    <el-form-item>
      <el-select
        ref="selectRef"
        v-model="selectedValue"
        @change="handleSelectionChange"
      >
        <el-option
          v-for="option in opts"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
    </el-form-item>
    <component
      :is="currentComponent"
      :placeholder="currentPlaceholder"
      :inputDisabled="inputDisabled"
    ></component>
    <el-form-item>
      <el-button>{{ t('search') }}</el-button>
    </el-form-item>
  </el-form>
</template>
