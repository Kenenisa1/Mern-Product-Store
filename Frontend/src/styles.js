const styles = {
    // --- Layout & Container Styles ---
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    containerNarrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    
    // --- Flex & Grid Utilities ---
    flexCenter: "flex items-center justify-center",
    flexBetween: "flex items-center justify-between",
    flexStart: "flex items-center justify-start",
    flexEnd: "flex items-center justify-end",
    gridCenter: "grid place-items-center",
    
    // --- Spacing & Padding ---
    sectionPadding: "py-12 sm:py-16 lg:py-20",
    cardPadding: "p-6 sm:p-8",
    buttonPadding: "px-5 py-2.5",
    
    // --- Typography & Text Styles ---
    // Headers
    h1: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900",
    h2: "text-3xl sm:text-4xl font-bold text-gray-900",
    h3: "text-2xl sm:text-3xl font-semibold text-gray-800",
    h4: "text-xl font-semibold text-gray-800",
    
    // Subtitles & Paragraphs
    subtitle: "text-lg text-gray-600 leading-relaxed",
    body: "text-base text-gray-700 leading-normal",
    small: "text-sm text-gray-500",
    
    // Gradient Text
    gradientText: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
    
    // --- Link Styles ---
    primaryLink: "text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300 hover:underline decoration-2 underline-offset-4",
    secondaryLink: "text-gray-600 hover:text-gray-900 transition-colors duration-300",
    navLink: "text-white hover:text-blue-600 transition-colors duration-400 font-medium px-3 py-2 rounded-lg hover:underline hover:decoration-2 hover:underline-offset-2",
    
    // --- Button Styles ---
    // Primary Button: Strong gradient background
    primaryButton: "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer",
    
    // Secondary Button: Outline with hover effect
    secondaryButton: "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 transition-all duration-300 hover:border-indigo-700 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer",
    
    // Ghost Button: Minimal
    ghostButton: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white  hover:underline hover:decoration-2 hover:underline-offset-2 rounded-lg transition-colors duration-300 cursor-pointer",
    
    // Danger Button
    dangerButton: "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-lg hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer",
    
    // --- Form Styles ---
    formContainer: "w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10",
    formContainerSmall: "w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8",
    
    // Input Fields
    input: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 placeholder:text-gray-400",
    inputError: "w-full px-4 py-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-red-50",
    inputLabel: "block text-sm font-medium text-gray-700 mb-2",
    inputHelper: "mt-2 text-sm text-gray-500",
    inputErrorText: "mt-2 text-sm text-red-600",
    
    // Select
    select: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 bg-white cursor-pointer",
    
    // --- Card Styles ---
    card: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100",
    cardElevated: "bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-0",
    cardMinimal: "bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-300",
    
    // --- Badge & Tag Styles ---
    badge: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
    badgePrimary: "bg-indigo-100 text-indigo-800",
    badgeSuccess: "bg-emerald-100 text-emerald-800",
    badgeWarning: "bg-amber-100 text-amber-800",
    badgeDanger: "bg-red-100 text-red-800",
    
    // --- Table Styles ---
    table: "min-w-full divide-y divide-gray-200",
    tableHeader: "bg-gray-50",
    tableCell: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    
    // --- Alert & Notification Styles ---
    alert: "rounded-lg p-4 border",
    alertSuccess: "bg-emerald-50 border-emerald-200 text-emerald-800",
    alertError: "bg-red-50 border-red-200 text-red-800",
    alertWarning: "bg-amber-50 border-amber-200 text-amber-800",
    alertInfo: "bg-blue-50 border-blue-200 text-blue-800",
    
    // --- Loading & Skeleton ---
    skeleton: "animate-pulse bg-gray-200 rounded",
    spinner: "animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600",
    
    // --- Icon Sizes ---
    iconXs: "w-3 h-3",
    iconSm: "w-4 h-4",
    iconMd: "w-5 h-5",
    iconLg: "w-6 h-6",
    iconXl: "w-8 h-8",
    
    // --- Animation & Transition Classes ---
    transition: "transition-all duration-300 ease-in-out",
    hoverScale: "transform hover:scale-105 transition-transform duration-300",
    hoverLift: "transform hover:-translate-y-1 transition-transform duration-300",
    
    // --- Background Gradients ---
    bgGradientPrimary: "bg-gradient-to-br from-indigo-50 via-white to-purple-50",
    bgGradientDark: "bg-gradient-to-br from-gray-900 to-gray-800",
    bgGradientHero: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    
    // --- Shadow Effects ---
    shadowSm: "shadow-sm",
    shadowMd: "shadow-md",
    shadowLg: "shadow-lg",
    shadowXl: "shadow-xl",
    shadowInner: "shadow-inner",
    
    // --- Border Radius ---
    roundedSm: "rounded-sm",
    roundedMd: "rounded-md",
    roundedLg: "rounded-lg",
    roundedXl: "rounded-xl",
    rounded2xl: "rounded-2xl",
    roundedFull: "rounded-full",
    
    // --- Opacity ---
    opacityHover: "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
};

export { styles };