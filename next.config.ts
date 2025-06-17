import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    MONGODB_URI:"mongodb+srv://dev-opi:K1fzYCmFRLzIcfVN@myapplication.u7uiaso.mongodb.net/?retryWrites=true&w=majority&appName=Myapplication",
     NEXTAUTH_SECRET:"g5Q+2KCRo5KKQmNfuuCVdNF8DsWAaMTC4yCVBXAZgP0=",

  },
};

export default nextConfig;
