module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  corePlugins: {
	container: false
  },
  theme: {
	extend: {},
	inset: {
		'right-0': 'right: 0',
		'160': '10rem',
		'272': '17rem'
	},
	boxShadow: {
		custom: '0px 10px 15px -5px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)'
	},
	height: {
		card: '156px',
		select: '121px'
	},
	lineHeight: {
		'1875': '1.875rem'
	},
	borderColor: theme => ({
		...theme('colors'),
		'filled': '#313E4F',
		'empty': '#989EA7',
		'incorrect': '#FF7B92',
		'focused': '#33A6BA',
		'light-gray': '#e8edf3'

	}),
	backgroundColor: theme => ({
		...theme('colors'),
		'body': '#e8edf3',
		'accent-red': '#ec7891',
		'accent-blue': '#33A6BA',
		'accent-yellow': '#FFC062',
		'dark-blue': '#313E4F',
		'primary-gray': '#989EA7'
	}),
	textColor: theme => ({
		...theme('colors'),
		'accent-blue': '#33A6BA',
		'accent-red': '#FF7B92',
		'dark-blue': '#313E4F',
		'primary-gray': '#989EA7'
	})
  },
  variants: {},
  plugins: [
	function ({addComponents}) {
		addComponents({
			'.container':{
				maxWidth: '318px'
			}
		})
	}
  ],

}
