import { defineComponent, PropType, ref } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';
import { useI18n } from 'vue-i18n';

export const defaultForm = defineComponent({
  props: {
    placeholder: {
      type: String as PropType<string>,
    },
    inputDisabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup() {
    const keywordInputValue = ref('');

    return {
      keywordInputValue,
    };
  },
  render() {
    return (
      <>
        <ElFormItem>
          <ElInput
            v-model={this.keywordInputValue}
            placeholder={this.$props.placeholder}
            disabled={this.$props.inputDisabled}
          />
        </ElFormItem>
      </>
    );
  },
});

export const signatureForm = defineComponent({
  props: {
    placeholder: {
      type: String as PropType<string>,
    },
    inputDisabled: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup() {
    const keywordInputValue = ref('');
    const signatureInputValue = ref('');
    const { t } = useI18n();

    return {
      keywordInputValue,
      signatureInputValue,
      t
    };
  },
  render() {
    return (
      <>
        <ElFormItem>
          <ElInput
            v-model={this.keywordInputValue}
            placeholder={this.$props.placeholder}
          />
        </ElFormItem>
        <ElFormItem>
          <ElInput v-model={this.signatureInputValue} placeholder={ this.t('search_placeholder_default') } />
        </ElFormItem>
      </>
    );
  },
});
