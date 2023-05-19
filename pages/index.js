import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import Todos from "@/components/todo";

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="uk-vertical-align uk-text-center uk-height-1-1">
      {!user ? (
        <div className="uk-vertical-align-middle content-inside">
          <h1>Hello and welcome to Your Todo List</h1>
          <div>
            <Auth
              supabaseClient={supabase}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        </div>
      ) : (
        <div
          className="uk-section"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          <Todos user={supabase.auth.user()} />
        </div>
      )}
    </div>
  );
}
