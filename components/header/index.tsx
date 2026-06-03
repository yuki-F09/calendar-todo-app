import Link from "next/link";
import {Button} from "@/components/ui/button"

export const Header = () => {
  return (
    <header className="w-full bg-zinc-800 border-b border-zinc-700">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-tight hover:text-zinc-200 transition-colors">
          Calendar TodoApp
        </Link>
        <nav className="flex items-center gap-3">
          <Button asChild>
            <Link href="/login">
              ログイン
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/signup">
              新規登録
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
