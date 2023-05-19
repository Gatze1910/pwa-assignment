import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";

export const Header = () => {
  const { user } = Auth.useUser();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <div className="header">
      {user ? (
        <div className="header__user">
          <p className="header__user-email">
            Signed in as: <span>{user.email}</span>
          </p>
          <button className="header__logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p className="header__text">
          Simple project for the PWA assignment - Bernadette Ackerl
        </p>
      )}
    </div>
  );
};
