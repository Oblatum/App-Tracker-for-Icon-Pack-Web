<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: {
    label: string;
    value: string;
  }[];
}>();

const optionListRef = ref<HTMLElement>(null);
const optionListHidden = ref(false);

const selectedLabel = computed(
  () => props.options.find((v) => v.value === props.modelValue).label,
);

let toggleAniConfs = {
  keyframes: [
    {
      height: 0,
    },
    {
      height: ``,
    },
  ],
  options: {
    timing: 200,
    duration: 200,
    easing: 'ease-in-out',
  },
};

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  toggleAniConfs.keyframes[1].height = `${optionListRef.value.clientHeight}px`;
  optionListHidden.value = true;
});

function selectItem(_: MouseEvent, item: string) {
  emit('update:modelValue', item);
}

function toggleShow() {
  optionListHidden.value ? expand() : collapse();
}

function expand() {
  optionListHidden.value = !optionListHidden.value;
  optionListRef.value.animate(toggleAniConfs.keyframes, toggleAniConfs.options);
}

function collapse() {
  optionListRef.value.animate(
    [...toggleAniConfs.keyframes].reverse(),
    toggleAniConfs.options,
  ).onfinish = () => {
    optionListHidden.value = !optionListHidden.value;
  };
}
</script>

<template>
  <div class="type-select">
    <div @click="toggleShow" class="selected">{{ selectedLabel }}</div>
    <div ref="optionListRef" class="option-list">
      <div
        @click="
          selectItem($event, item.value);
          toggleShow();
        "
        v-for="(item, index) in options"
        :hidden="optionListHidden"
        :key="index"
        class="option"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-select {
  width: 100px;
  cursor: pointer;
  position: relative;
  user-select: none;
  border-radius: 10px;
  background-color: #ffffff;
  color: #2a2f3e;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);

  .selected {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ::after {
    }
  }
  .option-list {
    position: absolute;
    width: inherit;
    top: calc(100% + 1px);
    border-radius: inherit;
    transition: all 1s;
    overflow: hidden;

    .option {
      padding: 5px 0;
      &:hover {
        color: #ffffff;
        background-color: #5763ff;
      }
    }
    z-index: 999999;
    transform: translateZ(0px);
    background-color: inherit;
  }
}
</style>
