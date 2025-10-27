import { appBaseInfo } from '../common/utils';
import { ref, onBeforeMount } from 'vue';

export const useTheme = () => {
  const theme = ref('light');
  const initTheme = () => {
    theme.value = appBaseInfo.theme;
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
    uni.onThemeChange((t) => {
      this.theme = t.theme;
    });
  },
};
