/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function(){
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            })


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function(){
            allFeeds.forEach(function(input){
                expect(input.url).toBeDefined();
                expect(input.url.length).not.toBe(0); //specified the url.length as per review 08.20.18
            });
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function(){
            allFeeds.forEach(function(element){
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0); //specified the name.length as per review 08.20.18
            });
        });
    });

    describe('The Menue', function(){
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
            var htmlClass = $('body').attr('class');
            expect(htmlClass).toContain('menu-hidden'); //Changed to 'toContain' as per review 08.20.18
            expect(htmlClass).toBeDefined();
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles menu display when the icon is clicked', function(){
            let clickCheck = $('.menu-icon-link');
            
            clickCheck.click();

            let htmlClass = $('body').attr('class');

            expect(htmlClass).not.toContain('menu-hidden'); //Changed to 'toContain' as per review 08.20.18
            expect(htmlClass).toBeDefined();

            clickCheck.click();

            htmlClass = $('body').attr('class');

            expect(htmlClass).toContain('menu-hidden'); //Changed to 'toContain' as per review 08.20.18
            expect(htmlClass).toBeDefined();

        });
    })

    describe('Initial Entries', function(){
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        let entries;

        beforeEach(function(done){
         //async code
            loadFeed(0, function(){
                entries = $(".feed .entry"); //Changed to grad decendent of feed as per review - 08.20.18
                done();
                });
        });

        it('should have (at least) a single entry within feed', function(done){
            expect(entries.length).toBeGreaterThan(0);
            expect(entries).toBeDefined();
            done();
        });
    })

    describe('New Feed Selection', function(){
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let originalFeed,
            refreshedFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
                originalFeed = $(".feed").html();

                loadFeed(2, function(){
                    refreshedFeed = $(".feed").html();
                    done();
                })
            })
        });

        it('should load changes', function(done){
            expect(originalFeed).not.toEqual(refreshedFeed);
            done();
        });
    })
}());
