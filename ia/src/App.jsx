import React, { useState, useEffect } from 'react';
import {
    Book, Lightbulb, Palette, Music, Code, ShieldCheck, Zap, Bot, Search, Pencil, Mic,
    MessageSquare, LayoutGrid, GraduationCap, Brain, Compass, Award, Building2,
    Rocket, Server, Globe, Sparkles, FolderOpen, Puzzle, MonitorSpeaker, Factory,
    Share2, Shield, Eye, Lock, UserCheck, Scale, ScrollText
} from 'lucide-react';

// Un objeto para mapear nombres de iconos a componentes de Lucide React
const icons = {
    Book, Lightbulb, Palette, Music, Code, ShieldCheck, Zap, Bot, Search, Pencil, Mic,
    MessageSquare, LayoutGrid, GraduationCap, Brain, Compass, Award, Building2,
    Rocket, Server, Globe, Sparkles, FolderOpen, Puzzle, MonitorSpeaker, Factory,
    Share2, Shield, Eye, Lock, UserCheck, Scale, ScrollText
};

// Datos de las herramientas de IA
const academicTools = [
    {
        name: "ChatGPT",
        description: "IA Conversacional, lluvia de ideas y explicaciones. Un aliado para tus tareas.",
        icon: "MessageSquare",
        link: "https://chat.openai.com/chat",
        notes: "Funciones básicas gratuitas. Versión Plus de pago con descuentos limitados por región."
    },
{
    name: "Perplexity AI",
    description: "Búsqueda con IA y descubridor de información con fuentes transparentes.",
    icon: "Search",
    link: "https://www.perplexity.ai/",
    notes: "Búsquedas rápidas ilimitadas. La versión Pro ofrece más funcionalidades."
},
{
    name: "Grammarly",
    description: "Mejora tu escritura, corrige gramática y ortografía. ¡Para textos impecables!",
    icon: "Pencil",
    link: "https://www.grammarly.com/",
    notes: "Funciones básicas gratuitas. Premium para revisiones avanzadas."
},
{
    name: "QuillBot",
    description: "Parafrasea, resume y ajusta el tono de tus textos. Incluye corrector y detector de plagio.",
    icon: "ScrollText",
    link: "https://quillbot.com/",
    notes: "Funciones básicas gratuitas. Puede simplificar ideas complejas."
},
{
    name: "Otter.AI",
    description: "Transcribe clases y organiza tus notas en tiempo real.",
    icon: "Mic",
    link: "https://otter.ai/",
    notes: "Funciones básicas gratuitas para transcripción en tiempo real."
},
{
    name: "Google Gemini",
    description: "Asistente personal para gestión de tareas, planificación y creación de contenido.",
    icon: "Lightbulb",
    link: "https://gemini.google.com/",
    notes: "Gratuito limitado con cuenta escolar. Algunas funciones avanzadas son para mayores de 18 o restringidas por región."
},
{
    name: "Microsoft Copilot",
    description: "Compañero de IA con integración de apps de productividad y generación de imágenes.",
    icon: "Bot",
    link: "https://copilot.microsoft.com/",
    notes: "Chat de IA seguro gratuito para mayores de 13 con controles de TI. M365 Copilot es un complemento de pago."
},
{
    name: "Notion AI",
    description: "Resume notas, optimiza horarios y organiza tus estudios. Ideal para gestión de proyectos.",
    icon: "FolderOpen",
    link: "https://www.notion.so/product/ai",
    notes: "Plan Plus gratuito con correo electrónico escolar."
},
{
    name: "Quizlet",
    description: "Flashcards, juegos y rutas de estudio personalizadas. ¡Aprende de forma divertida!",
    icon: "GraduationCap",
    link: "https://quizlet.com/",
    notes: "Funciones básicas gratuitas. Plan 'Starter' gratuito para profesores."
},
{
    name: "Socratic AI (Terceros)",
    description: "Ayuda con tareas escolares y ofrece soluciones paso a paso. ¡Foto matemática incluida!",
    icon: "Puzzle",
    link: "https://socratic.org/ (Nota: La aplicación actual puede ser de terceros)",
    notes: "Escaneos/funciones gratuitas limitadas. El Socratic original de Google fue descontinuado."
}
];

