export default () => ({
    port:  Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    prefix: process.env.PREFIX || '/api',
    node_env: process.env.NODE_ENV || 'development'
})