INSERT INTO videos (id, title, category, description, video_url)
VALUES
(
    1,
    'South Carolina Payroll Tax Filing: Forms & Deadlines',
    'Deadlines',
    'Learn about South Carolina payroll tax forms, filing requirements, and important deadlines.',
    'https://www.youtube.com/watch?v=eQYxKIvF06w'
),
(
    2,
    'How to E-file 1099-NEC for 2026 in 3 Simple Steps | Step by Step Filing Guide',
    '1099s',
    'Learn how to electronically file Form 1099-NEC for 2026 using TaxBandits in three simple steps.',
    'https://www.youtube.com/watch?v=7rL85xXVWWo'
),
(
    3,
    'Getting Started with TaxBandits: Your Step-by-Step Guide to Tax Compliance',
    'Getting Started',
    'Learn how to get started with TaxBandits and navigate the platform with this step-by-step guide to tax compliance.',
    'https://www.youtube.com/watch?v=-9VH42jH2sk'
),
(
    4,
    'How To File Form W-2G with TaxBandits.com',
    'W-2',
    'Learn how to prepare and electronically file Form W-2G using TaxBandits.',
    'https://www.youtube.com/watch?v=0gXFkiiF6hk'
),
(
    5,
    'How to Correct a W-2 Form Online | Step-by-Step W-2c Filing (2026)',
    'W-2',
    'Learn how to correct errors on a previously filed W-2 by electronically filing Form W-2c.',
    'https://www.youtube.com/watch?v=AcqTX8lcO1M'
);

SELECT setval(
    pg_get_serial_sequence('videos', 'id'),
    (SELECT MAX(id) FROM videos)
);
