import Link from "next/link";
import {Button} from "@/components/ui/button"
import { LogOut } from "@/app/auth/logout/actions";

export const Header = () => {
  return (
    <header className="w-full bg-zinc-800 border-b border-zinc-700">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" prefetch={false} className="text-2xl font-bold text-white tracking-tight hover:text-zinc-200 transition-colors">
          Calendar TodoApp
        </Link>
        <nav className="flex items-center gap-3">
          <form action={LogOut}>
            <Button type="submit" variant={"dark"}>
              ログアウト
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
};
