import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    MONGODB_URI:"mongodb+srv://dev-opi:K1fzYCmFRLzIcfVN@myapplication.u7uiaso.mongodb.net/?retryWrites=true&w=majority&appName=Myapplication",
     NEXTAUTH_SECRET:"xPsZgQAMP+ruKue4BNsEw0rRaaA3YxPMZbG+2ibQQt8=",

  },
   images: {
    domains: ['i.postimg.cc'], // ⬅️ këtu vendose domainin e jashtëm të imazheve
  },
};



export default nextConfig;
