import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      children: React.ReactNode;
      size?: 'lg';
    }

    export const Button = ({ children, className, size, ...props }: ButtonProps) => {
      const sizeClass = size === 'lg' ? styles.lg : '';
      return (
        <button className={`${styles.button} ${sizeClass} ${className}`} {...props}>
          {children}
        </button>
      );
    };