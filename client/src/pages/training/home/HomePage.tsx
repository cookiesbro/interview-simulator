import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <-- ЗАМЕНА
import { Button } from '@/shared/ui/Button'; // <-- НАШИ КОМПОНЕНТЫ
import { Card, CardContent } from '@/shared/ui/Card'; // <-- НАШИ КОМПОНЕНТЫ
import { BookOpen, Award, Menu } from 'lucide-react';
import styles from './HomePage.module.css'; // <-- НАШИ СТИЛИ

export function HomePage() {
  const userName = 'Soleil'; // В будущем можно брать из Telegram SDK
  const stats = {
    testsPassed: 12, // В будущем можно брать с бэкенда
    score: 940,
  };
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/training" className={styles.navLink}>
            Тренировка
          </Link>
          <Link to="/stats" className={styles.navLink}>
            Статистика
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
            <Link to="/training" onClick={() => setMenuOpen(false)}>
              Тренировка
            </Link>
            <Link to="/stats" onClick={() => setMenuOpen(false)}>
              Статистика
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
        <h2 className={styles.title}>Добро пожаловать, {userName}!</h2>
        <p className={styles.subtitle}>
          Продолжай тренировки и стань экспертом 🇬🇪
        </p>

        <div className={styles.statsContainer}>
          <Card className={styles.statCard}>
            <CardContent>
              {/* Добавляем класс для первой иконки */}
              <Award className={`${styles.icon} ${styles.iconIndigo}`} />
              <p className={styles.statLabel}>Пройдено тестов</p>
              <span className={styles.statValue}>{stats.testsPassed}</span>
            </CardContent>
          </Card>
          <Card className={styles.statCard}>
            <CardContent>
              {/* Добавляем класс для второй иконки */}
              <Award className={`${styles.icon} ${styles.iconYellow}`} />
              <p className={styles.statLabel}>Текущий балл</p>
              <span className={styles.statValue}>{stats.score}</span>
            </CardContent>
          </Card>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/training">
            <Button size="lg">Перейти к тренировке</Button>
          </Link>
        </motion.div>
      </motion.main>

      <motion.div
        className={`${styles.decorator} ${styles.decorator1}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className={`${styles.decorator} ${styles.decorator2}`}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
    </div>
  );
}
