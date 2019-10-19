'use strict'

const config = {
    dev: {
        css: './_dev/css',
        js: {
            main: './_dev/js',
            templates: './_dev/js/templates',
            modules: './_dev/js/modules'
        },
        template: './src'
    },

    dist: {
        css: './build/css',
        js: './build/js',
        template: './build',
    },

    connect: {
        host: 'localhost',
        port: '5353',
        name: 'Nasa Space Apps Challenge'
    }
}

module.exports = config
