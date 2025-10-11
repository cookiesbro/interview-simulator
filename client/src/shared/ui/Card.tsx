import styles from './Card.module.css';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.content} ${className}`}>{children}</div>;
};
