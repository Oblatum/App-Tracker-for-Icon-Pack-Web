import { defineComponent, PropType, ref } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';
import { useI18n } from 'vue-i18n';

export type DefaultFormType = 'default' | 'signature';

export const defaultForm = defineComponent({
  props: {
    type: {
      type: String as PropType<DefaultFormType>,
      default: 'default',
    },
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
      t,
    };
  },
  render() {
    return (
      <>
        <ElFormItem>
          <ElInput
            v-model={this.keywordInputValue}
            placeholder={this.$props.placeholder}
            disabled={this.inputDisabled}
          />
        </ElFormItem>
        {this.$props.type === 'default' ? null : (
          <ElFormItem>
            <ElInput
              v-model={this.signatureInputValue}
              placeholder={this.t('search_placeholder_sig')}
            />
          </ElFormItem>
        )}
      </>
    );
  },
});