const creativeTools = [
    {
        name: "Canva",
        description: "Diseño gráfico y creación de contenido visual con Magic Write (generación de texto a imagen).",
        icon: "Palette",
        link: "https://www.canva.com/es_ar/",
        notes: "Versión gratuita completa para profesores y estudiantes K-12."
    },
{
    name: "StarryAI",
    description: "Genera arte con IA a partir de texto. ¡Crea tus propias obras maestras!",
    icon: "Sparkles",
    link: "https://starryai.com/",
    notes: "5 obras de arte al día gratuitas (sin marcas de agua)."
},
{
    name: "Deep Dream Generator",
    description: "Transforma tus fotos en imágenes artísticas impresionantes con IA.",
    icon: "Eye",
    link: "https://deepdreamgenerator.com/",
    notes: "Funciones básicas gratuitas. Basado en web."
},
{
    name: "Craiyon (antes DALL-E mini)",
    description: "Generación ilimitada de imágenes con IA a partir de descripciones de texto.",
    icon: "Rocket",
    link: "https://www.craiyon.com/",
    notes: "Gratuito (con anuncios). Los usuarios conservan los derechos, se solicita crédito."
},
{
    name: "Storybird AI",
    description: "Narración inspirada en el arte con sugerencias de escritura y miles de ilustraciones.",
    icon: "Book",
    link: "https://storybird.com/",
    notes: "Funciones básicas gratuitas. Se centra en la narración visual."
},
{
    name: "AI Dungeon",
    description: "Juego de aventura de texto interactivo. ¡Crea tus propias historias con IA!",
    icon: "Compass",
    link: "https://play.aidungeon.io/",
    notes: "Funciones básicas gratuitas (acciones diarias limitadas). La generación de imágenes es premium."
},
{
    name: "MyTunes / Generadores de Música IA",
    description: "Crea música con IA a partir de texto, transforma voces y genera efectos de sonido.",
    icon: "Music",
    link: "https://aitoptools.com/category/ai-music-generator/", // Enlace a una lista general, ya que MyTunes no es una herramienta única y definida para enlazar
    notes: "Varía según la app específica; a menudo con anuncios o compras dentro de la app."
},
{
    name: "AIMusic.so",
    description: "Crea música libre de regalías, letras y videos con IA a partir de texto.",
    icon: "MonitorSpeaker",
    link: "https://aimusic.so/",
    notes: "Gratuito para funciones básicas (sin registro)."
},
{
    name: "Google Teachable Machine",
    description: "Entrena modelos de IA (clasificación de imágenes, sonidos, poses) ¡sin necesidad de código!",
    icon: "Brain",
    link: "https://teachablemachine.withgoogle.com/",
    notes: "Gratuito. Excelente para introducir conceptos de IA de forma práctica."
},
{
    name: "Scratch Lab Face Sensing",
    description: "Crea juegos y disfraces que interactúan con caras usando bloques de código. ¡Ideal para principiantes!",
    icon: "Code",
    link: "https://lab.scratch.mit.edu/face-sensing/",
    notes: "Gratuito. Requiere navegador con acceso a cámara web."
},
{
    name: "Proyectos de IA Science Buddies",
    description: "Ideas y tutoriales de proyectos de IA y Machine Learning, algunos sin codificación.",
    icon: "Factory",
    link: "https://www.sciencebuddies.org/science-fair-projects/project-ideas/ai-ml",
    notes: "Gratuito. Proporciona comprensión conceptual y marcos de proyectos."
},
{
    name: "IBM SkillsBuild AI Learning Path",
    description: "Cursos fundamentales de IA a tu propio ritmo con proyectos prácticos (¡construye tu propio Chatbot!).",
    icon: "Building2",
    link: "https://skillsbuild.org/",
    notes: "Gratuito. Bueno para el aprendizaje estructurado de los fundamentos de la IA."
}
];

