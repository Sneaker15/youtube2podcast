'use strict'

let express = require('express')
let ytdl = require('youtube-dl')
let ytpl = require('ytpl');
const { getInfo } = require('ytdl-getinfo')

let Feed = require('./Feed')
let config = require('./config')


let app = express();

app.get('/video/:id([a-z0-9_\-]{10,20})', (req, res) => {
	
	let id = req.params.id;
	console.debug('looking up video with ID ' + id);

	ytdl.getInfo(id, [], { maxBuffer: Infinity }, (err, info) => {
		if (err) {
			console.error(err);
			res.send("Playlist not found");
		}
		else {
			res.redirect(info.url)
		}
	})
})

app.get('/youtube/:id', (req, res) => {
	let id = req.params.id;

	console.log(config.host);
	console.debug('looking up playlist with ID ' + id);

	ytpl(id)
		.then(playlist => {
			let feed = Feed.playlistToFeed(playlist);
			var xml = feed.xml();
			// res.setHeader('content-type', 'application/rss+xml')
			res.set('Content-Type', 'text/xml');
			res.send(xml);
		})
		.catch(err => {
			console.error(err);
			res.send("Playlist not found");
		})
})

app.listen(config.port)
