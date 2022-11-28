import { ref, onMounted, onBeforeUnmount } from "vue";

//Calculate the avaliable space on window resize
export const useWindowSize = () => {
  const windowWidth = ref<number>(0);

  const onResize = () => {
    windowWidth.value = document.documentElement.clientWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });

  return {
    windowWidth,
  };
};
