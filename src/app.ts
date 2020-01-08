export const dva = {
  config: {
    onError(e: { preventDefault: Function }) {
      e.preventDefault();
    },
  },
};
