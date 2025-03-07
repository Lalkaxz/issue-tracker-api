export default () => ({
	PORT: process.env.PORT || '3000',
	HOST: process.env.HOST || '0.0.0.0',
	PREFIX: process.env.PREFIX || '/api',
	NODE_ENV: process.env.NODE_ENV || 'development',
	ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || '*'
})
