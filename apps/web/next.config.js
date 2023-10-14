module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  env: {
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    AZURE_TENANT_ID: process.env.AZURE_TENANT_ID,
  },
};
