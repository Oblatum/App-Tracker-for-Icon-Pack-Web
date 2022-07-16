<script lang="ts" setup>
import { onMounted, reactive, ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { defaultForm, type DefaultFormType } from './form-types';
import type { ElSelect } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { log } from 'console';
const { t } = useI18n();

const selectRef = ref(null);
const currentPlaceholder = ref('');
const currentFormType = ref<DefaultFormType>('default');

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
    placeholder: t('search_placeholder_default'),
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

const handleClickSubmit = () => {
  
}

const submitForm = () => {
  
}

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
    <el-row>
      <el-col>
        <default-form
          :placeholder="currentPlaceholder"
          :inputDisabled="inputDisabled"
          :type="currentFormType"
        />
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
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item>
          <el-button class="submit" :icon="Search" @click="handleClickSubmit"></el-button>
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
