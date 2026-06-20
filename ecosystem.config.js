// SysHub — PM2 Ecosystem

module.exports = {
  apps: [
    {
      name: 'syshub-web',
      cwd: __dirname,
      script: 'npm',
      args: 'run start -- -p 3004',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: '3004',
      },
    },
  ],
}
