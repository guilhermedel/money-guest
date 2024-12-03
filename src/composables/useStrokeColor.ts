import { ref, watch, computed } from 'vue';

export function useStrokeColor(iconColorRef: { value: string }) {
  const colorObject: Record<string, string> = {
    green: '#1BC5BD',
    blue: '#3699FF',
    red: '#F64E60',
    yellow: '#F99E26'
  }

  const strokeColor = ref(colorObject[iconColorRef.value] || '#000');

  watch(
    () => iconColorRef.value,
    (newColor: string): void => {
      strokeColor.value = colorObject[newColor] || '#000'
    },
    { immediate: true }
  );

  return { strokeColor: computed((): string => strokeColor.value) }
}
