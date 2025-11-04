// select.types.ts
export interface LoadingProps {
  delay?: number;
  duration?: number;
}

export type LoadingEmits = {
  reload: () => void
};


declare const LoadingComponent: import('vue').DefineComponent<LoadingProps, {}, {}, {}, {}, {}, {}, LoadingEmits, any>;
export default LoadingComponent;

