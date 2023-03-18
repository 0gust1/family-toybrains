const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'rounded-sans': [
					'ui-rounded',
					'Hiragino Maru Gothic ProN',
					'Quicksand',
					'Comfortaa',
					'Manjari',
					'Arial Rounded MT Bold',
					'Calibri',
					'source-sans-pro',
					'sans-serif'
				]
			}
		}
	},

	plugins: []
};

module.exports = config;
