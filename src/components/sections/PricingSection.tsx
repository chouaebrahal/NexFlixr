import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/useThemeStore";
import Button from "../shared/Button";

const plans = [
    {
        id: 1,
        name: 'Basic',
        duration: '3month',
        originalPrice: null,
        price: '$15.140',
        features: ['Great for basic'],
        isPopular: false
    },
    {
        id: 2,
        name: 'Suggested',
        duration: '6month',
        originalPrice: '$29.990',
        price: '$22.990',
        features: ['Most popular'],
        isPopular: true
    },
    {
        id: 3,
        name: 'Premium',
        duration: '12month',
        originalPrice: null,
        price: '$35.199',
        features: ['Great for pro'],
        isPopular: false
    }
];


const PricingSection = () => {

    const { theme } = useThemeStore();

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 1.5,
                staggerChildren: 1.2, // delay between items
            },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 80 },
        show: { opacity: 1, y: 0, transition: { duration: 1 } },
    }

    const pricingElements = plans.map((plan) => {
        return <motion.div
            variants={itemVariants}
            key={plan.id}
            className={`max-w-[80%] mx-auto -mt-10 md:mt-0 relative`}>
            {plan.name === "Suggested"
                ? <svg className="w-full" width="448" height="908" viewBox="0 0 448 908" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_dd_1357_5781)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M214.503 67.3236C214 69.6348 214 72.4232 214 78V134H80C53.6013 134 40.402 134 32.201 142.201C24 150.402 24 163.601 24 190V359C40.5685 359 54 372.431 54 389C54 405.569 40.5685 419 24 419V718C24 744.399 24 757.598 32.201 765.799C39.0521 772.65 49.3913 773.778 68 773.963V800C68 804.646 68 806.969 68.3496 808.906C69.9804 817.945 77.0549 825.02 86.0938 826.65C88.0313 827 90.3542 827 95 827C99.6458 827 101.969 827 103.906 826.65C112.945 825.02 120.02 817.945 121.65 808.906C122 806.969 122 804.646 122 800V775L122 774.478L122 774C122.002 769.081 122.031 766.492 122.503 764.324C124.334 755.907 130.907 749.334 139.324 747.503C141.635 747 144.423 747 150 747C155.577 747 158.365 747 160.676 747.503C169.093 749.334 175.666 755.907 177.497 764.324C177.969 766.492 177.998 769.081 178 774C178 774.323 178 774.656 178 775V805V830C178 835.577 178 838.365 178.503 840.676C180.334 849.093 186.907 855.666 195.324 857.497C197.635 858 200.423 858 206 858C211.577 858 214.365 858 216.676 857.497C225.093 855.666 231.666 849.093 233.497 840.676C234 838.365 234 835.577 234 830V774H368C394.399 774 407.598 774 415.799 765.799C424 757.598 424 744.399 424 718V419C407.431 419 394 405.569 394 389C394 372.431 407.431 359 424 359V190C424 163.601 424 150.402 415.799 142.201C408.948 135.35 398.609 134.222 380 134.037V108C380 103.354 380 101.031 379.65 99.0938C378.02 90.0549 370.945 82.9804 361.906 81.3496C359.969 81 357.646 81 353 81C348.354 81 346.031 81 344.094 81.3496C335.055 82.9804 327.98 90.0549 326.35 99.0938C326 101.031 326 103.354 326 108V125V134V155C326 160.577 326 163.365 325.497 165.676C323.666 174.093 317.093 180.666 308.676 182.497C306.365 183 303.577 183 298 183C292.423 183 289.635 183 287.324 182.497C278.907 180.666 272.334 174.093 270.503 165.676C270 163.365 270 160.577 270 155V134V125V78C270 72.4232 270 69.6348 269.497 67.3236C267.666 58.9074 261.093 52.3336 252.676 50.5028C250.365 50 247.577 50 242 50C236.423 50 233.635 50 231.324 50.5028C222.907 52.3336 216.334 58.9074 214.503 67.3236Z" fill="url(#paint0_linear_1357_5781)" />
                    </g>
                    <circle cx="241.5" cy="17.5" r="17.5" fill="#10B3FB" />
                    <circle cx="206.5" cy="890.5" r="17.5" fill="#275FE7" />
                    <defs>
                        <filter id="filter0_dd_1357_5781" x="0" y="18" width="448" height="872" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="8" />
                            <feGaussianBlur stdDeviation="12" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.556863 0 0 0 0 0.898039 0 0 0 0.16 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1357_5781" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="-8" />
                            <feGaussianBlur stdDeviation="12" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.556863 0 0 0 0 0.898039 0 0 0 0.16 0" />
                            <feBlend mode="normal" in2="effect1_dropShadow_1357_5781" result="effect2_dropShadow_1357_5781" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1357_5781" result="shape" />
                        </filter>
                        <linearGradient id="paint0_linear_1357_5781" x1="224" y1="50" x2="224" y2="858" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#0CC2FF" />
                            <stop offset="1" stopColor="#275EE7" />
                        </linearGradient>
                    </defs>
                </svg>


                : theme === "dark"
                    ? <svg className="w-full" width="332" height="560" viewBox="0 0 332 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1357_5814)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 72C0 45.6014 0 32.402 8.20101 24.201C16.402 16 29.6013 16 56 16H264C290.399 16 303.598 16 311.799 24.201C320 32.402 320 45.6013 320 72V201.625C306.745 201.625 296 212.706 296 226.375C296 240.044 306.745 251.125 320 251.125V488C320 514.399 320 527.598 311.799 535.799C303.598 544 290.399 544 264 544H56C29.6013 544 16.402 544 8.20101 535.799C0 527.598 0 514.399 0 488V251.125C13.2548 251.125 24 240.044 24 226.375C24 212.706 13.2548 201.625 0 201.625V72Z" fill="#E1EFF3" />
                        </g>
                        <path d="M25 229.399L296 229.399" stroke="#228EE5" strokeWidth="2" strokeDasharray="6 6" />
                        <defs>
                            <filter id="filter0_dd_1357_5814" x="-12" y="0" width="344" height="560" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.556863 0 0 0 0 0.898039 0 0 0 0.4 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1357_5814" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="-4" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.133333 0 0 0 0 0.556863 0 0 0 0 0.898039 0 0 0 0.4 0" />
                                <feBlend mode="normal" in2="effect1_dropShadow_1357_5814" result="effect2_dropShadow_1357_5814" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1357_5814" result="shape" />
                            </filter>
                        </defs>
                    </svg>

                    : <svg className="w-full" width="344" height="560" viewBox="0 0 344 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_dd_1406_10367)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 72C12 45.6014 12 32.402 20.201 24.201C28.402 16 41.6013 16 68 16H276C302.399 16 315.598 16 323.799 24.201C332 32.402 332 45.6013 332 72V201.625C318.745 201.625 308 212.706 308 226.375C308 240.044 318.745 251.125 332 251.125V488C332 514.399 332 527.598 323.799 535.799C315.598 544 302.399 544 276 544H68C41.6013 544 28.402 544 20.201 535.799C12 527.598 12 514.399 12 488V251.125C25.2548 251.125 36 240.044 36 226.375C36 212.706 25.2548 201.625 12 201.625V72Z" fill="#030A1B" />
                        </g>
                        <path d="M37 229.399L308 229.399" stroke="#228EE5" strokeWidth="2" strokeDasharray="6 6" />
                        <defs>
                            <filter id="filter0_dd_1406_10367" x="0" y="0" width="344" height="560" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.0392157 0 0 0 0 0.105882 0 0 0 0.4 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1406_10367" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="-4" />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.0117647 0 0 0 0 0.0392157 0 0 0 0 0.105882 0 0 0 0.4 0" />
                                <feBlend mode="normal" in2="effect1_dropShadow_1406_10367" result="effect2_dropShadow_1406_10367" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1406_10367" result="shape" />
                            </filter>
                        </defs>
                    </svg>

            }
            <div className={`w-[80%] h-[300px] md:h-[400px] flex flex-col justify-between ${plan.isPopular ? "text-white" : "text-hover"}  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4">{plan.name}</h2>
                <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-bold  mb-2">{plan.duration}</p>
                <div className="flex flex-col items-center mt-4">
                    {plan.originalPrice && <p className=" line-through mr-2">{plan.originalPrice}</p>}
                    <p className="text-3xl font-bold">{plan.price}</p>
                </div>
                <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="">• {feature}</li>
                    ))}
                </ul>
                <Button text="Continue" className={`${plan.isPopular ? "text-hover! bg-white!" : "text-white! bg-hover!"}`} />
            </div>
        </motion.div>
    })

    return (
        <motion.section
            variants={container}
            initial="hidden"
            whileInView='show'
            viewport={{ once: true }}
            className='container mx-auto p-4 flex flex-col gap-5 lg:flex-row items-center justify-around w-full'>
            {pricingElements}
        </motion.section>
    )
}

export default PricingSection