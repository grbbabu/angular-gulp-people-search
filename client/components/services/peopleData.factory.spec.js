describe("A test suite for People Search Data Factory", function() {
    'use strict';
    /* jshint expr: true */
    var peopleDataFactory, $httpBackend;

    var person1 = {
        'id': '1',
        'firstName': 'Sean',
        'lastName': 'Kerr',
        'picture': 'img/sean.jpg',
        'Title': 'Senior Developer'
    };

    var person2 = {
        'id': '2',
        'firstName': 'Yaw',
        'lastName': 'Ly',
        'picture': 'img/yaw.jpg',
        'Title': 'AEM Magician'
    };

    beforeEach(module('peopleSearch.app.components.services'));

    beforeEach(
        inject(function(_peopleDataFactory_, _$httpBackend_) {
            peopleDataFactory = _peopleDataFactory_;
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('./data/data.json').respond([person1, person2]);
        })
    );

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function(){
        expect(peopleDataFactory).to.exist;
    });

    it('should call $http.get to load the data', function() {
        var peoplePromise = peopleDataFactory.getPeopleData();
        $httpBackend.flush();
        peoplePromise.then(function(response){
            expect(response).to.exist;
            expect(response.data).to.exist;
            expect(response.data.length).to.equal(2);
            expect(response.data[0]).to.deep.equal(person1);
            expect(response.data[1]).to.deep.equal(person2);
        }, function(response){
            expect(response).to.exist;
            expect(response.data).to.exist;
            expect(true).to.be.false;
        });
    });
});
