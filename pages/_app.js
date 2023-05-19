import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import { Header } from "@/components/header";
import "../assets/styles.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Header />
      <div
        className="body-wrapper"
        onLoad={() =>
          document.documentElement.style.setProperty(
            "--viewport-height",
            `${window.innerHeight}px`
          )
        }
      >
        <Component
          classname="uk-padding uk-padding-remove-vertical"
          {...pageProps}
        />
      </div>
    </Auth.UserContextProvider>
  );
}