const noCodeTools = [
    {
        name: "Thunkable",
        description: "Crea apps móviles para iOS y Android con una interfaz de arrastrar y soltar, sin código.",
        icon: "Share2",
        link: "https://thunkable.com/",
        notes: "Opción 'Comenzar gratis'. Excelente para educación."
    },
{
    name: "Glide",
    description: "Transforma Hojas de Cálculo de Google en potentes aplicaciones móviles. ¡Ideal para prototipos rápidos!",
    icon: "LayoutGrid",
    link: "https://www.glideapps.com/",
    notes: "Plan gratuito para hasta 10 usuarios personales. Requiere familiaridad con hojas de cálculo."
},
{
    name: "Adalo",
    description: "Potente creador de apps con interfaz de arrastrar y soltar para apps móviles y web funcionales.",
    icon: "Server",
    link: "https://www.adalo.com/",
    notes: "Construcción gratuita, pago para publicar en tiendas de apps."
},
{
    name: "Notion",
    description: "Aunque es un espacio de trabajo, su flexibilidad te permite construir guías interactivas y 'mini-apps' internas.",
    icon: "FolderOpen",
    link: "https://www.notion.so/",
    notes: "Plan educativo gratuito."
},
{
    name: "Webflow",
    description: "Diseña y lanza sitios web personalizados sin código. Ideal para guías altamente interactivas.",
    icon: "Globe",
    link: "https://webflow.com/",
    notes: "Plan de sitio CMS anual gratuito para estudiantes y cuenta de espacio de trabajo gratuita para educadores."
}
];


// Componente Tarjeta de Herramienta
const ToolCard = ({ tool }) => {
    const IconComponent = icons[tool.icon] || Lightbulb; // Icono por defecto si no se encuentra
    return (
        <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
        flex flex-col items-start text-left group border border-blue-100 hover:border-blue-300"
        >
        <div className="flex items-center mb-4">
        <IconComponent size={32} className="text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
        <h3 className="ml-4 text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-300">
        {tool.name}
        </h3>
        </div>
        <p className="text-gray-600 text-sm mb-3 flex-grow">{tool.description}</p>
        {tool.notes && (
            <p className="text-gray-500 text-xs mt-auto">
            <span className="font-semibold">Notas:</span> {tool.notes}
            </p>
        )}
        <span className="mt-4 text-blue-500 text-sm font-semibold group-hover:underline">
        Explorar →
        </span>
        </a>
    );
};

// Componente Sección de Herramientas (reutilizable)
const ToolSection = ({ id, title, description, tools }) => (
    <section id={id} className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6 drop-shadow-sm">
    {title}
    </h2>
    <p className="text-lg text-gray-700 text-center mb-10 max-w-2xl mx-auto">
    {description}
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {tools.map((tool, index) => (
        <ToolCard key={index} tool={tool} />
    ))}
    </div>
    </div>
    </section>
);

// Componente Sección de Uso Ético
const EthicalAISection = ({ id }) => (
    <section id={id} className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-teal-50">
    <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-indigo-800 mb-6 drop-shadow-sm">
    Uso Ético de la IA y Ciudadanía Digital
    </h2>
    <p className="text-lg text-gray-700 mb-10">
    Usar la Inteligencia Artificial de forma responsable es clave. Aquí te dejamos algunos puntos importantes para ser un ciudadano digital ejemplar.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
    <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100">
    <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
    <ShieldCheck size={28} className="mr-3 text-green-500" />
    Integridad y Verificación
    </h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><span className="font-semibold">Cuestiona y verifica:</span> La IA puede dar información incorrecta o sesgada. ¡Siempre verifica con fuentes fiables!</li>
    <li><span className="font-semibold">Transparencia:</span> Si usas IA en tus tareas, sé honesto y menciona cómo la utilizaste.</li>
    <li><span className="font-semibold">Ampliación, no reemplazo:</span> La IA está para enriquecer tu aprendizaje, no para que deje de pensar o esforzarse.</li>
    </ul>
    </div>

    <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100">
    <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
    <Lock size={28} className="mr-3 text-red-500" />
    Privacidad y Sesgos
    </h3>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li><span className="font-semibold">Protege tus datos:</span> La información que ingresas en chatbots a menudo no es privada. Ten cuidado al compartir datos personales.</li>
    <li><span className="font-semibold">Identifica sesgos:</span> Los modelos de IA aprenden de datos humanos y pueden perpetuar estereotipos. Aprende a identificarlos y analizarlos.</li>
    <li><span className="font-semibold">Regulaciones locales:</span> Argentina tiene guías sobre IA responsable, enfocándose en la transparencia y protección de datos. ¡Infórmate!</li>
    </ul>
    </div>
    </div>

    <div className="mt-12 bg-indigo-50 p-6 rounded-lg border border-indigo-200 text-indigo-800 text-base font-medium">
    <p className="flex items-center justify-center">
    <Award size={24} className="mr-2" />
    Recuerda: la clave es guiar, no restringir. Con una buena orientación, la IA puede ser una herramienta poderosa y ética.
    </p>
    </div>
    </div>
    </section>
);


