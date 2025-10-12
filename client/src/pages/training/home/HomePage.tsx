import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent } from '@/shared/ui/Card';
import { BookOpen, Menu, Book, Landmark, Scale } from 'lucide-react';
import { startQuiz } from '@/shared/api/quiz';
import styles from './HomePage.module.css';

// Определяем наши категории
const categories = [
  { id: 'language', name: 'Грузинский язык', icon: <Book /> },
  { id: 'history', name: 'История Грузии', icon: <Landmark /> },
  { id: 'law', name: 'Право Грузии', icon: <Scale /> },
];

export function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategorySelect = async (categoryId: string) => {
    setIsLoading(categoryId);
    setError(null);
    try {
      const { sessionId, question } = await startQuiz({ category: categoryId });
      navigate('/training', {
        state: { sessionId, initialQuestion: question },
      });
    } catch (err) {
      console.error('Failed to start quiz session:', err); // Логируем ошибку
      setError('Не удалось начать сессию. Попробуйте снова.');
      setIsLoading(null);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <motion.div
        className={styles.bgIllustration}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
      />

      <motion.header
        className={styles.header}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className={styles.logoText}>Симулятор</h1>
        </div>
        <nav className={styles.navDesktop}>
          <Link to="/" className={styles.navLink}>
            Главная
          </Link>
        </nav>
        <div className={styles.menuButton}>
          <Menu className="w-6 h-6" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
        {menuOpen && (
          <motion.div
            className={styles.navMobile}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Главная
            </Link>
          </motion.div>
        )}
      </motion.header>

      <motion.main
        className={styles.mainContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.title}>Выберите тему для тренировки</h2>
        <p className={styles.subtitle}>
          Каждый тест состоит из 10 случайных вопросов.
        </p>

        {/* --- СЕКЦИЯ ВЫБОРА КАТЕГОРИИ --- */}
        <div className={styles.cardGrid}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={styles.categoryCard}>
                <CardContent>
                  <div className={styles.iconWrapper}>{category.icon}</div>
                  <h2 className={styles.categoryName}>{category.name}</h2>
                  <Button
                    onClick={() => handleCategorySelect(category.id)}
                    disabled={isLoading === category.id}
                    className={styles.startButton}
                  >
                    {isLoading === category.id ? 'Загрузка...' : 'Начать'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </motion.main>

      {/* ... декоративные эффекты ... */}
    </div>
  );
}
