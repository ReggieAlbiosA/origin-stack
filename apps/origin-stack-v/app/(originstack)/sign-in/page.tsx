export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col gap-y-10 items-center justify-center from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black ">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 1024.000000 1024.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M1100 6036 c0 -3894 1 -4045 18 -4050 10 -4 548 -5 1195 -4 1038 3
      1179 1 1187 -12 6 -9 10 -362 10 -907 0 -797 2 -893 16 -907 14 -14 166 -16
      1537 -15 837 0 1542 4 1567 7 l45 7 3 905 c1 612 5 907 13 915 7 7 397 10
      1237 10 l1227 0 0 4045 0 4045 -4027 3 -4028 2 0 -4044z m7288 3272 c17 -17
      17 -6529 0 -6546 -17 -17 -6499 -17 -6516 0 -18 18 -17 6544 1 6551 6 3 1472
      6 3258 6 2511 1 3248 -2 3257 -11z m-3640 -7327 c11 -6 14 -68 15 -284 1 -151
      4 -278 8 -281 9 -10 619 -10 629 0 5 5 10 131 12 281 2 149 6 274 10 278 7 7
      482 13 511 7 16 -4 17 -37 15 -561 l-3 -556 -848 -3 -847 -2 -11 27 c-7 19
      -10 203 -8 543 2 416 5 519 16 538 13 22 15 22 251 22 130 0 243 -4 250 -9z"
          />
          <path
            d="M2855 8318 c-3 -7 -4 -1037 -3 -2288 l3 -2275 2275 0 2275 0 0 2285
      0 2285 -2273 3 c-1813 2 -2274 0 -2277 -10z m3772 -769 c19 -16 19 -3011 0
      -3027 -20 -17 -2993 -14 -3007 3 -7 8 -9 487 -8 1516 l3 1503 21 11 c30 15
      2973 9 2991 -6z"
          />
          <path
            d="M5025 6591 c-126 -20 -284 -132 -368 -261 -163 -248 -80 -594 182
      -761 81 -52 163 -73 286 -73 116 0 155 9 265 62 77 37 188 150 227 232 49 101
      57 137 57 250 0 84 -5 119 -24 175 -49 144 -163 275 -289 332 -31 14 -64 30
      -74 35 -25 13 -202 19 -262 9z"
          />
        </g>
      </svg>

      <div className="flex gap-y-6 w-full max-w-sm flex-col items-center justify-center">
        <h1 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-white">
          Get started to test Demo
        </h1>

        <div className="space-y-3 w-full">
          <button className="w-full px-4 py-3 rounded  bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.532 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Continue with GitHub
          </button>

          <button className="w-full px-4 py-3 rounded bg-orange-600 dark:bg-orange-500 text-white font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2 border border-orange-300 dark:border-orange-700">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0L8.5 8.5H0L12 0zm0 0l3.5 8.5H24L12 0zM0 9.5l4 12L12 9.5H0zm24 0L20 21.5 12 9.5h12z" />
            </svg>
            Continue with GitLab
          </button>

          <button className="w-full px-4 py-3 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
