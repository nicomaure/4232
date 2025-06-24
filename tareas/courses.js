const coursesData = [
    {
        career: "Turno Mañana",
        courses: [

            {
                name: "1º 1º",
                subjects: [
                    { name: "Ciencias Sociales: Geografía", driveLink: "https://drive.google.com/drive/folders/1M8e5tbIWPMijNWeU_fJ55TCidT9TREWC?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Lengua", driveLink: "https://drive.google.com/drive/folders/1t7b-Y9HlEKP81ojFrwUD0Bs-Gl-frhqg?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Matemática", driveLink: "https://drive.google.com/drive/folders/14S80VxF781X5EQYZel7L-8ZRdiRHb21p?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Educación Artística (B) Música", driveLink: "https://drive.google.com/drive/folders/1lTxz3EaFz17A4NWLZ2QK8a2UkGZZDF-q?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "https://drive.google.com/drive/folders/ID_DE_TU_CARPETA_HISTORIA_1_1", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Ciencias Naturales", driveLink: "https://drive.google.com/drive/folders/1kbDyo6flPDq9QdX55TFmTczOUUrngoFs?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Lengua Extranjera - Inglés", driveLink: "https://drive.google.com/drive/folders/1BjLitfq1DBOh3GtRb-zTAPHBmexDJ2L0?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Educación Artística (C) Artes Visuales", driveLink: "https://drive.google.com/drive/folders/1Hv2zZAfyA6rbQuV2apEy5ANrZokx8QhD?usp=sharing", status: "available", lastUpdated: "2025-06-22" },
                    { name: "Educación Física", driveLink: "https://drive.google.com/drive/folders/1t03K5AV3Y1Qi3xQyq_cQVzGj9PRGtDp2?usp=sharing", status: "available", lastUpdated: "2025-06-22" }
                ]
            },
            {
                name: "1º 2º",
                subjects: [
                    { name: "Lengua", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Naturales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (C) Artes Visuales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Geografía", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (B) Música", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
                ]
            },
            {
                name: "1º 3º",
                subjects: [
                    { name: "Ciencias Naturales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Geografía", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (B) Música", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (C) Artes Visuales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
                ]
            },
            {
                name: "2º 1º",
                subjects: [
                    { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Comunicación Social", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Naturales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Tecnológica", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (A) Teatro", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
                ]
            },
            {
                name: "2º 2º",
                subjects: [
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Tecnológica", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Comunicación Social", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (A) Teatro", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Naturales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
                ]
            },
            {
                name: "2º 3º",
                subjects: [
                    { name: "Lengua", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Tecnológica", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Sociales: Historia-Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Artística (A) Teatro", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Comunicación Social", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Ciencias Naturales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                    { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
                ]
            }
        ] },
{
    career: "Bachiller en Agro y Ambiente",
    courses: [
        {
            name: "3º 1º",
            subjects: [
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Biología", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Química", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Prácticas Artísticas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Agroecosistemas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Física", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Historia", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Geografía", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "3º 2º",
            subjects: [
                { name: "Agroecosistemas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Prácticas Artísticas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Biología", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Geografía", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Química", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Física", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Historia", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "3º 3º",
            subjects: [
                { name: "Física", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Historia", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Química", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Prácticas Artísticas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Biología", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Agroecosistemas", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Geografía", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "4º 1º",
            subjects: [
                { name: "Desarrollo Regional (PP 1 y PP 2)", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Biología", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Problemáticas Socioambientales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Química", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Ciencias y TIC (PP 1 y PP 2)", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Sistemas Agroambientales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "4º 2º",
            subjects: [
                { name: "Ciencias y TIC (PP 1 y PP 2)", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Sistemas Agroambientales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Química", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Biología", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Formación Ética y Ciudadana", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Problemáticas Socioambientales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Desarrollo Regional (PP 1 y PP 2)", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "5º 1º",
            subjects: [
                { name: "Procesos Productivos", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Comunicación", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Agricultura Familiar y Desarrollo Sustentable", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Taller de investigación sobre Problemáticas Ambientales y rurales locales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Economía Social", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Formación para la Vida y el Trabajo", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Organización Social de la Ruralidad", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        },
        {
            name: "5º 2º",
            subjects: [
                { name: "Lengua y Literatura", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Comunicación", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Organización Social de la Ruralidad", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Agricultura Familiar y Desarrollo Sustentable", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Formación para la Vida y el Trabajo", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Lengua Extranjera - Inglés", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Taller de investigación sobre Problemáticas Ambientales y rurales locales", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Matemática", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Procesos Productivos", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Economía Social", driveLink: "", status: "coming_soon", lastUpdated: "" },
                { name: "Educación Física", driveLink: "", status: "coming_soon", lastUpdated: "" }
            ]
        }
    ]
}
];
