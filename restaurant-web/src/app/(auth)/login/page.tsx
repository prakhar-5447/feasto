import styles from './page.module.sass';
import LoginForm from '@/features/auth/components/login-form/login-form';

export default function AuthPage() {
    return (
        <main className={styles.auth}>
            {/* Desktop branding panel */}

            <section className={styles.branding}>
                <div className={styles.brandingTop}>
                    <div className={styles.logo}>
                        <span>F</span>
                    </div>

                    <div className={styles.brand}>
                        <div className={styles.brandName}>
                            Feasto
                        </div>

                        <div className={styles.brandSubtitle}>
                            Partner Portal
                        </div>
                    </div>
                </div>

                <div className={styles.brandingContent}>
                    <div>
                        <h1>
                            Manage your restaurant,
                            <br />
                            your way.
                        </h1>

                        <p>
                            Track orders in real time, update your
                            menu instantly, read customer feedback,
                            and grow your business — all from one
                            dashboard.
                        </p>
                    </div>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>
                                📦
                            </span>

                            <span>
                                Live order management with driver
                                tracking
                            </span>
                        </div>

                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>
                                📊
                            </span>

                            <span>
                                Revenue analytics and peak-hour
                                insights
                            </span>
                        </div>

                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>
                                🍽️
                            </span>

                            <span>
                                Menu editor with availability
                                controls
                            </span>
                        </div>
                    </div>
                </div>

                <p className={styles.copyright}>
                    © 2026 Feasto Technologies Pvt. Ltd. · All
                    rights reserved
                </p>
            </section>

            {/* Login section */}

            <section className={styles.loginSection}>
                <div className={styles.loginContainer}>
                    {/* Mobile branding */}

                    <div className={styles.mobileBrand}>
                        <div className={styles.mobileLogo}>
                            <span>F</span>
                        </div>

                        <span>
                            Feasto Partner Portal
                        </span>
                    </div>

                    <div className={styles.loginCard}>
                        <div className={styles.header}>
                            <h2>
                                Sign in to your account
                            </h2>

                            <p>
                                Use the credentials issued by the
                                Feasto admin team.
                            </p>
                        </div>

                        <LoginForm />
                    </div>

                    <p className={styles.support}>
                        Having trouble? Contact{' '}
                        <a href="mailto:support@feasto.in">
                            support@feasto.in
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
}