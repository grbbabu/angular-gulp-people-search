describe("A test suite for People Search Controller", function() {
    'use strict';
    /* jshint expr: true */
    var $scope, $q, controller, peopleDataFactory;

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

    var mockPeopleDataFactory = {
        getPeopleData: function() {
            var defer = $q.defer();
            defer.resolve({
                data: [person1, person2]
            });
            return defer.promise;
        }
    };

    beforeEach(module('peopleSearch.app'));

    it('should be defined.', function() {
        instantiate();
        expect(controller).to.exist;
    });

    it('should be initialized to correct values.', function() {
        instantiate();
        controller.initialize();
        expect(controller.model.people).to.exist;
        expect(controller.model.searchTerm).to.exist;
        expect(controller.model.error).to.exist;
    });

    it("should load the people data by calling the peopleDataFactory getPeopleData method", function () {
        instantiate();
        controller.initialize();
        controller.loadPeopleData();
        // Before $apply is called the promise hasn't resolved.
        expect(controller.model.people.length).to.equal(0);
        // This propagates the changes to the models in unit test frameworks.
        $scope.$apply();
        expect(controller.model.people.length).to.equal(2);
        expect(controller.model.people[0]).to.deep.equal(person1);
        expect(controller.model.people[1]).to.deep.equal(person2);
    });

    function instantiate() {
        inject(function(_$rootScope_, _$controller_, _$q_) {
            $scope = _$rootScope_.$new();
            $q = _$q_;
            controller = _$controller_('peopleSearchController', {
                'peopleDataFactory': mockPeopleDataFactory
            });
        });
    }
});