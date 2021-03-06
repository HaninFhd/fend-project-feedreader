/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the a application.
 */
$(function () {
	/* This is a test suite just contains a related set of tests.
	 * This suite is all about the RSS feeds definitions,
	 * the allFeeds variable in the application.
	 */
    describe('RSS Feeds', function () {
		/* This is first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not empty. 
		 */
        it('allFeeds are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		/* this is a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
        it('URL are defined', function () {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].url).toBeDefined();
                expect(allFeeds[x].url.length).not.toBe(0);
            }
        });
		/* this is a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
        it('name are defined', function () {
            for (var x = 0; x < allFeeds.length; x++) {
                expect(allFeeds[x].name).toBeDefined();
                expect(allFeeds[x].name.length).not.toBe(0);
            }
        });
    });
    /* new test suite named "The menu" */
    describe('The menu', function () {
        // this is a test that ensures the menu element is hidden by default.
        it('menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
		/* this is a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 *  have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
        menuIcon = $('.menu-icon-link');
        it('menu changes visibility when the menu icon is clicked', function () {
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
		/* this is a test that ensures when the loadFeed
		 * function is called and completes its work
		 * loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        // check if there is at least a single .entry element within the .feed container.
        it('there is at least a single .entry element within the .feed container', function (done) {          
            expect($('.feed .entry').length).not.toBe(0);        
            done();
        });  
    });
    /* new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
		/* this is a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
        var feed1;
        var feed2;
        beforeEach(function () {
            loadFeed(1, function () {
                feed1 = $('.feed').html();
                expect(feed1).toBeDefined();
                done();
            });
        });
        it(' ensures when a new feed is loaded the content actually changes', function () {
            loadFeed(2, function () {
                feed2 = $('.feed').html();
                expect(feed1).toBeDefined();
                expect(feed1).not.toEqual(feed2);
                done();
            });
        });
    });
}());