// Componente Principal de la Aplicación
const App = () => {
    const [activeSection, setActiveSection] = useState('inicio');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        // Scroll to the active section when it changes, useful for direct links/initial load
        document.getElementById(activeSection)?.scrollIntoView({ behavior: 'smooth' });
    }, [activeSection]);

    return (
        <div className="font-inter antialiased text-gray-900 bg-gray-50">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg py-4">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
        <img src="https://placehold.co/40x40/ffffff/000000?text=AI" alt="Logo IA" className="rounded-full mr-3" />
        <span className="text-white text-xl font-bold">4-232 Teresa Ghilardi</span>
        </div>

        {/* Menú para pantallas grandes */}
        <ul className="hidden md:flex space-x-8">
        <li><button onClick={() => handleNavClick('inicio')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg">Inicio</button></li>
        <li><button onClick={() => handleNavClick('academicas')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg">Académicas</button></li>
        <li><button onClick={() => handleNavClick('creativas')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg">Creativas</button></li>
        <li><button onClick={() => handleNavClick('etica')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg">Uso Ético</button></li>
        <li><button onClick={() => handleNavClick('nocode')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg">Crea tu IA</button></li>
        </ul>

        {/* Botón de menú hamburguesa para móviles */}
        <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white focus:outline-none"
        >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        )}
        </svg>
        </button>
        </nav>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
            <div className="md:hidden bg-blue-700 py-3 mt-2 rounded-b-lg shadow-md">
            <ul className="flex flex-col items-center space-y-3">
            <li><button onClick={() => handleNavClick('inicio')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg w-full text-center py-2">Inicio</button></li>
            <li><button onClick={() => handleNavClick('academicas')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg w-full text-center py-2">Académicas</button></li>
            <li><button onClick={() => handleNavClick('creativas')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg w-full text-center py-2">Creativas</button></li>
            <li><button onClick={() => handleNavClick('etica')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg w-full text-center py-2">Uso Ético</button></li>
            <li><button onClick={() => handleNavClick('nocode')} className="text-white hover:text-blue-200 transition-colors duration-200 font-medium text-lg w-full text-center py-2">Crea tu IA</button></li>
            </ul>
            </div>
        )}
        </header>

        {/* Hero Section */}
        <section id="inicio" className="relative flex items-center justify-center min-h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-700 to-purple-800 text-white p-6 md:p-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Fondo con patrón */}
        <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-down drop-shadow-lg">
        ¡IA para los estudiantes de la Ghilardi!
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up">
        Descubre el poder de la Inteligencia Artificial para potenciar tu aprendizaje, desatar tu creatividad y prepararte para el futuro.
        </p>
        <button
        onClick={() => handleNavClick('academicas')}
        className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-blue-900 text-lg font-bold rounded-full shadow-xl
        hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 ease-out animate-bounce-once"
        >
        Empieza a Explorar <Zap size={24} className="ml-3" />
        </button>
        </div>
        </section>

        {/* Secciones de Herramientas */}
        <ToolSection
        id="academicas"
        title="Herramientas Académicas Esenciales"
        description="Potencia tus estudios, organiza tus tareas y explora nuevas formas de aprender con estas increíbles herramientas de IA."
        tools={academicTools}
        />
        <ToolSection
        id="creativas"
        title="IA para la Creatividad y STEM"
        description="Despierta tu artista interior, compone música, experimenta con código y explora el mundo de la ciencia con la IA."
        tools={creativeTools}
        />

        {/* Sección de Uso Ético */}
        <EthicalAISection id="etica" />

        {/* Sección Crea tu Propia IA (No-Code) */}
        <ToolSection
        id="nocode"
        title="Crea tu Propia IA (¡Sin Código!)"
        description="¿Te imaginas construir tu propia aplicación o proyecto de IA? Estas herramientas te permiten hacerlo sin saber programar."
        tools={noCodeTools}
        />

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg font-semibold mb-2">
        Desarrollado por el Profesor Nicolás Maure.
        </p>
        <p className="text-gray-400 text-sm mb-4">
        Mendoza, Argentina
        </p>
        <p className="text-gray-500 text-xs">
        Esta guía se enfoca en herramientas de IA gratuitas o con planes educativos para estudiantes. La disponibilidad puede variar.
        </p>
        <p className="mt-6 text-gray-500 text-xs">
        © {new Date().getFullYear()} Escuela 4-232 Teresa Ghilardi. Todos los derechos reservados.
        </p>
        </div>
        </footer>
        </div>
    );
};

export default App;

