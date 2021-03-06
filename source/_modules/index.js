/* -------------------------------------------------- */
/* PAGE MANAGER
/* -------------------------------------------------- */

var pageManager = (function pageManager($, window, document, undefined) {

	'use strict';

	//removeIf(production)
	get.info('pageManager', '1.0', 'Aries Datuin');
	//endRemoveIf(production)


	/* -------------------------------------------------- */
	/* CACHE
	/* -------------------------------------------------- */

	var $pageTransition = $('.page-transition');


	/* -------------------------------------------------- */
	/* VARS
	/* -------------------------------------------------- */

	var state = 'is-loading',
		rootLink = '';


	/* -------------------------------------------------- */
	/* ANIMATIONS
	/* -------------------------------------------------- */

	var tlIntro = new Timeline({paused: true});
		tlIntro.fromTo($pageTransition.find('.page-transition-logo'), 0.5, 
					{autoAlpha: 0, scale: 0.9},
					{autoAlpha: 1, scale: 1, ease: Back.easeInOut})

				.staggerFromTo($pageTransition.find('.page-transition-logo').find('.leaves').children(), 0.5, 
					{autoAlpha: 0, scale: 0, transformOrigin: 'bottom center'},
					{autoAlpha: 1, scale: 1, ease: Back.easeInOut}, 0.05)

				.staggerTo($pageTransition.find('.page-transition-logo').find('.leaves').children(), 0.5, {autoAlpha: 0, scale: 0, ease: Back.easeInOut}, -0.05, 'group-01+=1')

				.to($pageTransition.find('.page-transition-logo'), 0.5, {autoAlpha: 0, scale: 0.9, ease: Back.easeInOut}, 'group-01+=1.25')

				.to($pageTransition, 1, {autoAlpha: 0, ease: Expo.easeOut})
				.addCallback(isLoaded);


	/* -------------------------------------------------- */
	/* FUNCTIONS
	/* -------------------------------------------------- */

	function checkLink() {

		/*
		console.log(url.href);		// https://developer.mozilla.org:8080/en-US/search?q=URL#search-results-close-container
		console.log(url.protocol);	// https:
		console.log(url.host);		// developer.mozilla.org:8080
		console.log(url.hostname);	// developer.mozilla.org
		console.log(url.port);		// 8080
		console.log(url.pathname);	// /en-US/search
		console.log(url.search);	// ?q=URL
		console.log(url.hash);		// #search-results-close-container
		console.log(url.origin);	// https://developer.mozilla.org:8080
		*/

		var currentOrigin = location.origin,
			//currentPath = location.pathname,
			currentPath = location.pathname.split('/').pop(),
			currentFullPath = location.href;


		console.log('Currently viewing: ' + currentPath);


		$('a[href^="' + rootLink + '"]:not(.button):not([data-no-swup])').removeClass('is-active');
		$('a[href^="' + rootLink + '"]:not(.button):not([data-no-swup])').parent().removeClass('is-active');


		if(location.pathname === '' + rootLink + '') { // Check if url is at root location.

			$('a[href="' + rootLink + '"]:not(.button):not([data-no-swup]').addClass('is-active');
			$('a[href="' + rootLink + '"]:not(.button):not([data-no-swup]').parent().addClass('is-active');

		} else {

			$('a[href^="' + rootLink + '' + currentPath + '"]:not(.button):not([data-no-swup]').addClass('is-active');
			$('a[href^="' + rootLink + '' + currentPath + '"]:not(.button):not([data-no-swup]').parent().addClass('is-active');

		}

	}


	function isLoading() {

		console.log('Content is loading...');
		$pageTransition.removeClass('is-loaded');
		scroll.lock();

		//tlLogo.delay(1).play(0);

	}


	function isLoaded() {

		console.log('Content is loaded successfully.');
		$pageTransition.addClass('is-loaded');
		scroll.unlock();
		checkLink();

		//tlPageTransitionText.pause();

	}


	/*
	function intro() {

		var tlIntro = new Timeline({paused: false});
			tl.to($pageTransition, 2, {autoAlpha: 0, delay: 4, ease: Expo.easeInOut })



			  .fromTo($pageTransition.find('.page-transition-logo'), 0.5, 
				{autoAlpha: 0, scale: 0.95},
				{autoAlpha: 1, scale: 1, ease: Expo.easeOut })

			  .staggerFromTo($pageTransition.find('.page-transition-logo').find('.leaves').children(), 0.5, 
				{autoAlpha: 0},
				{autoAlpha: 1, ease: Expo.easeOut }, 0.02);



			  .addCallback(isLoaded);

	}
	*/


	/* -------------------------------------------------- */
	/* OPTIONS
	/* -------------------------------------------------- */

	var pageManagerOptions = {
		LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
		FORM_SELECTOR: 'form[data-swup-form]',
		elements: ['.swup'],
		animationSelector: '[class*="page-transition-"]',
		pageClassPrefix: '',
		cache: false,
		preload: false,
		scroll: true,
		doScrollingRightAway: false,
		animateScroll: true,
		scrollFriction: 0.4,
		scrollAcceleration: 0.05,
		support: true,
		debugMode: false,
		animateHistoryBrowsing: true,
		plugins: [],

		skipPopStateHandling: function(event){

			if (event.state && event.state.source === 'swup') {

				return false;

			}

			return true;

		},

		animations: {

			'*': {

				in: function(next) {

					// TRANSITION OUT (PULL BACK THE CURTAIN)
					var tl = new Timeline({paused: false});
						tl.staggerTo($pageTransition.find('.page-transition-logo').find('.leaves').children(), 0.5, {autoAlpha: 0, scale: 0, ease: Back.easeInOut}, -0.05)
						  .to($pageTransition.find('.page-transition-logo'), 0.5, {autoAlpha: 0, scale: 0.9, ease: Back.easeInOut }, '-=0.25')
						  .to($pageTransition, 0.5, {autoAlpha: 0, ease: Expo.easeOut})
						  .addCallback(next)
						  .addCallback(isLoaded);

				},
				out: function(next) {

					// TRANSITION IN (INTERMISSION, WE'LL BE RIGHT BACK)
					var tl = new Timeline({paused: false});
						tl.addCallback(isLoading)
						  .to($pageTransition, 0.5, {autoAlpha: 1, ease: Expo.easeOut})
						  .to($pageTransition.find('.page-transition-logo'), 0.5, {autoAlpha: 1, scale: 1, ease: Back.easeInOut}, '-=0.5')
						  .staggerTo($pageTransition.find('.page-transition-logo').find('.leaves').children(), 1, {autoAlpha: 1, scale: 1, ease: Back.easeInOut}, 0.05, '-=0.25')
						  .addCallback(next);



				}

			}

		}

	};


	/* -------------------------------------------------- */
	/* API
	/* -------------------------------------------------- */

		/* -------------------------------------------------- */
		/* REQUESTS / PAGE LOAD
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:pagePreloaded', function() {

			console.log('Page is preloading...');

		}).on('swup:pageLoaded', function() {

			console.log('Page successfully loaded.');

		}).on('swup:pageView', function() {

			console.log('Page ready and successfully loaded.');

		});
		*/


		/* -------------------------------------------------- */
		/* ANIMATIONS
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:animationOutStart', function() {

			console.log('Adding is-animating class to HTML.');

		}).on('swup:animationInStart', function() {

			console.log('Removing is-animating class from HTML.');

		}).on('swup:animationOutDone', function() {

			console.log('Animation is done. Content is being replaced...');

		}).on('swup:animationInDone', function() {

			console.log('Animation is done. Content successfully replaced.');

		});
		*/


		/* -------------------------------------------------- */
		/* RENDERING
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:willReplaceContent', function() {

			console.log('Content is being replaced...');

		}).on('swup:contentReplaced', function() {

			console.log('Content successfully replaced.');

		});
		*/


		/* -------------------------------------------------- */
		/* MOUSE EVENTS
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:hoverLink', function() {

			console.log('Hovering over link.');

		}).on('swup:clickLink', function() {

			console.log('Link clicked.');

		}).on('swup:submitForm', function() {

			console.log('Submit button clicked.');

		});
		*/


		/* -------------------------------------------------- */
		/* SCROLL EVENTS
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:scrollStart', function() {

			console.log('Scrolling to anchor.');

		}).on('swup:scrollDone', function() {

			console.log('Scroll completed. Arrived at anchor.');

		}).on('swup:samePage', function() {

			console.log('Currently viewing the same page.');

		});
		*/


		/* -------------------------------------------------- */
		/* HISTORY
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:popState', function() {

			console.log('History state changed.');

		}).on('swup:animationSkipped', function() {

			console.log('Skipping animation.');

		});
		*/


		/* -------------------------------------------------- */
		/* HELPERS
		/* -------------------------------------------------- */

		/*
		$doc.on('swup:openPageInNewTab', function() {

			console.log('Page opened in new tab.');

		}).on('swup:pageRetrievedFromCache', function() {

			console.log('Page retrieved from cache.');

		}).on('swup:samePage', function() {

			console.log('Currently viewing the same page.');

		}).on('swup:samePageWithHash', function() {

			console.log('Currently viewing the same page.');

		}).on('swup:enabled', function() {

			console.log('Swup enabled.');

		}).on('swup:disabled', function() {

			console.log('Swup destroyed.');

		});
		*/


	/* -------------------------------------------------- */
	/* INIT
	/* -------------------------------------------------- */

	var swup = new Swupjs(pageManagerOptions);
	//swup.usePlugin(pluginName, {option: 'value of option'});


	docReady(function() {

		tlIntro.play();
		modules.core();
		modules.components();

		if(isExplorer) {
			$html.addClass('visible');
		}

	});


	/* -------------------------------------------------- */
	/* EVENTS
	/* -------------------------------------------------- */

	document.addEventListener('swup:willReplaceContent', function() {
		
		//console.log('Destroying modules.');
		//$('.headroom').headroom('destroy');
		//$('.carousel').flickity('destroy')


	});


	document.addEventListener('swup:contentReplaced', function() {

		modules.components();

	});


	document.addEventListener('swup:pageView', function() {

		/*
		dataLayer.push({

			'event': 'VirtualPageview',
			'virtualPageURL': window.location.pathname,
			'virtualPageTitle' : document.title

		});
		*/

	});


	/* -------------------------------------------------- */
	/* EXPORTS
	/* -------------------------------------------------- */

	return {
		//init: init

	};


}(jQuery, window, document));
