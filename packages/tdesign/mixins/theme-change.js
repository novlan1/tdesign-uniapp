import { appBaseInfo } from '../common/utils';
// #ifdef VUE3
import { ref, onBeforeMount } from 'vue';
// #endif

export const useTheme = () => {
  const theme = ref('light');
  const initTheme = () => {
    theme.value = appBaseInfo.theme;
    if (typeof uni.onThemeChange !== 'function') return;
    uni.onThemeChange((t) => {
      theme.value = t.theme;
    });
  };

  onBeforeMount(() => {
    initTheme();
  });

  return {
    theme,
  };
};


export const themeMixin = {
  data() {
    return {
      theme: 'light',
    };
  },
  mounted() {
    this.theme = appBaseInfo.theme;
    if (typeof uni.onThemeChange !== 'function') return;
    uni.onThemeChange((t) => {
      this.theme = t.theme;
    });
  },
};
