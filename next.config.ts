import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    MONGODB_URI:"mongodb+srv://dev-opi:K1fzYCmFRLzIcfVN@myapplication.u7uiaso.mongodb.net/?retryWrites=true&w=majority&appName=Myapplication",
     NEXTAUTH_SECRET:"uJ20+0S2RN0ZzT3Dpm0B+cDFfplRkr4fnGQR+7khJkE=",

  },
};

export default nextConfig;
