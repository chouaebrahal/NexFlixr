import darkImage from "../../assets/wB1G_eKJnIZv9ZyHSZNw9uMJQuNh1sr-CnqVpYibTV8.webp";
import lightImage from "../../assets/lightbg.jpg";
import { useThemeStore } from "../../store/useThemeStore";
import { FaStar } from "react-icons/fa";
import Button from "../shared/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
const Hero = () => {
  const { theme } = useThemeStore();
  return (
    <section

      className={`h-screen w-full after:clear-both after:content-[''] before:content-[''] after:w-full before:w-full after:h-full before:h-full 
        ${theme === "dark"
          ? "after:bg-linear-to-t after:from-background after:from-5% after:via-background/50 after:via-60%  after:to-transparent before:bg-linear-to-r before:from-background before:from-10% before:via-background/30 before:via-60%  before:to-transparent"
          : "after:bg-linear-to-t after:from-background after:from-10% after:via-background/50 after:via-40%  after:to-transparent before:bg-linear-to-r before:from-background before:from-5% before:via-background/30 before:via-30%  before:to-transparent"
        } after:absolute after:top-0 after:lef before:absolute  before:top-0  before:left-0 z-10 relative `}  >
      <img
        src={`${theme === "dark" ? darkImage : lightImage}`}
        alt="Background"
        className="w-full h-full absolute z-[-1] "
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`container mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-foreground space-x-10 rtl:space-x-reverse z-50 `}
      >
        <div className="w-full px-4 md:w-3/4 lg:w-1/2 space-y-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold ">
            {theme === "dark" ? "The Witcher " : "Mission Imposible"}
          </h1>
          <p>
            {theme === "dark"
              ? "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts."
              : "Ethan Hunt and his IMF team, along with some familiar allies and new recruits, race against time to prevent a global catastrophe."}
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center w-full justify-center">
            <div className="flex  items-center justify-center space-x-1 rtl:space-x-reverse">
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />


            </div>
            <p className="flex items-center ml-4 rtl:ml-0 rtl:mr-4 text-sm font-medium">
              <svg id="home_img" className="w-10 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
              {theme === "dark" ? "8.2/10 " : "7.1/10"}
            </p>

            <svg viewBox="0 0 111 30" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" color="red" aria-hidden="true" role="img" className="w-15 h-7 text-red-500 ml-2"><g><path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"></path></g></svg>

          </div>
          <Link to={`${theme === 'dark' ? 'media/series/71912' : 'media/movies/575264'}`}><Button text="More Info" /></Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;


