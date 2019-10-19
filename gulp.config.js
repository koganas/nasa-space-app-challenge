'use strict'

const config = {
    dev: {
        css: './_dev/css',
        js: {
            main: './_dev/js',
            templates: './_dev/js/templates',
            modules: './_dev/js/modules'
        }
    },

    dist: {
        css: './',
        js: './js'
    },

    connect: {
        host: 'localhost',
        port: '5353',
        name: 'Labs - EBANX'
    }
}

module.exports = config
