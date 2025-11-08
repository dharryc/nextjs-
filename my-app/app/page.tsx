import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black px-6 py-12">
      <div className="w-full max-w-4xl">
        {/* Scrolling Welcome Message */}
        <div className="ascii-wrapper mb-8 overflow-hidden">
          <div className="ascii-scroll">
            <pre className="ascii-art text-base sm:text-lg md:text-xl text-zinc-900 dark:text-zinc-50 tracking-wider">{`
$$\\      $$\\ $$$$$$$$\\ $$\\       $$$$$$\\   $$$$$$\\  $$\\      $$\\ $$$$$$$$\\       $$$$$$$\\   $$$$$$\\   $$$$$$\\  $$\\   $$\\ 
$$ | $\\  $$ |$$  _____|$$ |     $$  __$$\\ $$  __$$\\ $$$\\    $$$ |$$  _____|      $$  __$$\\ $$  __$$\\ $$  __$$\\ $$ | $$  |
$$ |$$$\\ $$ |$$ |      $$ |     $$ /  \\__|$$ /  $$ |$$$$\\  $$$$ |$$ |            $$ |  $$ |$$ /  $$ |$$ /  \\__|$$ |$$  / 
$$ $$ $$\\$$ |$$$$$\\    $$ |     $$ |      $$ |  $$ |$$\\$$\\$$ $$ |$$$$$\\          $$$$$$$\\ |$$$$$$$$ |$$ |      $$$$$  /  
$$$$  _$$$$ |$$  __|   $$ |     $$ |      $$ |  $$ |$$ \\$$$  $$ |$$  __|         $$  __$$\\ $$  __$$ |$$ |      $$  $$<   
$$$  / \\$$$ |$$ |      $$ |     $$ |  $$\\ $$ |  $$ |$$ |\\$  /$$ |$$ |            $$ |  $$ |$$ |  $$ |$$ |  $$\\ $$ |\\$$\\  
$$  /   \\$$ |$$$$$$$$\\ $$$$$$$$\\\\$$$$$$  | $$$$$$  |$$ | \\_/ $$ |$$$$$$$$\\       $$$$$$$  |$$ |  $$ |\\$$$$$$  |$$ | \\$$\\ 
\\__/     \\__|\\________|\\________|\\______/  \\______/ \\__|     \\__|\\________|      \\_______/ \\__|  \\__| \\______/ \\__|  \\__|
`}
            </pre>
            <pre
              className="ascii-art text-base sm:text-lg md:text-xl text-zinc-900 dark:text-zinc-50 tracking-wider"
              aria-hidden="true"
            >{`
$$\\      $$\\ $$$$$$$$\\ $$\\       $$$$$$\\   $$$$$$\\  $$\\      $$\\ $$$$$$$$\\       $$$$$$$\\   $$$$$$\\   $$$$$$\\  $$\\   $$\\ 
$$ | $\\  $$ |$$  _____|$$ |     $$  __$$\\ $$  __$$\\ $$$\\    $$$ |$$  _____|      $$  __$$\\ $$  __$$\\ $$  __$$\\ $$ | $$  |
$$ |$$$\\ $$ |$$ |      $$ |     $$ /  \\__|$$ /  $$ |$$$$\\  $$$$ |$$ |            $$ |  $$ |$$ /  $$ |$$ /  \\__|$$ |$$  / 
$$ $$ $$\\$$ |$$$$$\\    $$ |     $$ |      $$ |  $$ |$$\\$$\\$$ $$ |$$$$$\\          $$$$$$$\\ |$$$$$$$$ |$$ |      $$$$$  /  
$$$$  _$$$$ |$$  __|   $$ |     $$ |      $$ |  $$ |$$ \\$$$  $$ |$$  __|         $$  __$$\\ $$  __$$ |$$ |      $$  $$<   
$$$  / \\$$$ |$$ |      $$ |     $$ |  $$\\ $$ |  $$ |$$ |\\$  /$$ |$$ |            $$ |  $$ |$$ |  $$ |$$ |  $$\\ $$ |\\$$\\  
$$  /   \\$$ |$$$$$$$$\\ $$$$$$$$\\\\$$$$$$  | $$$$$$  |$$ | \\_/ $$ |$$$$$$$$\\       $$$$$$$  |$$ |  $$ |\\$$$$$$  |$$ | \\$$\\ 
\\__/     \\__|\\________|\\________|\\______/  \\______/ \\__|     \\__|\\________|      \\_______/ \\__|  \\__| \\______/ \\__|  \\__|
`}
</pre>
          </div>
        </div>

        {/* Login Card */}
        <div className="mx-auto w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
          <div className="mb-6 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to view your card collection
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Quick demo link */}
          <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <Link
              href="/collection"
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              View Collection Demo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
