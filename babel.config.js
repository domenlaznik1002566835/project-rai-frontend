module.exports = {
    presets: [
        [
            'react-app',
            {
                runtime: 'automatic',
            },
        ],
    ],
    plugins: ['@babel/plugin-proposal-private-property-in-object'],
};