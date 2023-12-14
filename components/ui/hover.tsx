import styles from './hover.module.css';

function HoverRoot(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={
        props.className
          ? `${props.className}, ${styles.HoverRoot}`
          : styles.HoverRoot
      }
    />
  );
}

function HoverShow(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={
        props.className
          ? `${props.className}, ${styles.HoverShow}`
          : styles.HoverShow
      }
    />
  );
}

export const Hover = {
  Root: HoverRoot,
  Show: HoverShow,
};
