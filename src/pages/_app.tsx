import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto_Mono } from "@next/font/google";

import "~/styles/globals.css";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={robotoMono.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
