'use strict'

let RSS = require('rss');

let config = require('./config');

exports.playlistToFeed = function(playlist) {
		var feed = new RSS({
			title: playlist.title,
			description: playlist.description,
			feed_url: config.host + '/youtube/' + playlist.id,
			site_url: config.host,
			// image_url: 'http://example.com/icon.png',
			// docs: 'http://example.com/rss/docs.html',
			pubDate: "",
			language: "",
			image_url: playlist.image_url,
			author: playlist.author.name,
			managingEditor: playlist.author.name,
			webMaster: 'Sneaker15',
			copyright: '&#xA9;2017',
			ttl: '60',
			custom_namespaces: {
				'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
			},
			custom_elements: [
				// { 'itunes:subtitle': 'A show about everything' },
				// { 'itunes:author': 'John Doe' },
				// { 'itunes:summary': 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store' },
				// {
				// 	'itunes:owner': [
				// 		{ 'itunes:name': 'John Doe' },
				// 		{ 'itunes:email': 'john.doe@example.com' }
				// 	]
				// },
				{
					'itunes:image': {
						_attr: {
							href: playlist.image_url
						}
					}
				},
				{
					'itunes:category': [
						{
							_attr: {
								text: 'Youtube'
							}
						},
						{
							'itunes:category': {
								_attr: {
									text: 'Playlist'
								}
							}
						}
					]
				}
			]
		});

		playlist.items.map((item) => {
			feed.item({
				title: item.title,
				description: item.description,
				url: config.host + '/video/' + item.id, // link to the item 
				// guid: item.id, // optional - defaults to url 
				// categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories 
				author: item.author.name, // optional - defaults to feed author property 
				date: 'May 27, 2012', // any format that js Date can parse. 
				// lat: 33.417974, //optional latitude field for GeoRSS 
				// long: -111.933231, //optional longitude field for GeoRSS 
				// enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure 
				enclosure: {
					'url': config.host + '/video/' + item.id,
					// 'size': 1668, // 
					'type': 'video/mp4'
				}
				// itunesAuthor: 'John Doe',
				// itunesExplicit: false,
				// itunesSubtitle: 'I am a sub title',
				// itunesSummary: 'I am a summary',
				// itunesDuration: 12345,
				// itunesKeywords: ['javascript', 'podcast']
			});
		});
        return feed;
    }
